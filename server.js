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
    console.log(`Connected to the movie_db database.`)
  );

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// view the db
app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', function (err, result) {
        console.log('table is');
        res.json(result);
    })
})

// add a movie to the db
const testName = 'rocky 5';

app.post('/api/add-movie', (req, res) => {
    db.query('INSERT INTO movies (movie_name) VALUES (?)', testName , function (err, result) {
        console.log(`inserted movie ${testName}`);
        err ? console.error(err) : console.log(result);
    })
});

app.delete('/api/movie/:id', (req, res) => {
    const deleteId = req.params.id;
    db.query('DELETE FROM movies WHERE id = ?', deleteId , function (err, result) {
        console.log(`deleting movie id is ${deleteId}`);
        err ? console.error(err) : console.log(result);
    })
});

app.get('/api/movie-reviews', (req, res) => {
    db.query('SELECT movie_name, review, reviews.id AS "Review ID" FROM movies JOIN reviews ON movies.id = reviews.movie_id', function (err, result) {
        err ? console.error(err) : console.table(result);
    })
})

app.put('/api/review/:id', (req, res) => {
    const id = req.params.id;
    const newReview = 'it is perfect';
    db.query('UPDATE reviews SET review = ? WHERE id = ?', [newReview, id], function (err, result) {
        err ? console.error(err) : console.table(result);
    })
})





app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
})