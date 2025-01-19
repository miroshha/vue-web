import express from 'express';
import Schedule from '../models/provider/Schedule.js'

const router = express.Router();

// Get all schedules
router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new schedule
router.post('/', async (req, res) => {
    const { providerId, serviceId, date, times } = req.body;

    if (!Array.isArray(times) || !times.length) {
        return res.status(400).json({ message: "Times must be an array with at least one time slot" });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ message: "Date must be in 'YYYY-MM-DD' format" });
    }

    const invalidTimes = times.some(timeSlot => {
        const timeDate = new Date(timeSlot.time);
        const timeDateString = timeDate.toISOString().split('T')[0];
        return timeDateString !== date;
    });

    if (invalidTimes) {
        return res.status(400).json({ message: "All times must match the specified date" });
    }

    const schedule = new Schedule({ providerId, serviceId, date, times });

    try {
        const newSchedule = await schedule.save();
        res.status(201).json(newSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add time to existing schedule
router.post('/:id/add_time', async (req, res) => {
    const { date, time, isBooked, bookedBy } = req.body;
    const times = [{ time, isBooked, bookedBy }];

    if (!Array.isArray(times) || !times.length) {
        return res.status(400).json({ message: "Times must be an array with at least one time slot" });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ message: "Date must be in 'YYYY-MM-DD' format" });
    }

    const invalidTimes = times.some(timeSlot => {
        const timeDate = new Date(timeSlot.time);
        const timeDateString = timeDate.toISOString().split('T')[0];
        return timeDateString !== date;
    });

    if (invalidTimes) {
        return res.status(400).json({ message: "All times must match the specified date" });
    }

    const existingSchedule = await Schedule.findOne({ _id: req.params.id, times: { $elemMatch: { time: time } } });

    if (existingSchedule) {
        return res.status(400).json({ message: "Time slot already exists" });
    }

    const schedule = await Schedule.findOne({ _id: req.params.id });
    if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.times.push(...times);

    try {
        const newSchedule = await schedule.save();
        res.status(201).json(newSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get schedule by Id
router.get('/:id', getSchedule, (req, res) => {
    res.json(res.schedule);
});

// Update schedule
router.patch('/:id', getSchedule, async (req, res) => {
    const updateFields = ['providerId', 'serviceId', 'date', 'times'];

    // Обновляем только те поля, которые присутствуют в req.body
    updateFields.forEach(field => {
        if (req.body[field] != null) {
            res.schedule[field] = req.body[field];
        }
    });

    try {
        const updatedSchedule = await res.schedule.save();
        res.json(updatedSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete schedule
router.delete('/:id', getSchedule, async (req, res) => {
    try {
        await Schedule.deleteOne({ _id: res.schedule._id });
        res.json({ message: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id/remove_time', async (req, res) => {
    const { time } = req.query;

    if (!time) {
        return res.status(400).json({ message: "Time must be provided" });
    }

    try {
        const schedule = await Schedule.findOne({ _id: req.params.id });
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        const timeIndex = schedule.times.findIndex(timeSlot => {
            return new Date(timeSlot.time).toISOString() === new Date(time).toISOString();
        });

        if (timeIndex === -1) {
            return res.status(400).json({ message: "Time slot not found" });
        }

        // Удаляем временной слот из массива
        schedule.times.splice(timeIndex, 1);

        const updatedSchedule = await schedule.save();
        res.status(200).json(updatedSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get schedule by id
async function getSchedule(req, res, next) {
    let Schedule;
    try {
        Schedule = await Schedule.findById(req.params.id);
        if (Schedule == null) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.schedule = Schedule;
    next();
}

export default router;