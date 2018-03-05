const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
var hash = bcrypt.hashSync("bacon");

bcrypt.compareSync("bacon", hash); // true
bcrypt.compareSync("veggies", hash); // false

app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date(),
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req,res) => {
    // Load hash from your password DB.
    bcrypt.compare("apples", "$2a$10$Xj1h0vmiV30RCfhw6wYXCOoza402K8lYSkUIeqV5UASjT7QMr3jXG", function(err, res) {
    // res == true
    console.log("first guess", res)
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
console.log(res)
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else {
        res.status(400).json("error logging in");
    }
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body;

bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash)
});

database.users.push({
    id:database.users[database.users.length-1].id+1,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
});
    console.log(database.users[database.users.length-1]);
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if(user.id === id){
            return res.json(user);
        }
    })
    return res.status(404).json('no such user')
})

app.put('/image', (req,res) => {
    const { id } = req.body;
    database.users.forEach(user => {
    if(user.id === id){
        user.entries++;
    return res.json(user.entries);
}
})
return res.status(404).json('no such user')
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});