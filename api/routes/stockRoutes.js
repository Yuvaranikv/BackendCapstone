const sequelize = require("../config/database");
const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const Sales = require("../models/Sales");
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  try {
    const query = `
    select distinct b.book_id, b.title, b.price, b.imageURL,sum(p.p_qtystock) as purchase, sum(s.s_qtysold) as sold, (sum(p.p_qtystock)-sum(s.s_qtysold)) as stock,a.name as AuthorName from books b
    left outer join (select distinct bookid, sum(quantity_sold) as s_qtysold from sales group by bookid,salesdate ) s on  s.bookid= b.book_id
   left outer join (select distinct bookid, sum(quantityinstock) as p_qtystock from purchase group by bookid,purchasedate ) p  on p.bookid= b.book_id
   join authors a on a.author_id=b.author_id
   group by b.book_id,b.title, b.price, b.imageURL;
    
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

router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params; // Extract bookId from request params
  try {
    const query = `
    SELECT DISTINCT b.book_id, b.title, b.price, b.imageURL,SUM(p.p_qtystock) AS purchase, SUM(s.s_qtysold) AS sold, COALESCE((SUM(p.p_qtystock) - SUM(s.s_qtysold)), SUM(p.p_qtystock)) AS stock, 
    a.name AS AuthorName FROM books b LEFT OUTER JOIN (
    SELECT DISTINCT bookid, SUM(quantity_sold) AS s_qtysold FROM sales GROUP BY bookid ) s ON s.bookid = b.book_id
    LEFT OUTER JOIN ( SELECT DISTINCT bookid, SUM(quantityinstock) AS p_qtystock FROM purchase GROUP BY bookid ) p ON p.bookid = b.book_id
    JOIN authors a ON a.author_id = b.author_id WHERE b.book_id = :bookId
    GROUP BY b.book_id, b.title, b.price, b.imageURL, a.name;

    
    `;

    const results = await sequelize.query(query, {
      replacements: { bookId: bookId }, // Bind bookId as a replacement in Sequelize query
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/purchasesearch", async (req, res) => {
  const { searchText } = req.query; // Correcting the variable name to match the query parameter
  try {
    const query = `
      SELECT b.*, p.* 
      FROM books b 
      JOIN purchase p ON b.book_id = p.bookid 
      WHERE b.title LIKE :searchText;
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        searchText: `%${searchText}%`, // Correcting the replacement key to match
      },
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// New endpoint to fetch sales data for a specific book
router.get('/book/:bookId/sales', async (req, res) => {
  const { bookId } = req.params;

  try {
    const sales = await Sales.findAll({
      where: { bookid: bookId, isActive: true },
      include: [{ model: Book, attributes: ['title'] }],
    });

    res.json(sales);
  } catch (err) {
    console.error('Error retrieving sales data for book', err);
    res.status(500).send('Error retrieving sales data');
  }
});

// New endpoint to fetch sales data for a specific book
router.get('/book/:bookId/purchase', async (req, res) => {
  const { bookId } = req.params;

  try {
    const purchase = await Purchase.findAll({
      where: { bookid: bookId, isActive: true },
      include: [{ model: Book, attributes: ['title'] }],
    });

    res.json(purchase);
  } catch (err) {
    console.error('Error retrieving purchase data for book', err);
    res.status(500).send('Error retrieving purchase data');
  }
});
module.exports = router;
