package io.github.caraz0.tfg.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityContextHelper {

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public UserDetails getUser() {
        Authentication authentication;
        return (authentication = getAuthentication()) == null
                ? null
                : (UserDetails) authentication.getPrincipal();
    }



}
