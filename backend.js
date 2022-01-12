const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

let users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name !== undefined && job !== undefined) {
        let userByNameAndJob = findUserByIdAndJob(name, job);
        if (userByNameAndJob === undefined || userByNameAndJob.length === 0) {
            res.status(404).send("Resource with specified user Id and Job not found.");
        } else {
            userByNameAndJob = {users_list: userByNameAndJob};
            res.send(userByNameAndJob);
        }
    } else if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result)
    } else {
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length === 0)
        res.status(404).send("Resource not found.");
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const userIdToDel = req.params['id'];
    const result = deleteUser(userIdToDel);
    if (result === undefined)
        res.status(404).send("Could not find specified user to delete");
    else
        res.status(200).send();
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserById = (id) => {
    return users['users_list'].filter( (user) => user['id'] === id);
}

function addUser(user) {
    users['users_list'].push(user);
}

function deleteUser(userId) {
    const index = users['users_list'].findIndex(usr => usr['id'] === userId);
    if (index < 0)
        return undefined;
    users['users_list'].splice(index, 1);
    return index;
}

const findUserByIdAndJob = (name, job) => {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}