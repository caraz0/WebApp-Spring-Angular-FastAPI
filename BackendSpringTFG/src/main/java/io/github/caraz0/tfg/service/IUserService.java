package io.github.caraz0.tfg.service;

import io.github.caraz0.tfg.model.User;

import java.util.Optional;

public interface IUserService {

    User saveUser(User user) throws Exception;

    User getUser(String username);

    void deleteUser(long id);

    Optional<User> getUserByID(long id);
}
