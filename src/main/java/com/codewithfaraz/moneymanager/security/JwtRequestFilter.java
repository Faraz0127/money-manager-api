package com.codewithfaraz.moneymanager.security;

import com.codewithfaraz.moneymanager.service.AppUserDetailsService;
import com.codewithfaraz.moneymanager.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return path.startsWith("/api/v1.0/login")
                || path.startsWith("/api/v1.0/register")
                || path.startsWith("/api/v1.0/activate")
                || path.startsWith("/api/v1.0/health")
                || path.startsWith("/error");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        String email = null;
        String jwt = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
                email = jwtUtil.extractUsername(jwt);

                // 🔥 ADD THESE LOGS
                System.out.println("JWT: " + jwt);
                System.out.println("Extracted Email: " + email);

            } catch (Exception e) {
                System.out.println("JWT Token issue: " + e.getMessage());
            }
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

            // 🔥 ADD THIS
            System.out.println("UserDetails loaded: " + userDetails.getUsername());

            if (jwtUtil.validateToken(jwt, userDetails)) {

                System.out.println("JWT VALID ✅"); // 🔥 ADD

                UsernamePasswordAuthenticationToken token =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);

            } else {
                System.out.println("JWT INVALID ❌"); // 🔥 ADD
            }
        }
        filterChain.doFilter(request, response);
    }
}
