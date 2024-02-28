package io.github.caraz0.tfg.controller;

import io.github.caraz0.tfg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4000")
public class LoginController {
    private final UserService userService;

    // @PostMapping("/login")
    // public ResponseEntity<User> login(@RequestBody User user) {
    //     return userService.login(user);
    // }
    //
    // @PostMapping("/register")
    // public ResponseEntity<User> register(@RequestBody User user) {
    //     return userService.register(user);
    // }
    //
    // @GetMapping("/logout")
    // public ResponseEntity<String> logout() {
    //     return userService.logout();
    // }
    //
    // @GetMapping("/me")
    // public ResponseEntity<User> me() {
    //     return userService.me();
    // }
    //
    // @GetMapping("/all")
    // public ResponseEntity<List<User>> all() {
    //     return userService.all();
    // }
    //
    // @GetMapping("/delete")
    // public ResponseEntity<String> delete() {
    //     return userService.delete();
    // }
    //
    // @GetMapping("/update")
    // public ResponseEntity<User> update(@RequestBody User user) {
    //     return userService.update(user);
    // }
    //
    // @GetMapping("/changePassword")
    // public ResponseEntity<String> changePassword(@RequestBody User user) {
    //     return userService.changePassword(user);
    // }
    //
    // @GetMapping("/changeUsername")
    // public ResponseEntity<String> changeUsername(@RequestBody User user) {
    //     return userService.changeUsername(user);
    // }
    //
    // @GetMapping("/changeEmail")
    // public ResponseEntity<String> changeEmail(@RequestBody User user) {
    //     return userService.changeEmail(user);
    // }
    //
    // @GetMapping("/changeRole")
    // public ResponseEntity<String> changeRole(@RequestBody User user) {
    //     return userService.changeRole(user);
    // }
    //
    // @GetMapping("/changeStatus")
    // public ResponseEntity<String> changeStatus(@RequestBody User user) {
    //     return userService.changeStatus(user);
    // }
    //
    // @GetMapping("/changeAvatar")
    // public ResponseEntity<String> changeAvatar(@RequestBody User user) {
    //     return userService.changeAvatar(user);
    // }
    //
    // @GetMapping("/changeBio")
    // public ResponseEntity<String> changeBio(@RequestBody User user) {
    //     return userService.changeBio(user);
    // }
    //
    // @GetMapping("/changeName")
    // public ResponseEntity<String> change
}
