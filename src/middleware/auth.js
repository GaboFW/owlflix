const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        return res.json({ loggedIn: true, user: decoded });
    }
    catch (error) {
        return res.status(401).json({ loggedIn: false, error: error.message });
    }
};

module.exports = {
    authenticationToken
};