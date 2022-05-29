import db from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const categories = await db.query("SELECT * FROM categories");
    res.status(200).send(categories.rows);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao pegar as categorias", e);
  }
}

export async function postCategories(req, res) {
  const categorie = req.body;
  try {
    await db.query(`INSERT INTO categories (name) VALUES ($1)`, [
      categorie.name,
    ]);
    return res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao fazer o post em categorias", e);
  }
}
