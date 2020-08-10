const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const database = {
    users:[
        {
            teamName:"india",
            whatsappNumber:9003,
        },
        {
            teamName:"india",
            whatsappNumber:9092,
        },
    ]
}

app.use(bodyParser.json());
app.use(cors()); 




app.get('/', (req,res)=> {
    res.send('this hello buisness')
})

app.post('/submission', (req,res)=> {
    const { tName, wNumber } = req.body;
    database.users.push({
        teamName:tName,
        whatsappNumber: wNumber,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
})

console.log(database.users);

app.listen(3000, () => {
    console.log("App running on port 3000");
})