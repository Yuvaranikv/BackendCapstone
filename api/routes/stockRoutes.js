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

router.get("/totalstock", async (req, res) => {
  try {
    const query = `
    SELECT 
    (SUM(p.p_qtystock) - SUM(s.s_qtysold)) AS total_stock
FROM 
    books b
LEFT JOIN 
    (SELECT bookid, SUM(quantity_sold) AS s_qtysold, salesdate FROM sales GROUP BY bookid, salesdate) s ON s.bookid = b.book_id
LEFT JOIN 
    (SELECT bookid, SUM(quantityinstock) AS p_qtystock FROM purchase GROUP BY bookid) p ON p.bookid = b.book_id;
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

router.get("/bookssold", async (req, res) => {
  try {
    const query = `
    select sum(quantity_sold) as BooksSoldToday from sales where salesdate=curdate();
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

router.get("/totalsales", async (req, res) => {
  try {
    const query = `
    SELECT 
    SUM(s.s_qtysold * b.price) as TotalSalesToday
FROM 
    books b
LEFT JOIN 
    (SELECT bookid, SUM(quantity_sold) AS s_qtysold, salesdate FROM sales GROUP BY bookid, salesdate) s ON s.bookid = b.book_id
LEFT JOIN 
    (SELECT bookid, SUM(quantityinstock) AS p_qtystock FROM purchase GROUP BY bookid) p ON p.bookid = b.book_id
where s.salesdate=curdate()
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

router.get("/topsellingbooks", async (req, res) => {
  try {
    const query = `
    SELECT b.book_id,    b.title,    b.author_id,    b.genre_id,    b.price,    b.publication_date,    b.ISBN,    b.imageURL,    b.description,    b.isActive,    b.createdAt,
    b.updatedAt,SUM(s.quantity_sold) AS total_quantity_sold FROM books AS b JOIN sales AS s ON b.book_id = s.bookid
    GROUP BY b.book_id , b.title , b.author_id , b.genre_id , b.price , b.publication_date , b.ISBN , b.imageURL , b.description , b.isActive , b.createdAt , b.updatedAt
    ORDER BY total_quantity_sold DESC
    LIMIT 5;
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