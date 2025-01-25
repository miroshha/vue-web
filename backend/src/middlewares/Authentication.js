const token = process.env.BACKEND_TOKEN

const authentication = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    try {
        if (authHeader && authHeader === `Bearer ${token}`) {
            return next();
        }
        return res.status(403).json({ message: 'Access denied' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default authentication;