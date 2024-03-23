const Plan=require("../models/PlanModel")

const getAllPlans=async(req,res)=>{
    try{
        const plans=await Plan.find({})
        res.status(200).json({
            success:true,
            message:"Plans running"
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports={getAllPlans}