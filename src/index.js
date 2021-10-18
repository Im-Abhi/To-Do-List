const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const staticPath = path.join(__dirname,"../");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(staticPath));
app.set('views',staticPath+'/views');
app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB",{ useNewUrlParser: true })

const itemsSchema = {
    name: String
}

const Item = mongoose.model("item", itemsSchema );

const item1 = new Item({
    name: "Task1"
})

const item2 = new Item({
    name: "Task2"
})

const item3 = new Item({
    name: "Task3"
})

const defaultItems = [ item1, item2, item3 ];

app.get('/',(req,res)=>{
    Item.find({},(err,result)=>{
        if( result.length === 0){
            Item.insertMany(defaultItems, (err) => {
            if(err) console.log(err);
            else    console.log("Inserted Successfully");
            });
            res.redirect('/');
        }
        if(err) console.log(err);
        else{
            res.render('index',{
                ListTitle: 'Today',
                newItems: result
            });
        }
    });
});

app.post('/',(req,res)=>{
    const task = new Item({
        name: req.body.newItem
    })
    task.save();
    res.redirect('/');
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