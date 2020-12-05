import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  login(model: any) {
    return this.http.post(
      this.baseUrl + 'login',
      model,
    ).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  register(model: any) {
    return this.http.post(
      this.baseUrl + 'register',
      model
    );
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    return localStorage.getItem('token') != null;
  }
}
