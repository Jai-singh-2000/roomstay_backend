function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function clearUserObj(obj) {
  const newObj = { ...obj };
  delete newObj.createdAt;
  delete newObj.updatedAt;
  delete newObj.__v;
  return newObj;
}

module.exports = { generateOTP, clearUserObj };
