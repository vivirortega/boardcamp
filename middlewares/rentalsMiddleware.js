import db from "../database/db.js";

export async function rentalsValidate(req, res, next) {
  const data = req.body;

  try {
    const validId = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      data.customerId,
    ]);
    if (!validId.rows[0]) {
      return res.sendStatus(400);
    }
    const validGame = await db.query(`SELECT * FROM games WHERE id = $1`, [
      data.gameId,
    ]);
    if (!validGame.rows[0]) {
      return res.sendStatus(400);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
  next();
}

export async function validateDeleteRental(req, res, next) {
  const { id } = req.params;
  try {
    const idExist = await db.query(
      `SELECT * FROM rentals
      WHERE id = $1`,
      [id]
    );

    if (idExist.rowCount === 0) return res.sendStatus(404);
    if (idExist.rows[0].returnDate) return res.sendStatus(400);

    res.locals.rentalData = idExist;
  } catch (e) {
    return res.status(500).send(e);
  }
  next();
}
