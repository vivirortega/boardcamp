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

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    const customers = !cpf
      ? await db.query(`SELECT * FROM customers`)
      : await db.query(
          `SELECT *
      FROM customers
      WHERE customers.cpf LIKE $1`,
          [`${cpf}%`]
        );

    res.status(200).send(customers.rows);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao pegar clientes", e);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const costumer = await db.query(
      `SELECT * FROM customers
            WHERE customers.id = $1
            `,
      [id]
    );

    if (!costumer.rows[0]) return res.sendStatus(404);
    res.status(200).send(costumer.rows[0]);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao pegar o cliente pelo id", e);
  }
}
