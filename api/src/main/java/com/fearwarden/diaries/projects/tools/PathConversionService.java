package com.fearwarden.diaries.projects.tools;

import org.springframework.stereotype.Service;

@Service
public class PathConversionService {
    public String convertToRelativeUrl(String absolutePath, String uploadDir) {
        if (absolutePath != null && absolutePath.startsWith(uploadDir)) {
            return "/images/" + absolutePath.substring(uploadDir.length());
        }
        return absolutePath;
    }
}
