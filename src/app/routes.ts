import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {EmployeeComponent} from './employee/employee.component';
import {DepartmentComponent} from './department/department.component';
import {CourseComponent} from './course/course.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'employee', component: EmployeeComponent},
      {path: 'department', component: DepartmentComponent},
      {path: 'course', component: CourseComponent},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
