import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) => {
    try {
        // Using my-limit-key makes it so that all the request are counted as the same user so we must use user id here so that the user are'nt affected by eachother.
        const {success} = await ratelimit.limit("my-limit-key");
        if(!success) res.status(429).json({message:"Too many requests, Please try again later."});
        next();
    } catch (error) {
        console.error("Error in rateLimiter ",error);
        res.status(500).json({message:"Internal server error."});
        next(error);
    }
}

export default rateLimiter;