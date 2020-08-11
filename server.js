const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db=knex({
    client: 'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'root',
        database:'i-love-c'
    }
})


// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

const database = {
    users:[
        {
            tName:"india",
            wNumber:9003,
        },
        {
            tName:"india",
            wNumber:9092,
        },
    ]
}

app.use(bodyParser.json());
app.use(cors()); 




app.get('/', (req,res)=> {
    res.send(database.users)
})

app.post('/submission', (req,res)=> {
    const { tName, wNumber } = req.body;

    db('users')
        .returning('*')
        .insert({
            tname : tName,
            wnumber : wNumber,
            joined : new Date(),
        })
        .then(user=> {
            res.json(user);
        })
        .catch(err=> res.status(400).json('unable to register'))
    // database.users.push({
    //     teamName:tName,
    //     whatsappNumber: wNumber,
    //     joined: new Date().toString(),
    // })s
    // res.json(database.users[database.users.length-1]);
})

// console.log(database.users);

app.listen(3000, () => {
    console.log("App running on port 3000");
})