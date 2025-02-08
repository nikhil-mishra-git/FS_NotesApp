const fs = require('fs')

// createTask
function createTask(req, res){
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
}

// readTask
function readTask(req, res){
    const file = req.params.fileName;
    fs.readFile(`./Files/${file}`, 'utf-8', (err, fileDetail) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file.");
        }
        res.render("file", { fileName: file, fileDetail: fileDetail });
    });
}

// editTask
function editTask(req, res){
    const file = req.params.fileName;
    fs.readFile(`./Files/${file}`, "utf-8", (err, fileDetail) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file.");
        }
        res.render("editFile", { fileName: file, fileDetail: fileDetail });
    });
}

// updateTask
function updateTask(req, res){
    const fileName = req.params.fileName;
    const fileData = req.body.fileDetail;

    fs.writeFile(`./Files/${fileName}`, fileData, (err) => {
        if (err) {
            console.error("Error updating file:", err);
            return res.status(500).send("Error updating file.");
        }
        res.redirect(`/task/read/${encodeURIComponent(fileName)}`);
    });
}

// deleteTask
function deleteTask(req, res){
    const file = req.params.fileName;
    fs.unlink(`./Files/${file}`, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Error deleting file.");
        }
        res.redirect("/");
    });
}


module.exports = {createTask,readTask,editTask,updateTask,deleteTask}