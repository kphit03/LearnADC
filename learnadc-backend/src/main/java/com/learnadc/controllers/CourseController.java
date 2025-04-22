package com.learnadc.controllers;

import com.learnadc.dto.CourseRequestDTO;
import com.learnadc.dto.CourseResponseDTO;
import com.learnadc.dto.LessonRequestDTO;
import com.learnadc.services.CourseService;
import com.learnadc.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;
    private final LessonService lessonService;

    @Autowired
    public CourseController(CourseService courseService, LessonService lessonService) {
        this.courseService = courseService;
        this.lessonService = lessonService;
    }

    //ADMIN ONLY: Add course
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseResponseDTO> createCourse(@RequestBody CourseRequestDTO request) {
        CourseResponseDTO created = courseService.createCourse(request);
        return ResponseEntity.ok(created);
    }

    //ADMIN ONLY: Add lesson to course
    @PostMapping("/{courseId}/lessons")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addLesson(@PathVariable Long courseId, @RequestBody LessonRequestDTO request) {
        lessonService.addLessonToCourse(courseId, request);
        return ResponseEntity.ok("Lesson added to course");
    }

    //ADMIN ONLY: update a course
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseResponseDTO> updateCourse(@PathVariable Long id, @RequestBody CourseRequestDTO request) {
        CourseResponseDTO updated = courseService.updateCourse(id, request);
        return ResponseEntity.ok(updated);
    }
    //ADMIN ONLY: delete a course
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted successfully.");
    }
    //ADMIN ONLY: update a lesson
    @PutMapping("/{courseId}/lessons/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateLesson(@PathVariable Long courseId, @PathVariable Long lessonId, @Valid @RequestBody LessonRequestDTO request) {
        lessonService.updateLesson(courseId, lessonId, request);
        return ResponseEntity.ok("Lesson updated successfully.");
    }
    //ADMIN ONLY: delete a lesson within a course
    @DeleteMapping("/{courseId}/lessons/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteLesson(@PathVariable Long courseId, @PathVariable Long lessonId) {
        lessonService.deleteLesson(courseId, lessonId);
        return ResponseEntity.ok("Lesson deleted successfully.");
    }



    //PUBLIC Endpoint: Get all courses (Show courses on page)
    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    //PUBLIC: Get one course by ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }


}
