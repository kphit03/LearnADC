import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Course, Lesson } from '../../core/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // Course & Lesson state
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  lessons: Lesson[] = [];

  // Modal toggles
  showModal = false;
  showLessonModal = false;

  // Form models
  newCourse = {
    title: '',
    description: '',
    category: ''
  };

  newLesson = {
    title: '',
    description: '',
    videoUrl: ''
  };

  editingLesson: Lesson | null = null;

  constructor(private courseService: CourseService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Failed to fetch courses', err)
    });
  }

  addCourse(): void {
    const { title, description, category } = this.newCourse;

    if (!title || !description || !category) {
      this.toastr.error('Fill in all fields.');
      return;
    }

    this.courseService.addCourse(this.newCourse).subscribe({
      next: () => {
        this.loadCourses();
        this.newCourse = { title: '', description: '', category: '' };
        this.showModal = false;
        this.toastr.success('Course added successfully!');
      },
      error: (err) => {
        console.error('Failed to add course:', err);
        this.toastr.error('Failed to add course.');
      }
    });
  }

  viewLessons(course: Course): void {
    this.selectedCourse = course;
    this.courseService.getLessonsForCourse(course.id).subscribe({
      next: (data) => {
        this.lessons = data;
        this.showLessonModal = true;
        this.editingLesson = null;
      },
      error: (err) => {
        console.error('Failed to fetch lessons:', err);
        this.toastr.error('Failed to fetch lessons.');
      }
    });
  }

  addLesson(): void {
    if (!this.selectedCourse) return;

    const { title, description, videoUrl } = this.newLesson;

    if (!title || !description || !videoUrl) {
      this.toastr.error('Fill in all fields.');
      return;
    }

    this.courseService.addLessonToCourse(this.selectedCourse.id, this.newLesson).subscribe({
      next: () => {
        this.newLesson = { title: '', description: '', videoUrl: '' };
        this.viewLessons(this.selectedCourse!); // Safe since it's just used
        this.toastr.success('Lesson added successfully!');
      },
      error: (err) => {
        console.error('Failed to add lesson:', err);
        this.toastr.error('Failed to add lesson.');
      }
    });
  }

  startEditingLesson(lesson: Lesson): void {
    this.editingLesson = { ...lesson }; // clone to avoid binding to original
  }

  cancelEdit(): void {
    this.editingLesson = null;
  }

  saveLessonEdit(): void {
    if (!this.selectedCourse || !this.editingLesson) return;

    const { id, title, description, videoUrl } = this.editingLesson;

    this.courseService.updateLesson(this.selectedCourse.id, id, { title, description, videoUrl }).subscribe({
      next: () => {
        this.editingLesson = null;
        this.viewLessons(this.selectedCourse!); // Safe assertion
        this.toastr.success('Lesson edited successfully!');
      },
      error: (err) => {
        console.error('Failed to update lesson:', err);
        this.toastr.error('Failed to update lesson.');
      }
    });
  }

  deleteLesson(lesson: Lesson): void {
    if (!this.selectedCourse || !confirm(`Delete lesson "${lesson.title}"?`)) return;

    this.courseService.deleteLesson(this.selectedCourse.id, lesson.id).subscribe({
      next: () => {
        this.viewLessons(this.selectedCourse!)
        this.toastr.success('Lesson deleted!');
      },
      error: (err) => {
        console.error('Failed to delete lesson:', err);
        this.toastr.error('Failed to delete lesson.');
      }
    });
  }
  editingCourse: Course | null = null;

startEditingCourse(course: Course): void {
  this.editingCourse = { ...course }; // shallow clone
}

cancelCourseEdit(): void {
  this.editingCourse = null;
}

saveCourseEdit(): void {
  if (!this.editingCourse) return;
  const { id, title, description, category } = this.editingCourse;

  this.courseService.updateCourse(id, { title, description, category }).subscribe({
    next: () => {
      this.loadCourses();
      this.editingCourse = null;
      this.toastr.success('Course saved successfully!');
    },
    error: (err) => {
      console.error('Failed to update course:', err);
      this.toastr.error('Failed to update course.');
    }
  });
}

deleteCourse(course: Course): void {
  if (!confirm(`Delete course "${course.title}"?`)) return;

  this.courseService.deleteCourse(course.id).subscribe({
    next: () => {
      this.loadCourses()
      this.toastr.success('Course deleted');
    },
    error: (err) => {
      console.error('Failed to delete course:', err);
      this.toastr.error('Failed to delete course.');
    }
  });
}
}
