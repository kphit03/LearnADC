package com.learnadc.dto;

public class LessonResponseDTO {
    private Long id;
    private String title;
    private String videoUrl;
    private String description;

    public LessonResponseDTO() {}
    public LessonResponseDTO(Long id, String title, String videoUrl, String description) {
        this.id = id;
        this.title = title;
        this.videoUrl = videoUrl;
        this.description = description;
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

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
