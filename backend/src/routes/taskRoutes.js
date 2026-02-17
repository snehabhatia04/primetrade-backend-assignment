const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
    createTask,
    myTasks,
    allTasks,
    deleteTask,
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/my", auth, myTasks);
router.get("/all", auth, role("admin"), allTasks);
router.delete("/:id", auth, deleteTask);

module.exports = router;
