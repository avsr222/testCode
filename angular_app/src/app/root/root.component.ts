import { Component, OnInit } from '@angular/core';
import { RootService } from './root.service';
//import {FormGroup, FormControl, Validators}  from '@angular/forms';
//import { stringify } from '@angular/core/src/render3/util';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})

export class RootComponent implements OnInit {
  headElements  = [ 'First Name', 'Last Name', 'Hire Date',"",""];
  elements = [];
  display='none';
  employeeData = {}
  spinnerDisplay = 'none'
  keys = [];
  edit = 'true'
  updatedEmpBody = {}
  newEmpBody = {}
  constructor(private rootService : RootService) { }

  async ngOnInit() {
    let resData = {}
    resData = await this.getEmployeeList();
    let tempElements = [];
    for(let key in resData){
      tempElements.push(resData[key])
    }
    this.elements = tempElements;
  }

  async openModal(id){
    //let checked = id
    if(id!= false){
      this.employeeData = await this.editEmployeeData(id);
      this.updatedEmpBody= this.employeeData;
      this.keys = Object.keys(this.employeeData);
      this.display='block';
    }else{
      this.edit = 'false'
      this.display='block';
    }
    
  }
   onCloseHandled(){
      this.display='none';
  }
  onChangedValue(value,key){
    this.updatedEmpBody[key] = value;
  }
  onInsertValue(value,key){
    this.newEmpBody[key] = value;
  }
  getEmployeeList(){
    return new Promise((resolve,reject)=>{
      this.rootService.getEmployeeListAPI().subscribe((response)=>{
        console.log('response from GET API is ', response);
        resolve(response)
      },(error) => {
        reject(error)
        console.log('error is ', error)
      })
    })
    
  }
  editEmployeeData(id){
   return new Promise ((resolve,reject)=>{
    this.rootService.getSingleEmployeeAPI(id).subscribe((response)=>{
      console.log('response from POST API is ', response);
      resolve(response);
      
    },(error)=>{
      console.log('error during post is ', error)
      reject(error)
    });
   })
    
  }
  updateEmployee (){
    this.rootService.updateEmployeeAPI(this.updatedEmpBody).subscribe(async (response)=>{
      console.log('response from POST API is ', response);
      let resData = {}
      setTimeout(async() => { 
        resData= await this.getEmployeeList();
        let tempElements = [];
        for(let key in resData){
          tempElements.push(resData[key])
        }
        this.elements = tempElements;
        this.spinnerDisplay='none';
        this.onCloseHandled();
      }, 3000);
      
    },(error)=>{
      console.log('error during post is ', error)
    });
  }
  addNewEmployee(){
    
    this.rootService.addNewEmployeeAPI(this.newEmpBody).subscribe((response)=>{
      console.log('response from POST API is ', response);
      let resData = {}
      setTimeout(async() => { 
        resData= await this.getEmployeeList();
        let tempElements = [];
        for(let key in resData){
          tempElements.push(resData[key])
        }
        this.elements = tempElements;
        this.spinnerDisplay='none';
        this.onCloseHandled();
      }, 3000);
    },(error)=>{
      console.log('error during post is ', error)
    });
    
  }
  deleteEmployee(id){
    this.spinnerDisplay='block';
    this.rootService.deleteEmployeeAPI(id).subscribe(async (response)=>{
      console.log('response from POST API is ', response);
      let resData = {}
      setTimeout(async() => { 
        resData= await this.getEmployeeList();
        let tempElements = [];
        for(let key in resData){
          tempElements.push(resData[key])
        }
        this.elements = tempElements;
        this.spinnerDisplay='none';
      }, 3000);
     
    },(error)=>{
      console.log('error during delete is ', error)
    });
  }
}
