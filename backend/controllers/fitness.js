const WorkoutDetail = require('../models/fitness');

const handleGetAllWorkout = async (req, res) => {
    try {
        const activities = await WorkoutDetail.find({ CreatedBy: req.user._id });
        console.log("Activities>>>", activities);
        return res.status(200).send(activities);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};

const handleGetWorkoutById = async (req, res) => {
    try {
        const activity = await WorkoutDetail.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }
        return res.send(activity);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};

const handleUpdateWorkoutById = async (req, res) => {
    try {
        const activity = await WorkoutDetail.findByIdAndUpdate(req.params.id, {
            Activity: req.body.activity,
            Duration: req.body.duration,
            Category: req.body.category,
            Type: req.body.type,
            Intensity: req.body.intensity,
            // CreatedBy: req.user._id
        });

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }
        return res.status(200).send(activity);
    }
    catch (error) {
        return res.status(400).json(error);
    }

};

const handleDeleteWorkoutById = async (req, res) => {
    try {
        await WorkoutDetail.findByIdAndDelete(req.params.id);
        return res.json({ status: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
};

const handleCreateNewWorkout = async (req, res) => {
    console.log("req.user>>>", req.user);
    try {
        const activities = await WorkoutDetail.create({
            Activity: req.body.activity,
            Duration: req.body.duration,
            Category: req.body.category,
            Type: req.body.type,
            Intensity: req.body.intensity,
            CreatedBy: req.user._id
        });
        // console.log("Activities>>>", activities);
        return res.status(201).send(activities);
    }
    catch (error) {
        return res.status(400).json(error);
    }


};

module.exports = {
    handleGetAllWorkout,
    handleGetWorkoutById,
    handleUpdateWorkoutById,
    handleDeleteWorkoutById,
    handleCreateNewWorkout
}