import db from "../database/db.js";


export async function getCategories(req, res) {
    try {
        const categories = await db.query("SELECT * FROM categories");
        res.status(200).send(categories.rows);
    }
    catch(e){
        res.status(500).send(e);
        console.log("erro ao pegar as categorias", e);
    }
}