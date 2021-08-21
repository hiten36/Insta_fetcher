const express=require('express');
const exphbs=require('express-handlebars');
const path=require('path');
const fs=require('fs');
const is=require('scraper-instagram');
const imageDownloader=require('image-downloader');
const { urlencoded } = require('express');
const app=express();
const port=process.env.PORT || 8000;
const ig=new is();

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
app.post('/',async (req,res)=>{
    let name=req.body.name;

    try {
        let details=await ig.getProfile(name);
        const options = {
            url: details.pic,
            dest: './static/images/image.jpg'
        }
        imageDownloader.image(options)
        .then(({ filename }) => {
            res.render('index',{
                flag1:true,
                flag:true,
                color:"success",
                msg:"Success! ",
                userName:details.name,
                pic:details.pic,
                bio:details.bio,
                followers:details.followers,
                following:details.following,
                posts:details.posts
            });
        })
        .catch((err) => {
            res.render('index',{
                flag1:true,
                flag:false,
                color:"danger",
                msg:"Failed! Try again after sometime."
            })
        })
    } catch (error) {
        res.render('index',{
            flag1:true,
            flag:false,
            color:"danger",
            msg:"Failed! Try again after sometime."
        })
    }
})

app.listen(port,()=>{
    console.log('Listening...');
})