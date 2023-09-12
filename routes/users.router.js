const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');

router.get('/', (req, res) => {
  let users = [];
  const { limit = 5 } = req.query;

  for (let index = 0; index < limit; index++) {
    users.push(
      {
        name: faker.person.fullName(),
        gender: faker.person.gender()
      }
    );
  }
console.log(users);

  res.json(
    {
      users
    }
    );
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id: id,
    name: 'Marcos',
    gender: 'male'
  });
});

router.post('/', (req, res) => {
 const body = req.body;

 res.json({
   message: 'created',
   data: body
 })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    id: id,
    data: body,
    message: 'updated'
  })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    id: id,
    data: body,
    message: 'updated'
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req. params;

  res.json({
    message: 'deleted',
    id: id
  });
});

module.exports = router;
