package com.fearwarden.tasks.tools;

import org.springframework.stereotype.Component;

public class HelperFunctions {

    public static Integer validatePage(Integer page) {
        if (page == null || page < 1) {
            return 1;
        }
        return page;
    }
}
