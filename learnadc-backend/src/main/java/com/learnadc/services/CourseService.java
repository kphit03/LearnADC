package com.learnadc.services;

import com.learnadc.dto.CourseRequestDTO;
import com.learnadc.dto.CourseResponseDTO;
import com.learnadc.dto.LessonResponseDTO;
import com.learnadc.exception.CourseNotFoundException;
import com.learnadc.model.Course;
import com.learnadc.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseResponseDTO createCourse(CourseRequestDTO request) { //create course method, converts the JSON request into a course entity and saves it
        Course course = new Course(request.getTitle(), request.getDescription(), request.getCategory());
        Course saved = courseRepository.save(course);
        return mapToDTO(saved);
    }
    public List<CourseResponseDTO> getAllCourses() { //fetch all courses from db
        return courseRepository.findAll()
                .stream()
                .map(this::mapToDTO) //convert each course into a CourseResponseDTO
                .collect(Collectors.toList());
    }

    public CourseResponseDTO getCourseById(Long id) { //fetch one course by id (will be used for viewing a specific course)
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course with ID " + id + " not found")); //exception handling
        return mapToDTO(course);
    }

    private CourseResponseDTO mapToDTO(Course course) { //converts course entity into a CourseResponseDTO with <
        return new CourseResponseDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getCategory(),
                course.getLessons().stream().map(lesson ->
                        new LessonResponseDTO(
                                lesson.getId(),
                                lesson.getTitle(),
                                lesson.getVideoUrl(),
                                lesson.getDescription()
                        )
                ).collect(Collectors.toList())
        );
    }
    public CourseResponseDTO updateCourse(Long id, CourseRequestDTO request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course with ID " + id + " not found"));
        System.out.println("Updating course with ID " + id);
        System.out.println("New title: " + request.getTitle());
        System.out.println("New desc: " + request.getDescription());
        System.out.println("New category: " + request.getCategory());
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setCategory(request.getCategory());

        Course updated = courseRepository.save(course);
        return mapToDTO(updated);
    }
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course with ID " + id + " not found"));

        courseRepository.delete(course);
    }


}
