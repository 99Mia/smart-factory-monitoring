package org.psh.shipbackend.repository;

import org.psh.shipbackend.domain.Role;
import org.psh.shipbackend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    // 수정되는 부분은 Modifying 꼭 필요
    @Modifying
    @Query("update User set role=:role where username=:username")
    void updateUserRoles(@Param("username") String username, @Param("role") Role role);
}
