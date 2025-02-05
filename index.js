const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const e_route = require('./routes_emp')

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use('/', e_route);
app.get("/new_emp", async (req, res) => {
    res.render("new_emp_data")
});

app.post('/get_data', (req, res) => {
    //console.log(req.body);
    const { empId, empName, empAge, empCity } = req.body;

    console.log('Received Form Data:');
    console.log(`Employee ID: ${empId}`);
    console.log(`Name: ${empName}`);
    console.log(`Age: ${empAge}`);
    console.log(`City: ${empCity}`);
});

app.listen(3000, () => {
    console.log('server start');
});