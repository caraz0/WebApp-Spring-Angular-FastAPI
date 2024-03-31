package io.github.caraz0.tfg.controller;

import io.github.caraz0.tfg.model.User;
import io.github.caraz0.tfg.model.WatchList;
import io.github.caraz0.tfg.repository.UserRepository;
import io.github.caraz0.tfg.service.IUserService;
import io.github.caraz0.tfg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("/save")
    public User saveUser(@RequestBody User user) throws Exception{

        return userService.saveUser(user);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) throws Exception{
        return userService.getUser(username);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) throws Exception{
        userService.deleteUser(userId);
    }



}
