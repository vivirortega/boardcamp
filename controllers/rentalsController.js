import db from "../database/db.js";

export async function getRentals(req, res) {
  try {
    const result = await db.query(`
        SELECT rentals.*, games.name, games.image, games."categoryId", customers.name as "customerName", categories.name as "categoryName"
        FROM rentals 
        JOIN customers 
            ON rentals."customerId"  = customers.id 
        JOIN games 
            ON rentals."gameId" = games.id
        JOIN categories
        ON categories.id = games."categoryId";
        `);

    const rentals = result.rows.map((rental) => {
      return {
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
          id: rental.customerId,
          name: rental.customerName,
        },
        game: {
          id: rental.gameId,
          name: rental.name,
          categoryId: rental.gameId,
          categoryName: rental.categoryName,
        },
      };
    });

    return res.send(rentals);
  } catch (e) {
    console.log("erro ao pegar os alugueis", e);
    return res.sendStatus(500);
  }
}

export async function postRentals(req, res) {
  const date = new Date();
  const { customerId, gameId, daysRented } = req.body;

  try {
    const price = await db.query(
      `
          SELECT * from games WHERE id = $1
      `,
      [gameId]
    );
    const originalPrice = price.rows[0].pricePerDay * daysRented;
    const rentDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    await db.query(
      `
          INSERT INTO RENTALS ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log("erro ao postar alugueis", e);
    res.sendStatus(500);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;
  console.log({id});
  try {
    const remove = await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    res.sendStatus(200);
  } catch (e) {
    console.log("erro ao deletar aluguel", e);
    res.sendStatus(500);
  }
}
