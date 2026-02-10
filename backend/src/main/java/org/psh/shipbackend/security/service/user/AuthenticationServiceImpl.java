package org.psh.shipbackend.security.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.psh.shipbackend.domain.User;
import org.psh.shipbackend.security.UserPrincipal;
import org.psh.shipbackend.security.jwt.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    /*
  이거 두개를 선언하는 이유는 AuthenticationManager 는 Spring Security에서
  사용자 인증(Authentication)을 담당하는 핵심 객체이기 때문이다.
  역할은  아이디와 비밀번호가 맞는지 검증한다. 성공하면 Authentication 객체를 반환한다.
  final로 선언한 이유는 한번 주입되면 바뀌지 않도록이다. 보통 생성자 주입으로 주입받는다
  그니까 이름을 authenticationManager 라고 정해줌, 메서드안에서 쓸수있는 이름을 이런식으로 정해주는게
  생성자 주입으로 주입받는다(authenticationManager 객체를) 이런 말이다
   */
    private final AuthenticationManager authenticationManager;

    // 이거의 역할은 JWT(Json Web Token)생성과 검증을 담당하는 클래스이다.
    // JWT 생성: 로그인 성공 시, 서버에서 클라이언트에게 인증용 토큰을 발급한다.
    // JWT 검증: 클라이언트가 API 호출 시, 토큰이 유효한지 확인한다.
    // 토큰 안의 정보 추출: 사용자 아이디, 권한(Role) 등
    private final JwtProvider jwtProvider;

    @Override
    public User singInAndReturnJWT(User signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(),
                        signInRequest.getPassword())
        );
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = jwtProvider.generateToken(userPrincipal);
        User sinInUser=userPrincipal.getUser();
        sinInUser.setToken(jwt);
        return sinInUser;
    }
}
