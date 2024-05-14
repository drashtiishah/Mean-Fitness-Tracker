const router = require('express').Router();
const { handleGetAllWorkout, handleGetWorkoutById, handleUpdateWorkoutById, handleDeleteWorkoutById, handleCreateNewWorkout } = require('../controllers/fitness');
const verifyUserToken = require('../middleware/auth');
const { login, register, logout} = require('../controllers/user');


router.route("/")
    .get(verifyUserToken, handleGetAllWorkout)
    .post(verifyUserToken, handleCreateNewWorkout);

router.route("/:id")
    .get(handleGetWorkoutById)
    .patch(handleUpdateWorkoutById)
    .delete(handleDeleteWorkoutById);

// API - Auth
router.post("/auth/register", register);

router.post("/auth/login", login);

router.delete("/auth/logout", verifyUserToken, logout);

module.exports = router;