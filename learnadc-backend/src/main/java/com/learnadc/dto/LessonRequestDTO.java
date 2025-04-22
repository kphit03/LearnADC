package com.learnadc.dto;

public class LessonRequestDTO {
    private String title;
    private String videoUrl;
    private String description;

    public LessonRequestDTO() {}
    public LessonRequestDTO(String title, String videoUrl, String description) {
        this.title = title;
        this.videoUrl = videoUrl;
        this.description = description;
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
