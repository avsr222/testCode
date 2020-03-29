const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var router = express.Router(); 
const {
	getEmployeeList,
	getEmployee,
	updateEmployee,
	registerEmployee,
	deleteEmployee
} = require('./controller/employeeData');

app.get('/', (req, res) => {
	res.send('Welcome to Node API')
})

app.get('/getData', (req, res) => {
	res.json({'message': 'Hello World'})
});

app.get('/getEmployeeList',getEmployeeList);
app.get('/employees/:id',getEmployee);
app.put('/updateEmployees', updateEmployee)
app.post('/regEmployees',registerEmployee);
app.delete('/delEmployees/:id',deleteEmployee);


app.post('/postData', bodyParser.json(), (req, res) => {
	res.json(req.body)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))