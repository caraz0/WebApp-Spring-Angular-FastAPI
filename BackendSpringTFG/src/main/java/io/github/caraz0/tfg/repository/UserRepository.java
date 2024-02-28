package io.github.caraz0.tfg.repository;

import io.github.caraz0.tfg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Modifying()
    @Query("UPDATE User u SET u.password = :password WHERE u.username = :username")
    void changePassword(String username, String password);
}
