const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')));

// Main
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// Generator API
app.get('/generator', (req, res) => {
    const spawn = require('child_process').spawn;
    const pyProcess = spawn('python', [path.join(__dirname, 'build', 'catan-generator.py')]);

    pyProcess.stdout.on('data', (data) => {
        res.send(data);
    })
})

app.listen(port, () => console.log('Listening on port: ' + port));
