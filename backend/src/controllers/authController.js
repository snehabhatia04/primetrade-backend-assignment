const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id",
        [name, email, hash]
    );

    res.json({ message: "User created", userId: result.rows[0].id });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (result.rows.length === 0)
        return res.status(401).json({ message: "Invalid email" });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
};
