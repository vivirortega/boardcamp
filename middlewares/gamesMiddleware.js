import db from "../database/db.js";
import joi from "joi";

export async function gamesValidation(req, res, next) {
  const { name, stockTotal, pricePerDay, categoryId } = req.body;

  const gameSchema = joi.object({
    name: joi.string().required(),
    stockTotal: joi.number().required().positive(),
    pricePerDay: joi.number().required().positive(),
  });

  const validation = gameSchema.validate({ name, stockTotal, pricePerDay });
  if (validation.error) {
    return res.sendStatus(400);
  }
  try {
    const categorie = await db.query(
      `SELECT id FROM categories WHERE id = $1`,
      [categoryId]
    );
    if (!categorie) {
      return res.sendStatus(400);
    }
    const nameExist = await db.query(`SELECT name FROM games WHERE name = $1`, [
      name,
    ]);
    if (nameExist.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  next();
}
