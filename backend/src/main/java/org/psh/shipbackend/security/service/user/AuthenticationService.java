package org.psh.shipbackend.security.service.user;

import org.psh.shipbackend.domain.User;

public interface AuthenticationService {
    public User singInAndReturnJWT(User signInRequest);
}
