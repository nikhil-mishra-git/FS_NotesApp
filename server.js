const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3600;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS 
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    fs.readdir('./Files', (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error loading files.");
        }
        res.render('index', { files: files });
    });
});

// Create Task Route
app.post("/task/create", (req, res) => {
    const { fileTitle, fileDetail } = req.body;
    if (!fileTitle || !fileDetail) {
        return res.status(400).send("All Fields are Mandatory");
    }

    const fileName = fileTitle.split(" ").join("") + ".txt";

    fs.writeFile(`./Files/${fileName}`, fileDetail, (err) => {
        if (err) {
            console.error("Error creating file:", err);
            return res.status(500).send("Error creating task.");
        }
        res.redirect("/");
    });
});

// Read a File
app.get("/task/read/:fileName", (req, res) => {
    const file = req.params.fileName;
    fs.readFile(`./Files/${file}`, 'utf-8', (err, fileDetail) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file.");
        }
        res.render("file", { fileName: file, fileDetail: fileDetail });
    });
});

// Edit a File - Show Edit Page
app.get("/task/edit/:fileName", (req, res) => {
    const file = req.params.fileName;
    fs.readFile(`./Files/${file}`, "utf-8", (err, fileDetail) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file.");
        }
        res.render("editFile", { fileName: file, fileDetail: fileDetail });
    });
});

// Update a File - Save Edits
app.post("/task/update/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const fileData = req.body.fileDetail;

    fs.writeFile(`./Files/${fileName}`, fileData, (err) => {
        if (err) {
            console.error("Error updating file:", err);
            return res.status(500).send("Error updating file.");
        }
        res.redirect(`/task/read/${encodeURIComponent(fileName)}`);
    });
});

// Delete Task
app.get("/task/delete/:fileName", (req, res) => {
    const file = req.params.fileName;
    fs.unlink(`./Files/${file}`, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Error deleting file.");
        }
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
