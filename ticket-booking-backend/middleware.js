import jwt from 'jsonwebtoken';

const middleware =(req,res,next)=>{
    const token = req.header('x-token');
    if(!token){
        res.status(400).send('Token not found');
    }
    let decodeToken = jwt.verify(token, 'jwtPassword');
    req.user = decodeToken.user;
    next();
}
export default middleware;