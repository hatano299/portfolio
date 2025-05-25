package com.hatano.portfolio.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    private static final String SECRET_TOKEN = "hatacho-KEY";

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws IOException {

        String method = request.getMethod();
        if (method.equals("GET")) {
            return true;
        }

        String authHeader = request.getHeader("Authorization");
        // nullチェック（NullPointerExceptionを回避）
        //【IDIOM】: ("Bearer " + SECRET_TOKEN).equals(authHeader)でも可
        if (authHeader != null && authHeader.equals(SECRET_TOKEN)) {
            return true;
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Unauthorized");
        return false;
    }
}
