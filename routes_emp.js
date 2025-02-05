const bodyParser = require('body-parser')

const express = require('express')
const emp = require('./mode_emp')

const emp_router = express.Router();
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

emp_router.post('/insert_emp', async (req, res) => {
  //console.log(req.body);
  const { empId, empName, empAge, empCity } = req.body;

  console.log('Received Form Data:');
  console.log(`Employee ID: ${empId}`);
  console.log(`Name: ${empName}`);
  console.log(`Age: ${empAge}`);
  console.log(`City: ${empCity}`);
  try {
    //here eid is mongodb collection field name is mismatch so mannually type
    const e1 = new emp({
      eid: empId,
      ename: empName,
      age: empAge,
      city: empCity
    });
    await e1.save();
    res.redirect('/fetch_emp');
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Get all users
emp_router.get('/fetch_emp', async (req, res) => {
  try {
    const emps = await emp.find({});
    res.render('emp_list', { emps });  // Render 'employees.ejs' with data
    //res.send(emps);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

emp_router.get('/delete_emp/:id', async (req, res) => {
  try {
    const e1 = new emp();
    const { id } = req.params;
    console.log(id)
    console.log("aa j che")
    const deletedEmp = await emp.findByIdAndDelete(id);
    res.redirect('/fetch_emp');
    // res.status(200).json({ success: true, message: "Employee deleted successfully" });
  }
  catch (error) {

  }
});

emp_router.get('/update_emp/:id', async (req, res) => {
  try {
    const e1 = new emp();
    const { id } = req.params;
    //console.log(id)
    const emp_data=await emp.findById(id);
    res.render('update_emp', { emp_data });
  }
  catch (error) {

  }
});


emp_router.post('/update_emp', async (req, res) => {
  try {
    const { txtH1,empId, empName, empAge,empCity } = req.body;
    await emp.findByIdAndUpdate(txtH1, {
      eid: empId,
      ename: empName,
      age: empAge,
      city: empCity
    });
    res.redirect('/fetch_emp');
    //res.redirect('/employees'); // Redirect to the employees list or another appropriate page
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
module.exports = emp_router;