package com.fearwarden.diaries.projects.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Configuration
public class ProjectAvatarImageConfig {

    @Value("${file.upload-dir}")
    private String uploadDir;
    @Value("${file.name.placeholder-image}")
    private String placeholderImage;

    @Bean
    CommandLineRunner init() {
        return args -> {
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            ClassPathResource resource = new ClassPathResource("/static/images/" + placeholderImage);
            Path destination = uploadPath.resolve(placeholderImage);
            Files.copy(resource.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        };
    }
}
