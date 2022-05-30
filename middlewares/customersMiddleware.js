import db from "../database/db.js";
import joi from "joi";

export async function customersValidate(req, res, next) {
  const data = req.body;

  const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().required().length(11),
    birthday: joi.date().required(),
  });

  const validation = customersSchema.validate(data);
  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const cpfExist = await db.query(`SELECT * FROM customers where cpf = $1`, [
      data.cpf,
    ]);
    if (cpfExist.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (e) {
    return res.status(500).send(e);
  }

  next();
}
