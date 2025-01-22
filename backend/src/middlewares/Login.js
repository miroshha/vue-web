import jwt from "jsonwebtoken";

async function LoginMiddleware(req, res, next) {
    const authHeader = req.header('User-Token');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, token required' });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token required' });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

export default LoginMiddleware;