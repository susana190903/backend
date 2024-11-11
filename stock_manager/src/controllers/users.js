const {request, response} = require ('express');

const users = [
    {id: 1, name: 'Jhon Doe'},
    {id: 2, name: 'Jane Doe'},
    {id: 3, name: 'Bob Smith'},
];

const getAll = (req = request, res= response) => {
    res.send(users);
}

const getById = (req = request, res= response) =>{
    const {id} = req.params;
    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
    }
    const user = users.find(user => user.id === +id);

    if(!user){
        res.status(404).send('User not found')
        return;
    }
    res.send(user);
}
const create = (req = request, res = response) => {
    const { name } = req.body;
    if (!name || name.trim() === '') {
        res.status(400).send('Name is required');
        return;
    }
    const newUser = {
        id: users.length + 1,
        name
    };
    users.push(newUser);
    res.status(201).send('User created successfully');
}
const update = (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (isNaN(id)) {
        res.status(400).send('ID must be a number');
        return;
    }
    if (!name || name.trim() === '') {
        res.status(400).send('Name is required');
        return;
    }
    const userIndex = users.findIndex(user => user.id === +id);
    if (userIndex === -1) {
        res.status(404).send(`User with id ${id} not found`);
        return;
    }
    users[userIndex] = {
        ...users[userIndex],
        name
    };
    res.status(200).send('User updated successfully');
}
const remove = (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('ID must be a number');
        return;
    }
    const userIndex = users.findIndex(user => user.id === +id);
    if (userIndex === -1) {
        res.status(404).send(`User with id ${id} not found`);
        return;
    }
    users.splice(userIndex, 1);
    res.status(200).send('User deleted successfully');
}
module.exports = { getAll, getById, create, update, remove };
//tarea: Debemos agregar los endpoint de agregar, editar y eliminar el usuario
module.exports = {getAll, getById};



