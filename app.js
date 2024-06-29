const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const bookRoutes=require('./routes/bookRoutes');
const authorRoutes=require('./routes/authorRoutes');
const genresRoutes=require('./routes/genresRoutes');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Routes
app.use('/books',bookRoutes);
app.use('/authors',authorRoutes);
app.use('/genres',genresRoutes);


app.use((err,req,res,next)=>{
    console.error('Global error handler:',err);
    res.status(500).send('Something went wrong');
});

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))