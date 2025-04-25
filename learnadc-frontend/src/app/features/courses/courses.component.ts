import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseService, Course, Lesson } from '../../core/course.service';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  standalone: true
})



//this component will fetch and display all courses from backend
export class CoursesComponent {
  courses: Course[] = [];
  loading = true;
  firstLessonIds: { [courseId: number]: number } = {};

  constructor(private courseService: CourseService) { //dependcy injection

  }
  
  ngOnInit(): void {
    console.log('CoursesComponent initialized');
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
        console.log('Loaded courses:', courses); 
        courses.forEach(course => {
          this.courseService.getLessonsForCourse(course.id).subscribe({
            next: (lessons: Lesson[]) => {
              if (lessons.length > 0) {
                this.firstLessonIds[course.id] = lessons[0].id;
              }
            },
            error: (err: any) => {
              console.error(`Failed to load lessons for course ${course.id}`, err);
            }
          });
        });
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error loading courses', err);
      }
    });
  }
  
}
