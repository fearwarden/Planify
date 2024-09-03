package com.fearwarden.diaries.projects.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

public class ProjectStaticConfig implements WebMvcConfigurer {
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostConstruct
    public void postConstruct() {
        if (uploadDir.charAt(uploadDir.length() - 1) != File.separatorChar) {
            uploadDir += File.separator;
        }
    }
}
