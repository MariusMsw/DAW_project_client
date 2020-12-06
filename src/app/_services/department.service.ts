import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDto} from '../_models/employee_dto';
import {Employee} from '../_models/employee';
import {DepartmentDto} from '../_models/department_dto';
import {Department} from '../_models/department';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(this.url + 'department/', httpOptions);
  }

  getDepartment(id: number): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(this.url + 'department/' + id, httpOptions);
  }

  createDepartment(department: Department): any {
    return this.http.post<Department>(this.url + 'department/', department, httpOptions);
  }

  updateDepartment(departmentId: number, department: Department): any {
    return this.http.put<Department>(this.url + 'department/' + departmentId, department, httpOptions);
  }

  deleteDepartment(departmentId: number): any {
    return this.http.delete<Department>(this.url + 'department/' + departmentId, httpOptions);
  }
}
