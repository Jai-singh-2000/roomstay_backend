const jwtToken = require("jsonwebtoken");
const Otp = require("../models/OtpModel");
const User = require("../models/UserModel");
const Hotel = require("../models/HotelModel");
const Room = require("../models/RoomModel");
const sendNewMail = require("../config/mail");
const { generateOTP } = require("../utils/tools");

async function tokenVerificationController(req, res) {
  try {
    const userId = req.userId;
    const existingUser = await User.findOne({ _id: userId });

    if (existingUser) {
      res.status(200).json({
        success: true,
        message: "User is valid",
        user: existingUser,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User is not valid",
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({
      success: false,
      message: "Some thing went wrong",
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Email and passoword are requird",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "user does not exist",
      });
    }

    if (existingUser.password !== password) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const token = jwtToken.sign(
      {
        id: existingUser?._id,
        email: email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: existingUser,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      success: false,
      message: "Some thing went wrong",
    });
  }
}

async function signUpController(req, res) {
  const { email, password, confirmPassword, firstName, lastName, isAdmin } =
    req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      res.status(422).json({
        success: false,
        message: "All fields are required",
      });
      return;
    } else if (password !== confirmPassword) {
      res.status(422).json({
        success: false,
        message: "Password and confirm password not matched",
      });
      return;
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser?.email) {
      res.status(401).json({
        success: false,
        message: "User already exist",
      });
      return;
    }

    const signUpResponse = await User.create({
      firstName,
      lastName,
      email,
      password,
      isAdmin,
    });

    if (!signUpResponse) {
      res.status(400).json({
        success: true,
        message: "Something is wrong",
      });
      return;
    }

    const randomOtp = generateOTP();
    const otpResponse = await Otp.create({ email: email, otp: randomOtp });
    sendNewMail({
      mail: email,
      subject: "Signup at Roomstay",
      text: `Use this OTP to verify this account ${randomOtp}`,
    });
    res.status(200).json({
      success: true,
      message: `Otp send at ${email}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not working",
    });
  }
}

async function otpController(req, res) {
  try {
    const { email, otp } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(401).json({
        success: false,
        message: "User does not exist",
      });
      return;
    }

    if (existingUser?.isVerified) {
      res.status(200).json({
        success: true,
        message: "User already verified",
      });
      return;
    }

    const existingObj = await Otp.findOne({ email: email });

    if (!existingObj) {
      res.status(401).json({
        success: false,
        message: "Something is wrong",
      });
      return;
    }

    if (existingObj?.otp === String(otp)) {
      await User?.findOneAndUpdate({ email: email }, { isVerified: true });
      res.status(200).json({
        success: true,
        message: "User verified",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Otp not matched",
      });
    }
  } catch (error) {
    console.log(error, "otp me aaya");
    res.status(500).json({
      success: false,
      message: "Server not working",
    });
  }
}

async function resendOtpController(req, res) {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (!existingUser.isVerified) {
      const randomOtp = generateOTP();
      await Otp?.findOneAndUpdate({ email: email }, { otp: randomOtp });
      sendNewMail({
        mail: email,
        subject: "Signup at Roomstay",
        text: `Resend OTP to verify this account ${randomOtp}`,
      });
      res.status(200).json({
        success: true,
        message: "Succuss",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User already verified",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not working",
    });
  }
}

async function forgetController(req, res) {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (existingUser.email) {
      const randomOtp = generateOTP();
      await Otp.findOneAndUpdate({ email: email }, { otp: randomOtp });
      sendNewMail({
        mail: email,
        subject: "Forget Password at Roomstay",
        text: `OTP to verify this account ${randomOtp}`,
      });

      res.status(200).json({
        success: true,
        message: `Otp send at ${email}`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "something is error",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Something is error",
    });
  }
}

async function changePasswordController(req, res) {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      res.status(404).json({
        message: "Something is missing",
        status: false,
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(409).json({
        message: "Password and confirm password did not matched",
        status: false,
      });
      return;
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const existOtpObj = await Otp.findOne({ email: email });

    if (!existOtpObj.otp) {
      res.status(401).json({
        success: false,
        message: "Something is missing",
      });
      return;
    }

    if (existOtpObj.otp !== String(otp)) {
      res.status(401).json({
        success: false,
        message: "Otp did not match",
      });
      return;
    }

    const userObj = await User.findOneAndUpdate({
      email: email,
      password: password,
    });
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something is error",
    });
  }
}

async function updatePasswordController(req, res) {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.userId;

    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(404).json({
        message: "Credentials is missing",
        status: false,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(409).json({
        message: "Password and confirm password didn't matched",
        status: false,
      });
      return;
    }

    const existingUser = await User.findOne({ _id: userId });

    if (existingUser.password !== oldPassword) {
      res.status(409).json({
        message: "Old password did not matched",
        status: false,
      });
      return;
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { password: newPassword }
    );

    if (updateUser) {
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Something is error",
      });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getProfile(req, res) {
  try {
    const userId = req.userId;
    const existingUser = await User.findOne({ _id: userId });

    if (existingUser) {
      delete existingUser.createdAt;
      delete existingUser.updatedAt;
      delete existingUser.__v;

      res.status(200).json({
        success: true,
        user: existingUser,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function userAccountDeleteController(req, res) {
  try {
    const userId = req.userId;
    const email = req.email;
    const isHotelDeleted = await Hotel.deleteMany({ User: userId });

    const isRoomDeleted = await Room.deleteMany({ User: userId });

    const isOtpDeleted = await Otp.deleteMany({ email: email });
    console.log(isOtpDeleted, "otp deleted");

    const deleteAcc = await User.deleteOne({ _id: userId });
    if (deleteAcc) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(400).json({
        success: true,
        message: "User not deleted",
      });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(401).json({
      success: false,
      message: "something is wrong please try again",
    });
    return;
  }
}

module.exports = {
  loginController,
  signUpController,
  otpController,
  resendOtpController,
  forgetController,
  changePasswordController,
  updatePasswordController,
  userAccountDeleteController,
  tokenVerificationController,
  getProfile,
};
