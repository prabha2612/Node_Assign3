const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000;


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'htmlfiles')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'htmlfiles', 'index.html'));
});


app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'htmlfiles', 'create.html'));
});

app.post('/add', (req, res) => {
    const userName = req.body.userName;

    // Append the user name to the 'users.txt' file
    fs.appendFile('users.txt', `${userName}\n`, (error) => {
        if (error) {
            console.error('Error appending user to file:', error);
            res.status(500).send('Error adding user');
        } else {
            console.log('User added successfully:', userName);
            res.redirect('/users');
        }
    });
});


app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'htmlfiles', 'users.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
