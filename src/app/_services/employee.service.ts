import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../_models/employee';
import {environment} from 'src/environments/environment';

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

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + 'employee/', httpOptions);
    // return this.http.get<Employee[]>(this.url + 'employee/');
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + 'employee/' + id, httpOptions);
    // return this.http.get<Employee>(this.url + 'employee/' + id);
  }
}
