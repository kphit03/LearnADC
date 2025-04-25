import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
  standalone: true
})

export class LessonsComponent implements OnInit {
  courseId!: number;
  lessonId!: number;
  lessons: Lesson[] = [];
  currentLesson: Lesson | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId')!;
      this.lessonId = +params.get('lessonId')!;
  
      this.http.get<Lesson[]>(`${environment.apiBaseUrl}/courses/${this.courseId}/lessons`).subscribe({
        next: (data) => {
          this.lessons = data;
          this.currentLesson = data.find(l => l.id === this.lessonId) || null;
          window.scrollTo({ top: 0, behavior: 'smooth' }); // optional UX improvement
        },
        error: (err) => {
          console.error('Failed to load lessons', err);
        }
      });
    });
  }
  



  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    const videoId = this.extractVideoId(videoUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoId(url: string): string {
    const match = url.match(/[?&]v=([^&#]*)/);
    return match ? match[1] : '';
}
  

}
