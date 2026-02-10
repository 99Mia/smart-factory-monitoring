package org.psh.shipbackend.security.jwt;

import jakarta.servlet.http.HttpServletRequest;
import org.psh.shipbackend.security.UserPrincipal;
import org.springframework.security.core.Authentication;

public interface JwtProvider {
    //토큰 생성
    String generateToken(UserPrincipal userPrincipal);
    //인증정보 얻기
    Authentication getAuthentication(HttpServletRequest request);
    // 토큰 유효성 검증
    boolean isTokenValid(HttpServletRequest request);
}
