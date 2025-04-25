import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course { //defines structure of a course obj in JS
  id: number;
  title: string;
  description: string;
  category: string;
}
export interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private apiUrl = `${environment.apiBaseUrl}/courses`;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> { //get all courses and return array of courses
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> { //get 1 course and return 1 course obj
    return this.http.get<Course>(`${this.apiUrl}/${id}`)
  }

  getLessonsForCourse(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
  }
}
