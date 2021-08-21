const express=require('express');
const exphbs=require('express-handlebars');
const path=require('path');


const app=express();
const port=process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','handlebars');
app.engine('handlebars',exphbs());

app.get('/', async (req,res)=>{

    res.render('index',{
        flag:false
    });
})


app.listen(port,()=>{
    console.log('Listening...');
})