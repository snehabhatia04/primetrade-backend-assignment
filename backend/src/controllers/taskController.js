const pool = require("../config/db");
const redisClient = require("../config/redis");


exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const result = await pool.query(
        "INSERT INTO tasks(title,description,user_id) VALUES($1,$2,$3) RETURNING *",
        [title, description, userId]
    );

    // Invalidate cache
    await redisClient.del(`tasks:${userId}`);

    res.status(201).json(result.rows[0]);
};


exports.myTasks = async (req, res) => {
    const userId = req.user.userId;

    const cacheKey = `tasks:${userId}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
        console.log("Cache HIT");
        return res.json(JSON.parse(cached));
    }

    console.log("Cache MISS");
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id=$1",
        [userId]
    );

    await redisClient.setEx(cacheKey, 60, JSON.stringify(result.rows));

    res.json(result.rows);
};


exports.allTasks = async (req, res) => {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
};

exports.deleteTask = async (req, res) => {
    await pool.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
    res.json({ message: "Deleted" });
};
