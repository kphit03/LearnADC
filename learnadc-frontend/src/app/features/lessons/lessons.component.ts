import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ViewChild, ElementRef } from '@angular/core';

//interface that defines shape of each lesson object
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

export class LessonsComponent implements OnInit, AfterViewInit {
  courseId!: number; //stores current course id from route
  lessonId!: number; //stored current lesson id from route
  lessons: Lesson[] = []; //array of lessons for curr course
  currentLesson: Lesson | null = null; //current lesson selected

  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {}
  // Fetch lessons from backend based on course Id, sets curr lesson based on id from url
  fetchLessons() {
    this.http.get<Lesson[]>(`${environment.apiBaseUrl}/courses/${this.courseId}/lessons`).subscribe({
      next: (data) => {
        this.lessons = data;
        //find specific lesson that matches the id in url
        this.currentLesson = data.find(l => l.id === this.lessonId) || null;
        //if lesson not found (eg. bad url)
        if (!this.currentLesson) {
          console.warn('Lesson not found in course. Possible mismatch or bad URL.');
        }
        this.videoAlreadyLoaded = false; // reset flag so iframe can be reloaded

        //if the view is initialized and lesson available, inject the video
        if (this.currentLesson && this.viewInitialized) {
          setTimeout(() => {
            this.loadVideoEmbed(this.currentLesson!.videoUrl);
          });
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('Failed to load lessons', err);
      }
    });
  }
  
  //reference video container in html, this is used for injecting iframe
  @ViewChild('videoContainer', { static: false }) videoContainer?: ElementRef;

  //dynamically inject a youtube iframe for the given url from db
  loadVideoEmbed(videoUrl: string) {
    const videoId = this.extractVideoId(videoUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    //create iframe
    const iframe = document.createElement('iframe');
  
    iframe.width = '100%';
    iframe.height = '450';
    iframe.src = embedUrl;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.className = 'lesson-iframe'; // class name for styling purposes

    const container = this.videoContainer?.nativeElement;// 1 CREATE CONTAINER TO APPEND
    if (!container) return; //if dom isn't ready yet, return
    container.innerHTML = ''; // Clear any previous video
    
    container.appendChild(iframe); // 2 APPEND IFRAME TO CONTAINER ONCE CREATED, THIS DISPLAYS VID
  }

  //load lessons for current course on the course load
  ngOnInit(): void {
    this.checkMobileScreen();
    window.addEventListener('resize', this.checkMobileScreen.bind(this));

    //react to route changes, like if a user selects a new lesson
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId')!;  
      this.lessonId = +params.get('lessonId')!;
      this.fetchLessons(); // new method
    });
  }

  //lifecycle method that runs when view is fully initialized, ensures @ViewChild DOM elements like #videoContainer exist
  ngAfterViewInit(): void {
    this.viewInitialized = true;
    // if lesson is alr selected, load its video
    if (this.currentLesson) {
      setTimeout(() => {
        this.loadVideoEmbed(this.currentLesson!.videoUrl);
      });
    }
  }

  //flag to prevent injecting vid multiple times
  videoAlreadyLoaded = false;

  //angular lifecycle method. run after each view update, checks if vid should be injected once dom is ready
  ngAfterViewChecked(): void {
    if (this.currentLesson && this.videoContainer && !this.videoAlreadyLoaded) {
      this.loadVideoEmbed(this.currentLesson.videoUrl);
      this.videoAlreadyLoaded = true;
    }
  }

  extractVideoId(url: string): string {
    const match = url.match(/[?&]v=([^&#]*)/);
    return match ? match[1] : '';
}


  sidebarOpen = false; // track if the sidebar is open or closed

  viewInitialized = false; //check if view is initialized (used to prevent premature iframe injection)

  toggleSidebar() { //when clicking the html element with this in it, toggle sidebar (for mobile responsiveness purposes)
    this.sidebarOpen = !this.sidebarOpen;
  }

  //track if current screen is mobile
  isMobileScreen = false;

  //detect if screen is in mobile view and updates flag accordingly
  checkMobileScreen() {
    this.isMobileScreen = window.innerWidth <= 768;
  }

  
}

