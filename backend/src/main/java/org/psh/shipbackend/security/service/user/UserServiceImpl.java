package org.psh.shipbackend.security.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.psh.shipbackend.domain.Role;
import org.psh.shipbackend.domain.User;
import org.psh.shipbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional  // 메서드가 실행될 때 db 트랜잭션을 자동으로 관리한다.
@Log4j2
// final로 선언된 필드를 자동으로 생성자 주입해준다.
// 스프링이 자동으로 필요한 Bean을 연결(@Autowired)해준다
// 여기서 Bean은 UserRepository, BCryptPasswordEncoder 자체를 의미한다.
// UserRepository 안에 Bean을 선언하지 않았지만 스프링이 UserRepository를 Bean으로 관리할 수 있는 이유는
// Spring Data JPA 덕분이다.
/*
설명하면, UserRepository는 인터페이스이다. 실제 구현체는 우리가 만들지 않았다
스프링 부트와 Spring Data JPA가 실행될 때, 자동으로 이 인터페이스를 구현한 프록시 객체(가짜 객체)를
만들어서 UserRepository의 프록시를 스프링 컨테이너에 등록한다. 이렇게 등록된 객체가 바로 UserRepository Bean이다.
즉, UserRepository가 만들어지면
Spring Data JPA 가 UserRepository 프록시 객체를 만들어서 Bean으로 등록한다 -> 이 프록시가 실제 DB 접근 로직을
대신 처리한다.
그니까 진짜 UserRepository는 고객인거고 프록시 객체는 은행원인거다. 사실 그 고객 은행업무는 프록시 객체가 하니까
 */
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // 메서드 이름은 saveUser이고 반환값은 User타입이고 매개변수는 User user 이다.
    // 매개변수는 사용자로부터 입력받는 정보가 들어간다.
    @Override // --> UserService 인터페이스에서 정의한 메서드를 구현했다는 뜻이다.
    // 즉, @Override는 부모 클래스나 인터페이스에서 정의한 메서드를 재정의(구현)한 것이다.
    // 여기서 implements로 UserService를 구현했기 때문에 부모가 UserService인 것이다.
    // 그래서 Override로 부모에 있는 메서드를 자식 클래스가 다시 정의할 때 붙이는게 Override이다.

    // 여기서 saveUser 메서드는 회원정보(User 객체)를 받아서 --> 그래서 매개변수가 User user이다.
    // 여기서 매개변수는 컨트롤러가 전달해주는 User 객체(사용자가 브라우저에서 입력한 user 객체를 받아온 것)
    // 매개변수로 User user 객체를 받아서 데이터베이스에 저장하는 메서드이다.
    // 반환값은 User 즉 엔티티 User 이다.
    public User saveUser(User user) {
        // 브라우저에서(회원가입폼) user가 입력한 password를 말하는게 아래의 user.setPassword다
        // 당연히 db에 저장된 값 아님
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        //user.setCreateTime(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    @Override
    public void changeRole(Role newRole, String username) {
        userRepository.updateUserRoles(username, newRole);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
