const express = require('express');
const path = require('path');
const fs = require('fs');
const taskRouter = require('./routes/task.routes')
const app = express();
const PORT = 3600;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS 
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Main Route
app.get("/", (req, res) => {
    fs.readdir('./Files', (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error loading files.");
        }
        res.render('index', { files: files });
    });
});

// Task Route
app.use('/task',taskRouter);


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

