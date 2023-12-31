import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization")

        if (!token){
            return res.status(403).send("Acess Denied")
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.lenght).trimLeft();
        }
        const verified = jwt.verified(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}