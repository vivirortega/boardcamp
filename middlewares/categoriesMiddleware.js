import db from "../database/db.js";

export async function categorieValidator(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const checkName = await db.query(
      `SELECT * FROM categories WHERE name = $1`,
      [name]
    );
    if (checkName.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (e) {
    return res.status(500).send(e);
  }

  next();
}
