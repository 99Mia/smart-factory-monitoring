package org.psh.shipbackend.controller;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.domain.Role;
import org.psh.shipbackend.security.UserPrincipal;
import org.psh.shipbackend.security.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// spring에서 restController 라고 지정 Rest api 컨트롤러 임을 나타낸다.
// 반환값은 자동으로 json 형태로 변환된다.
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserService userService;

    // HTTP PUT 요청을 처리하겠다는 의미이다.
    // url 경로 예시: /api/user/change/ADMIN --> 여기서 ADMIN 부분이 {role}에 대응한다.
    // 즉, 클라이언트가 어떤 권한으로 변경할 지 URL에서 지정한다
    // 리액트가 이 엔드포인트로 바꿀 role을 url에 넣어서 axios.put 요청을 보낸다
    @PutMapping("/change/{role}")
    /*
    @AuthenticationPrincipal

    */
    public ResponseEntity<Object> changeRole(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                             @PathVariable Role role) {
        userService.changeRole(role, userPrincipal.getUsername());
        return ResponseEntity.ok(true);
    }
}
