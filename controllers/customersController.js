import db from "../database/db.js";

export async function postCustomers(req, res) {
  const newCustomers = req.body;
  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [
        newCustomers.name,
        newCustomers.phone,
        newCustomers.cpf,
        newCustomers.birthday,
      ]
    );
    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao criar cliente", e);
  }
}
