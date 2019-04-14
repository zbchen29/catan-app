const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'src')));
// app.use(express.static(path.join(__dirname, 'src', 'components')));
// app.use(express.static(path.join(__dirname, 'src', 'images')));

// Main
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Generator API
app.get('/generator', (req, res) => {
    const spawn = require('child_process').spawn;
    const pyProcess = spawn('python', [path.join(__dirname, 'src', 'scripts', 'catan-generator.py')]);

    pyProcess.stdout.on('data', (data) => {
        res.send(data);
    })
})

app.listen(port, () => console.log('Listening on port: ' + port));
