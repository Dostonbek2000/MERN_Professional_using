const express = require('express');
const app = express();
const bodyparser =require('body-parser');
const connectDB = require('./config/db');
app.use(express.json({extended:true}));


app.get('/',(req,res)=>{
    res.send('api running')
})

connectDB()


//define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`server Started on the port ${PORT}`))