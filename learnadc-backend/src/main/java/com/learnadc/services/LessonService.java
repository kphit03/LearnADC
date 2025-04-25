package com.learnadc.services;

import com.learnadc.dto.LessonRequestDTO;
import com.learnadc.dto.LessonResponseDTO;
import com.learnadc.exception.CourseNotFoundException;
import com.learnadc.exception.LessonNotFoundException;
import com.learnadc.model.Course;
import com.learnadc.model.Lesson;
import com.learnadc.repositories.CourseRepository;
import com.learnadc.repositories.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;


    @Autowired
    public LessonService(LessonRepository lessonRepository, CourseRepository courseRepository) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
    }

    public void addLessonToCourse(Long courseId, LessonRequestDTO request) { //add new lesson to course
        Course course = courseRepository.findById(courseId) //fetches the target course
                .orElseThrow(() -> new RuntimeException("Course with ID " + courseId + " not found")); //exception handling

        Lesson lesson = new Lesson( //creates a lesson entity from the DTO (the request)
                request.getTitle(),
                request.getVideoUrl(),
                request.getDescription()
        );

        lesson.setCourse(course);
        lessonRepository.save(lesson);
    }

    public void updateLesson(Long courseId, Long lessonId, LessonRequestDTO request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course with ID " + courseId + " not found"));

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new LessonNotFoundException("Lesson with ID " + lessonId + " not found"));

        // Optional: Check if lesson actually belongs to the course
        if (!lesson.getCourse().getId().equals(course.getId())) {
            throw new LessonNotFoundException("Lesson does not belong to Course ID " + courseId);
        }

        lesson.setTitle(request.getTitle());
        lesson.setVideoUrl(request.getVideoUrl());
        lesson.setDescription(request.getDescription());

        lessonRepository.save(lesson);
    }

    public void deleteLesson(Long courseId, Long lessonId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course with ID " + courseId + " not found"));

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new LessonNotFoundException("Lesson with ID " + lessonId + " not found"));

        if (!lesson.getCourse().getId().equals(course.getId())) {
            throw new LessonNotFoundException("Lesson does not belong to Course ID " + courseId);
        }

        lessonRepository.delete(lesson);
    }

    public List<LessonResponseDTO> getLessonsByCourseId(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course with ID " + courseId + " not found"));

        return course.getLessons().stream().map(lesson -> {
            LessonResponseDTO dto = new LessonResponseDTO();
            dto.setId(lesson.getId());
            dto.setTitle(lesson.getTitle());
            dto.setDescription(lesson.getDescription());
            dto.setVideoUrl(lesson.getVideoUrl());
            return dto;
        }).collect(Collectors.toList());
    }
}
