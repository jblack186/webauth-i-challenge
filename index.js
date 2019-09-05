const server = require('./server.js');
const bcrypt = require('bcryptjs');
const Users = require('./users/users-model.js');
const restricted = require('./auth/restricted-middleware.js')

server.post('/hash', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 12);
    res.status(200).json({ username, password, hash });
});

server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
})

server.post('/api/login', (req, res) => {
    let { username, password } = req.body;
Users.findBy({ username })
.first()
.then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({ message: `Welcome ${user.username}`})
    }
    else {
        res.status(401).json({ message: 'Invalid Credentials'})
    }
})
.catch(error => {
    console.log(error)
    res.status(500).json(error);
})
})

server.get('/api/users', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.send(err)})
})



const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});