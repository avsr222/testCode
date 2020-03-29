import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  constructor(private http: HttpClient) { }

  addNewEmployeeAPI(empData){
  	return this.http.post('/api/regEmployees', empData)
  }
  getEmployeeListAPI(){
    return this.http.get('/api/getEmployeeList')
  }
  updateEmployeeAPI(empData){
    return this.http.put('/api/updateEmployees/',empData)
  }
  deleteEmployeeAPI(id){
    return this.http.delete('/api/delEmployees/'+id);
  }
  getSingleEmployeeAPI(id){
    return this.http.get('/api/employees/'+id);
  }

}
