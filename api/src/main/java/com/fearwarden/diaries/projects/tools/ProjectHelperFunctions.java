package com.fearwarden.diaries.projects.tools;

import com.fearwarden.diaries.users.dto.response.UserDto;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ProjectHelperFunctions {
    public static boolean checkForDuplicates(List<UserDto> members) {
        Set<UserDto> userDtoSet = new HashSet<>(members);
        return userDtoSet.size() < members.size();
    }
}
