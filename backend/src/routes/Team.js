import express from 'express';
import Team from '../models/provider/Team.js'

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.json(teamMembers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new team member
router.post('/', async (req, res) => {
    const { providerId, name, description, avatar } = req.body;
    const team = new Team({ providerId, name, description, avatar });
    let existingTeamMember = await Team.findOne({ providerId, name, description, avatar });
    if (existingTeamMember) {
        return res.status(409).json({ message: 'Exact same team member already exists' });
    }
    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get team member by Id
router.get('/:id', getTeam, (req, res) => {
    res.json(res.team);
});

// Update team member
router.patch('/:id', getTeam, async (req, res) => {
    const updateFields = ['id', 'category', 'name', 'ownerId', 'description', 'image', 'rating', 'location', 'phone', 'workingHours'];

    // Обновляем только те поля, которые присутствуют в req.body
    updateFields.forEach(field => {
        if (req.body[field] != null) {
            res.team[field] = req.body[field];
        }
    });

    try {
        const updatedTeam = await res.team.save();
        res.json(updatedTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete team member
router.delete('/:id', getTeam, async (req, res) => {
    try {
        await Team.deleteOne({ _id: res.team._id });
        res.json({ message: 'Team deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get team member by id
async function getTeam(req, res, next) {
    let team;
    try {
        team = await Team.findById(req.params.id);
        if (team == null) {
            return res.status(404).json({ message: 'Team not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.team = Team;
    next();
}

export default router;