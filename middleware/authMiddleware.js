import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
    try {
        const authheader = req.headers.authorization;

        if (!authheader || !authheader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'No token or invalid format'});
        }

        const token = authheader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id, email: decoded.email};
        next();
    } catch (err) {
        console.error('[auth] Verification Error:', err.message);
        return res.status(401).json({ error: 'Invalid or expired token!'});
    }
};

export default auth;