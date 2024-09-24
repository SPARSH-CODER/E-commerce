const express=require('express');
const app=express();
const path =require('path');
const user =require('./models/user');
const mongoose =require('mongoose');
const methodover=require('method-override');

app.use(methodover('_method'));
app.use(methodover('X-Method-Override'));
mongoose.connect('mongodb://127.0.0.1:27017/GLA-DB')
    .then(()=>{
        console.log('DB connected')
    })
    .catch((err)=>console.log(err));

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    
    res.send('done');
})
app.get('/users', async (req,res)=>{
    const data=await user.find({});
    res.render('home',{data});
})

app.get('/user/new', async (req,res)=>{
    res.render('newform');
})
app.use(express.urlencoded({extended: true}));

app.post('/users',async (req,res)=>{
    const  {name, image, prize, description} =req.body;
     await user.create({name, image, prize, description});
     res.redirect('/users');
})

app.get('/users/:id',async (req,res)=>{
        const {id }=req.params;
        const showdata = await user.findById(id);
        res.render('show',{showdata});
})

app.get('/users/:id/edit',async (req,res)=>{
    const {id}= req.params;
    const editdata= await user.findById(id);
    res.render('editform',{editdata});
})

app.patch('/users/:id',async (req,res)=>{
    const {id}= req.params;
    const  {name, image, prize, description} =req.body;
    const editdata= await user.findById(id);

    editdata.name=name;
    editdata.image=image;
    editdata.prize=prize;
    editdata.description=description;
    await editdata.save();
    res.redirect('/users');
})

app.delete('/users/:id',async (req,res)=>{
    const {id}= req.params;
    await user.findByIdAndDelete(id);
    res.redirect('/users');
})


let port=5000;
app.listen(port,()=>{
    console.log('serve in up now.......');
})