import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
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
//
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

  addCourse(courseData: { title: string; description: string; category: string }) {
    return this.http.post<Course>(`${this.apiUrl}/create`, courseData);
  }

  addLessonToCourse(courseId: number, lessonData: { title: string; description: string; videoUrl: string }) {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData, { responseType: 'text' });
  }
  updateLesson(courseId: number, lessonId: number, lessonData: { title: string; description: string; videoUrl: string }) {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData, { responseType: 'text' });
  }
  
  deleteLesson(courseId: number, lessonId: number) {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { responseType: 'text' });
  }

  updateCourse(id: number, courseData: { title: string; description: string; category: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, courseData, { responseType: 'text' });
  }
  
  deleteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  
}
