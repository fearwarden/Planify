package com.fearwarden.diaries.tasks.tools;

public class HelperFunctions {

    public static Integer validatePage(Integer page) {
        if (page == null || page < 1) {
            return 1;
        }
        return page;
    }
}
