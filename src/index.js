const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticPath = path.join(__dirname,"../");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(staticPath));
app.set('views',staticPath+'/views');
app.set('view engine','ejs');

const newItems = ['Task1', 'Task2'];
const workList = [];

app.get('/',(req,res)=>{
    const day = date.getDate();
    res.render('index',{
                        ListTitle: day,
                        newItems:newItems
                    });
})

app.post('/',(req,res)=>{
    if( req.body.list === "WorkList"){
        workList.push(req.body.newItem);
        res.redirect('/work');
    }
    else{
        newItems.push(req.body.newItem);
        res.redirect("/");
    }
    
})

app.post('/work',(req,res)=>{
    res.redirect("/work");
})

app.get('/work',(req,res)=>{
    res.render('index',{
                        ListTitle: 'WorkList',
                        newItems:workList
    });
})

app.listen(4000,()=>{
    console.log('Server started at port 4000');
})