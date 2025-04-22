package com.learnadc.dto;

import java.util.List;

public class CourseResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private List<LessonResponseDTO> lessons;

    public CourseResponseDTO() {}
    public CourseResponseDTO(Long id, String title, String description, String category, List<LessonResponseDTO> lessons) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.lessons = lessons;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<LessonResponseDTO> getLessons() {
        return lessons;
    }

    public void setLessons(List<LessonResponseDTO> lessons) {
        this.lessons = lessons;
    }
}
