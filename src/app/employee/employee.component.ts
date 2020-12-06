import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Employee} from '../_models/employee';
import {EmployeeService} from '../_services/employee.service';
import {tap} from 'rxjs/operators';
import {EmployeeDto} from '../_models/employee_dto';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<EmployeeDto[]> = new Observable<EmployeeDto[]>();
  employeeIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Mail: ['', [Validators.required]],
      Salary: ['', [Validators.required]],
      DepartmentId: ['', [Validators.required]],
      LaptopId: ['', [Validators.required]],
    });
    this.loadEmployees();
  }

  loadEmployees() {
    this.allEmployees = this.employeeService.getEmployees().pipe(tap(_ => console.log(_)));
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    employee.Salary = Number(employee.Salary);
    employee.DepartmentId = Number(employee.DepartmentId);
    employee.LaptopId = Number(employee.LaptopId);
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  loadEmployee(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.employeeId;
      this.employeeForm.controls.Mail.setValue(employee.mail);
      this.employeeForm.controls.Name.setValue(employee.name);
      this.employeeForm.controls.Salary.setValue(employee.salary);
      this.employeeForm.controls.DepartmentId.setValue(employee.departmentId);
      this.employeeForm.controls.LaptopId.setValue(employee.laptopId);
    });
  }

  CreateEmployee(employee: Employee) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.EmployeeId = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.EmployeeId, employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Successfully';
        this.loadEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}
