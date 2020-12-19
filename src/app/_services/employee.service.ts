import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../_models/employee';
import {environment} from 'src/environments/environment';
import {EmployeeDto} from '../_models/employee_dto';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;
  url = 'https://localhost:5001/api/';

  constructor(
    private http: HttpClient
  ) {
  }

  getEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.url + 'employee/', httpOptions);
  }

  getEmployee(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(this.url + 'employee/' + id, httpOptions);
  }

  createEmployee(employee: Employee): any {
    return this.http.post<Employee>(this.url + 'employee/', employee, httpOptions);
  }

  updateEmployee(employeeId: number, employee: Employee): any {
    return this.http.put<Employee>(this.url + 'employee/' + employeeId, employee, httpOptions);
  }

  deleteEmployee(employeeId: number): any {
    return this.http.delete<Employee>(this.url + 'employee/' + employeeId, httpOptions);
  }
}
