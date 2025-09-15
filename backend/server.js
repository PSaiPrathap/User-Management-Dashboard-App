import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/** GET all users */
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/** GET single user */
app.get("/users/:id", (req, res) => {
  db.get("SELECT * FROM users WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
});

/** CREATE new user */
app.post("/users", (req, res) => {
  const { username, email, about, phone, address, geo, company } = req.body;

  db.run(
    `INSERT INTO users (username, email, about, phone, address, geo, company)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [username, email, about, phone, address, geo, company],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        username,
        email,
        about,
        phone,
        address,
        geo,
        company,
      });
    }
  );
});

/** UPDATE user */
app.put("/users/:id", (req, res) => {
  const { username, email, about, phone, address, geo, company } = req.body;

  db.run(
    `UPDATE users SET username=?, email=?, about=?, phone=?, address=?, geo=?, company=?
     WHERE id=?`,
    [username, email, about, phone, address, geo, company, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

/** DELETE user */
app.delete("/users/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
