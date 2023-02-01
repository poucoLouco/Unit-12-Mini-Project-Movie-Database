const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'asdf',
      database: 'movie_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/movies', (req, res) => {

})











app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
})