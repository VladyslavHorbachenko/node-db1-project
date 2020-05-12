const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(acc => {
            res.status(200).json(acc);
        })
        .catch(err => console.log(err));
})

server.post('/', (req, res) => {
    const data = req.body
    db("accounts")
        .insert(data)
        .then(ids => {
            res.status(200).json(ids);
        })
        .catch(error => console.log(error))
});

server.put('/:id', (req, res) => {
    const {id} = req.params;
    const toBeUpdate = req.body;
    db("accounts")
        .where({id: id})
        .update(toBeUpdate)
        .then(count => {
            if (count > 0) {
                res.status(200).json(value);
            } else {
                res.status(400).json({message: "record not found by this id"})
            }
        })
        .catch(err => console.log(err));
})

server.delete('/:id',(req, res) => {
    const {id} = req.params;
    db('accounts')
        .where({id:id})
        .delete()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {console.log(err)})
})

module.exports = server;
