const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS, JS, images, etc.)
app.set('view engine', 'ejs'); // Set EJS template engine

let todos = []; // Array to store tasks

// Routes
app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req,res) => {
    const newTodo = req.body;
    if (newTodo) todos.push(newTodo); // Add new tash to todo list
    res.redirect('/')
 });

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index, 10); // Parse the index as an integer
    if (!isNaN(index) && index >= 0 && index < todos.length) {
        todos.splice(index, 1); // Remove the task from the array
    }
    res.redirect("/");
});
 
// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});