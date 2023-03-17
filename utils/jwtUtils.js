const jsonwebtoken = require('jsonwebtoken');

function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, 'secret', {expiresIn: expiresIn}) //TODO: Change secret to .env secret
    
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT;
