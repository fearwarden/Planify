package com.fearwarden.diaries.projects.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // /project is the HTTP url for the endpoint to witch a client needs to connect for the WebSocket handshake
        registry.addEndpoint("/project")
                .setAllowedOriginPatterns("http://localhost:5173", "http://127.0.0.1:5173")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // messages with /app are routed to MessageMapping methods in Controller classes
        registry.setApplicationDestinationPrefixes("/app");
        // built in message broker for subscriptions and broadcasting
        registry.enableSimpleBroker("/topic");
    }
}
