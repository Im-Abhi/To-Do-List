const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const staticPath = path.join(__dirname,"../");
const _ = require('lodash');

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
    name: "Welcome to Todo-List"
})

const item2 = new Item({
    name: "Click + to add new items"
})

const item3 = new Item({
    name: "<== Hit this to delete an item"
})

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

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

app.get('/:newList',(req,res)=>{
    const newListName = _.capitalize(req.params.newList);
    List.findOne({name: newListName},(err,result)=>{
        if(!err){
            if(!result){
                const list = new List({
                    name: newListName,
                    items: defaultItems
                });
                list.save();
                res.redirect('/'+newListName);
            }else{
                res.render('index',{
                    ListTitle: newListName,
                    newItems: result.items
                });
            }    
        }
    });
});

app.post('/',(req,res)=>{
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const task = new Item({
        name: itemName
    })
    if (listName === 'Today') {
        task.save();
        res.redirect('/');
    } else {
        List.findOne({ name: listName },(err,result)=>{
            result.items.push(task);
            result.save();
            res.redirect("/"+listName);
        })
    }
    
})

app.post("/delete", (req,res)=>{
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if(listName === 'Today'){
        Item.findByIdAndRemove(checkedItemId,(err)=>{
            if(err) console.log(err);
            else    console.log("Successfully deleted!");
        })
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName},{$pull: {items: { _id: checkedItemId}}},(err,result)=>{
            if(!err){
                res.redirect('/'+listName);
            }
        })
    }
    
})

app.post('/work',(req,res)=>{
    res.redirect("/work");
})

app.listen(4000,()=>{
    console.log('Server started at port 4000');
})