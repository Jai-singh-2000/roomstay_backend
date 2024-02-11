
const authToken=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    
    if(token==="good")
    {
        next()
    }else{
        res.status(401).json({
            message:"Unauthorized User",
            success:false
        })
    }
}


module.exports=authToken