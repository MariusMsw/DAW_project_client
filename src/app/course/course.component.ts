import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {Course} from '../_models/course';
import {CourseDto} from '../_models/course_dto';
import {CourseService} from '../_services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  dataSaved = false;
  courseForm: any;
  allCourses: Observable<CourseDto[]> = new Observable<CourseDto[]>();
  courseIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder,
              private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseForm = this.formbulider.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    this.loadCourses();
  }

  loadCourses() {
    this.allCourses = this.courseService.getCourses().pipe(tap(_ => console.log(_)));
  }

  onFormSubmit() {
    this.dataSaved = false;
    const course = this.courseForm.value;
    this.CreateCourse(course);
    this.courseForm.reset();
  }

  loadCourse(courseId: number) {
    this.courseService.getCourse(courseId).subscribe(course => {
      this.massage = null;
      this.dataSaved = false;
      this.courseIdUpdate = course.courseId;
      this.courseForm.patchValue(course);
    });
  }

  CreateCourse(course: Course) {
    if (this.courseIdUpdate == null) {
      this.courseService.createCourse(course).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadCourses();
          this.courseIdUpdate = null;
          this.courseForm.reset();
        }
      );
    } else {
      course.CourseId = this.courseIdUpdate;
      this.courseService.updateCourse(course.CourseId, course).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadCourses();
        this.courseIdUpdate = null;
        this.courseForm.reset();
      });
    }
  }

  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.courseService.deleteCourse(courseId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Successfully';
        this.loadCourses();
        this.courseIdUpdate = null;
        this.courseForm.reset();
      });
    }
  }

  resetForm() {
    this.courseForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }

}
