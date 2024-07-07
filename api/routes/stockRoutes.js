const sequelize = require("../config/database");
const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const Sales = require("../models/Sales");
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  try {
    const query = `
    select distinct b.book_id, b.title, b.price, b.imageURL,sum(p.p_qtystock) as purchase, sum(s.s_qtysold) as sold, (sum(p.p_qtystock)-sum(s.s_qtysold)) as stock from books b
    left outer join (select distinct bookid, sum(quantity_sold) as s_qtysold from sales group by bookid ) s on  s.bookid= b.book_id
   left outer join (select distinct bookid, sum(quantityinstock) as p_qtystock from purchase group by bookid ) p  on p.bookid= b.book_id
   group by b.book_id,b.title, b.price, b.imageURL
    
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
