const mongoose = require('mongoose');

//Schema
const workoutDetailSchema = new mongoose.Schema({
    Activity: {
        type: String,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Type: {
        type: Array
    },
    Intensity: {
        type: Number
    },
    CreatedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    }
});

const WorkoutDetail = mongoose.model("workoutdetail", workoutDetailSchema);

module.exports = WorkoutDetail;