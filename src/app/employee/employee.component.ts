import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Employee} from '../_models/employee';
import {EmployeeService} from '../_services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<Employee[]>;
  employeeIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      LastName: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      Title: ['', ''],
      TitleOfCourtesy: ['', ''],
      BirthDate: ['', [Validators.required]],
      HireDate: ['', ''],
      Address: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Region: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      HomePhone: ['', [Validators.required]],
      Notes: ['', [Validators.required]],
    });
    this.loadEmployees();
  }

  loadEmployees() {
    this.allEmployees = this.employeeService.getEmployees();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  loadEmployee(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmployeeID;
      this.employeeForm.controls.LastName.setValue(employee.LastName);
      this.employeeForm.controls.FirstName.setValue(employee.FirstName);
      this.employeeForm.controls.Title.setValue(employee.Title);
      this.employeeForm.controls.TitleOfCourtesy.setValue(employee.TitleOfCourtesy);
      this.employeeForm.controls.BirthDate.setValue(employee.BirthDate);
      this.employeeForm.controls.HireDate.setValue(employee.HireDate);
      this.employeeForm.controls.Address.setValue(employee.Address);
      this.employeeForm.controls.City.setValue(employee.City);
      this.employeeForm.controls.Region.setValue(employee.Region);
      this.employeeForm.controls.PostalCode.setValue(employee.PostalCode);
      this.employeeForm.controls.Country.setValue(employee.Country);
      this.employeeForm.controls.HomePhone.setValue(employee.HomePhone);
      this.employeeForm.controls.Notes.setValue(employee.Notes);
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
      employee.EmployeeID = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this ?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
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
