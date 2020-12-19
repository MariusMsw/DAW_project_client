import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {DepartmentDto} from '../_models/department_dto';
import {DepartmentService} from '../_services/department.service';
import {Department} from '../_models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  dataSaved = false;
  departmentForm: any;
  allDepartments: Observable<DepartmentDto[]> = new Observable<DepartmentDto[]>();
  departmentIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder,
              private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentForm = this.formbulider.group({
      Name: ['', [Validators.required]],
    });
    this.loadDepartments();
  }

  loadDepartments() {
    this.allDepartments = this.departmentService.getDepartments().pipe(tap(_ => console.log(_)));
  }

  onFormSubmit() {
    this.dataSaved = false;
    const department = this.departmentForm.value;
    this.CreateDepartment(department);
    this.departmentForm.reset();
  }

  loadDepartment(departmentId: number) {
    this.departmentService.getDepartment(departmentId).subscribe(department => {
      this.massage = null;
      this.dataSaved = false;
      this.departmentIdUpdate = department.departmentId;
      this.departmentForm.controls.Name.setValue(department.name);
    });
  }

  CreateDepartment(department: Department) {
    if (this.departmentIdUpdate == null) {
      this.departmentService.createDepartment(department).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadDepartments();
          this.departmentIdUpdate = null;
          this.departmentForm.reset();
        }
      );
    } else {
      department.DepartmentId = this.departmentIdUpdate;
      this.departmentService.updateDepartment(department.DepartmentId, department).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadDepartments();
        this.departmentIdUpdate = null;
        this.departmentForm.reset();
      });
    }
  }

  deleteDepartment(departmentId: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.departmentService.deleteDepartment(departmentId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Successfully';
        this.loadDepartments();
        this.departmentIdUpdate = null;
        this.departmentForm.reset();
      });
    }
  }

  resetForm() {
    this.departmentForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}
