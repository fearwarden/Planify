package com.fearwarden.coremodule;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Arrays;

@SpringBootApplication
@ComponentScan(basePackages = {"com.fearwarden.coremodule", "com.fearwarden.basemodule", "com.fearwarden.tasks"})
@EntityScan(basePackages = {"com.fearwarden.basemodule.*", "com.fearwarden.tasks.*"})
@EnableJpaRepositories(basePackages = {"com.fearwarden.basemodule.*"})
public class CoreModuleApplication {

    public static void main(String[] args) {
       SpringApplication.run(CoreModuleApplication.class, args);
    }

}
