package org.psh.shipbackend.security.service.user;

import org.psh.shipbackend.domain.Role;
import org.psh.shipbackend.domain.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    User findUserByUsername(String username);
    void changeRole(Role newRole, String usermame);
    void deleteUser(Long id);
    List<User> findAllUsers();
}
