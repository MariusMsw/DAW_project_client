import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CourseDto} from '../_models/course_dto';
import {Course} from '../_models/course';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
  }

  getCourses(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(this.url + 'course/', httpOptions);
  }

  getCourse(id: number): Observable<CourseDto> {
    return this.http.get<CourseDto>(this.url + 'course/' + id, httpOptions);
  }

  createCourse(course: Course): any {
    return this.http.post<Course>(this.url + 'course/', course, httpOptions);
  }

  updateCourse(courseId: number, course: Course): any {
    return this.http.put<Course>(this.url + 'course/' + courseId, course, httpOptions);
  }

  deleteCourse(courseId: number): any {
    return this.http.delete<Course>(this.url + 'course/' + courseId, httpOptions);
  }
}
