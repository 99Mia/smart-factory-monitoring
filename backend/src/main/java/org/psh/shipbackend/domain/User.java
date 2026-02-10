package org.psh.shipbackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 200)
    private String password;

    @Column(nullable = false)
    private String name;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Transient
    // 사용자를 식별하는 문자열 토큰, 서버-클라이언트 간 인증에 사용
    private  String token;
}
