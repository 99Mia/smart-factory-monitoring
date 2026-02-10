package org.psh.shipbackend.security;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.domain.Role;
import org.psh.shipbackend.security.jwt.JwtAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter() {
        return new JwtAuthorizationFilter();
    }

    @Bean

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                // cors 설정: 다른 도메인에서 요청할 수 있도록 허용(리액트나 다른 도메인에서 데이터 요청 가능한지)
                .cors(httpSecurityCorsConfig->corsConfigurationSource())
                .sessionManagement((session)->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authz->authz
                        .requestMatchers("/api/authentication/**").permitAll()
                        .requestMatchers("/api/alarms/admin/**").hasRole(Role.ADMIN.name())  // 관리자만
                        .requestMatchers(HttpMethod.GET, "/api/alarms/all").authenticated()
                        .requestMatchers(HttpMethod.GET, "/stream/kpi").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/kpi").authenticated() // 로그인한 사용자만
                        .requestMatchers(HttpMethod.GET, "/api/ship/column/*").authenticated() // 로그인한 사용자만
                        .requestMatchers(HttpMethod.GET, "/api/ship/list").authenticated() // 로그인한 사용자만
                        .requestMatchers("/api/ship/admin/**").hasRole(Role.ADMIN.name())  // 관리자만
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    //
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
        }
}
