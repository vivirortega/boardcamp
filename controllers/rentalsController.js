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
