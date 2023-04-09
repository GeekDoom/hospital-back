const jwt = require("jsonwebtoken");



const validateJWT = (req, res, next) => {

    //Read the token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Not token available'
        });
    }
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;
        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }




}



module.exports = {
    validateJWT,
}