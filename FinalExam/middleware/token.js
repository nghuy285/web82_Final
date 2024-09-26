import jwt from "jsonwebtoken";
const SecretKey = 'Secret';

const valToken = (req,res,next)=> {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token,SecretKey,(err,decoded)=>{
            if (err){
            return res.status(401).json({message: 'Access token is invalid'});

            } else {
            req.user = decoded;
            next();
        }
        })
    }
}
export {
    valToken
}