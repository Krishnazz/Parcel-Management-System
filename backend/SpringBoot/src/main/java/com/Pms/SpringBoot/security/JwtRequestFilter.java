package com.Pms.SpringBoot.security;

import com.Pms.SpringBoot.entity.User;
import com.Pms.SpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String userId = null;
        String jwt = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            userId = jwtUtil.extractUserId(jwt);
        }

        if (userId != null) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null && jwtUtil.validateToken(jwt, user)) {
                // Set authentication in context
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        user, null,
                        List.of(new SimpleGrantedAuthority(user.getRole()))
                    );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else if (
            !request.getRequestURI().contains("/login") &&
            !request.getRequestURI().contains("/register") &&
            !request.getRequestURI().contains("/h2-console") &&
            !request.getRequestURI().contains("/swagger-ui") &&
            !request.getRequestURI().contains("/v3/api-docs")
        ) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        chain.doFilter(request, response);
    }
}