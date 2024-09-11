package com.fearwarden.diaries.tasks.tools;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class HelperFunctions {

    public static Integer validatePage(Integer page) {
        if (page == null || page < 1) {
            return 1;
        }
        return page;
    }

    public static LocalDateTime convertStringToLocalDateTime(String date) {
        try {
            // example: 2023-12-18T22:10:23.738 without Z part
            return LocalDateTime.parse(date, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } catch (DateTimeParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static String convertDateToString(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d. yyyy, HH:mm");
        return formatter.format(date);
    }
}
