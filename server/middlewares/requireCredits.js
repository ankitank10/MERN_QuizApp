module.exports = (req, res, next) => {
    if(req.user.credits < 10){
        return res.status(402).send({error:"User must have atleast 10 credit. Please add credits !!!"});
    }
    next();
}