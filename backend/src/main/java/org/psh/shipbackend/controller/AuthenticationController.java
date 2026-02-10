package org.psh.shipbackend.controller;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.domain.User;
import org.psh.shipbackend.security.service.user.AuthenticationService;
import org.psh.shipbackend.security.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("sign-up")
    public ResponseEntity<Object> signUp(@RequestBody User user){
        // 이미 service를 통해서 db를 찾아봤을 때 getUsername 이 null이 아니다
        // 즉 같은 이름이 있다 그렇다면 인증 실패를 반환
        if(userService.findUserByUsername(user.getUsername())!=null){
            return new ResponseEntity<>(HttpStatus.CONFLICT); //409 :인증실패
        }
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @PostMapping("sign-in")
    public ResponseEntity<Object> signIn(@RequestBody User user){
        return new ResponseEntity<>(authenticationService.singInAndReturnJWT(user), HttpStatus.OK);
    }
}
