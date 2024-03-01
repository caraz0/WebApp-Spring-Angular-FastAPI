package io.github.caraz0.tfg.controller;

import io.github.caraz0.tfg.model.User;
import io.github.caraz0.tfg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
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
