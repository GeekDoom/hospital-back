const jwt = require('jsonwebtoken');


const genJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Cant create JWT', err);
            } else {
                resolve(token);
            }
        });
    });


}


module.exports = {
    genJWT,
}