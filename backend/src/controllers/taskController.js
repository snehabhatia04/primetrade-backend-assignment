const pool = require("../config/db");

exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    const result = await pool.query(
        "INSERT INTO tasks(title,description,user_id) VALUES($1,$2,$3) RETURNING *",
        [title, description, req.user.userId]
    );

    res.status(201).json(result.rows[0]);
};

exports.myTasks = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id=$1",
        [req.user.userId]
    );

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
