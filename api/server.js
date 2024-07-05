const express = require('express');
const cors=require('cors');
const app = express();
const bodyParser=require('body-parser');
const bookRoutes=require('./routes/bookRoutes');
const authorRoutes=require('./routes/authorRoutes');
const genresRoutes=require('./routes/genresRoutes');
const userRoutes=require('./routes/userRoutes');

app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Routes
app.use('/books',bookRoutes);
app.use('/authors',authorRoutes);
app.use('/genres',genresRoutes);
app.use('/userstest',userRoutes);


app.get('/pages/AddNewBook', (req, res) => {
    res.send('This is the Add New Book page');
  });

app.use((err,req,res,next)=>{
    console.error('Global error handler:',err);
    res.status(500).send('Something went wrong');
});

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))