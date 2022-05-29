import db from "../database/db.js";

export async function getGames(req, res) {
  const { name } = req.query;
  try {
    const games = !name
      ? await db.query(
          `SELECT games.*, 
                  categories.id as "categoryId", 
                  categories.name as "categoryName" 
                  FROM games 
                  JOIN categories 
                  ON games."categoryId" = categories.id;`
        )
      : await db.query(
          `SELECT games.*, 
                  categories.id as "categoryId", 
                  categories.name as "categoryName" 
                  FROM games 
                  JOIN categories 
                  ON games."categoryId" = categories.id 
                  WHERE LOWER(games.name) LIKE '${name.toLowerCase()}%';`
        );
    return res.send(games.rows);
   
  } catch (e) {
    console.log("deu erro ao fazer o get em games", e);
    return res.sendStatus(500);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
             VALUES ($1, $2, $3, $4, $5)`,
      [
        req.body.name,
        req.body.image,
        req.body.stockTotal,
        req.body.categoryId,
        req.body.pricePerDay,
      ]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log("erro ao criar o game", e);
    return res.sendStatus(500);
  }
}
