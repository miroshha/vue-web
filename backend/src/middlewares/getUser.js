// middleware to find user by id
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'Access denied: unauthorized to access this user\'s data' });
    }

    res.user = user;
    next();
}

export default getUser;