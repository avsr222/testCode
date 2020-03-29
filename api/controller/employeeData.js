let methods = {};
const employeJson = require('../db/data.json');
const fs = require('fs');
const path = require('path')
methods.getEmployeeList = (req, res)=>{
    let empData = employeJson;
    res.send(empData.employee)
}
methods.registerEmployee = (req, res)=>{
    fs.readFile(__dirname+'/../db/data.json', 'utf-8', function (err, data) {
        if(err){
            res.send(err)
        }
        var json = JSON.parse(data);
        let count = Object.keys(json.employee).length;
        req.body['id'] = count + 1;
        json.employee[`${count+1}`]=(req.body);
    
        fs.writeFile(__dirname+'/../db/data.json', JSON.stringify(json),'utf-8', (err)=>{
            if (err) throw err
            res.send({});
        });
        
    });
    
}
methods.getEmployee = (req, res)=>{
    let empData = employeJson;
    let {id} = req.params;
    //id = id.toString();
    res.send(empData.employee[id]);
}
methods.updateEmployee = (req, res)=>{
    let {id} = req.body
    fs.readFile(__dirname+'/../db/data.json', 'utf-8', function (err, data) {
        if(err){
            res.send(err)
        }
        
        var json = JSON.parse(data);
        json.employee[`${id}`]=(req.body);
    
        fs.writeFile(__dirname+'/../db/data.json', JSON.stringify(json),'utf-8', (err)=>{
            if (err) throw err
            res.send({});
        });
        
    });
}
methods.deleteEmployee = (req, res)=>{
    let {id} = req.params;
    fs.readFile(__dirname+'/../db/data.json', 'utf-8', function (err, data) {
        if(err){
            res.send(err)
        }
        var json = JSON.parse(data);
        console.log('delete', id)
        delete json.employee[`${id}`];
    
        fs.writeFile(__dirname+'/../db/data.json', JSON.stringify(json),'utf-8', (err)=>{
            if (err) throw err
            res.send({});
        });
        
    });
}
module.exports = methods