import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {NavComponent} from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';

import {ErrorInterceptorProvider} from './_services/error.service';
import {AuthService} from './_services/auth.service';

import {appRoutes} from './routes';
import {AgePipe} from './_pipes/age.pipe';
import {DateConverterPipe} from './_pipes/date-converter.pipe';
import {EmployeeComponent} from './employee/employee.component';
import {DepartmentComponent} from './department/department.component';
import {CourseComponent} from './course/course.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// tslint:disable-next-line:typedef
export function tokenGetter() {
  return localStorage.getItem('token');
}

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    DateConverterPipe,
    AgePipe,
    EmployeeComponent,
    DepartmentComponent,
    CourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService,
    ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
