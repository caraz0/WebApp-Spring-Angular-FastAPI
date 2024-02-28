package io.github.caraz0.tfg.service;

import io.github.caraz0.tfg.model.User;
import io.github.caraz0.tfg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
        private final UserRepository userRepository;

    public User saveUser(User user) throws Exception {
        User localUser = userRepository.findByUsername(user.getUsername());
        if(localUser != null) {
            System.out.println("User already exists");
            throw new Exception("User already exists");
        } else {
            localUser =userRepository.save(user);
        }
        return localUser;
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
    // public ResponseEntity<User> login(User user) {
    //     return userRepository.login(user);
    // }
    //
    // public ResponseEntity<User> register(User user) {
    //     return userRepository.register(user);
    // }
    //
    // public ResponseEntity<String> logout() {
    //     return userRepository.logout();
    // }
    //
    // public ResponseEntity<User> me() {
    //     return userRepository.me();
    // }
    //
    // public ResponseEntity<List<User>> all() {
    //     return userRepository.all();
    // }
    //
    // public ResponseEntity<String> delete() {
    //     return userRepository.delete();
    // }
    //
    // public ResponseEntity<User> update(User user) {
    //     return userRepository.update(user);
    // }
    //
    // public ResponseEntity<String> changePassword(User user) {
    //     return userRepository.changePassword(user);
    // }
    //
    // public ResponseEntity<String> changeUsername(User user) {
    //     return userRepository.changeUsername(user);
    // }
    //
    // public ResponseEntity<String> changeEmail(User user) {
    //     return userRepository.changeEmail(user);
    // }
    //
    // public ResponseEntity<String> changeRole(User user) {
    //     return userRepository.changeRole(user);
    // }
    //
    // public ResponseEntity<String> changeStatus(User user) {
    //     return userRepository.changeStatus(user);
    // }
    //
    // public ResponseEntity<String> changeAvatar(User user) {
    //     return userRepository.changeAvatar(user);
    // }
    //
    // public ResponseEntity<String> changeBio(User user) {
    //     return userRepository.changeBio(user);
    // }
    //
    // public ResponseEntity<String> changeName(User user) {
    //     return userRepository.changeName(user);
    // }
    //
    // public ResponseEntity<String> changeSurname(User user) {
    //     return userRepository.changeSurname(user);
    // }
    //
    // public ResponseEntity<String> changeBirthdate(User user) {
    //     return userRepository.changeBirthdate(user);
    // }
    //
    // public ResponseEntity<String> changeCountry(User user) {
    //     return userRepository.changeCountry(user);
    // }
    //
    // public ResponseEntity<String> changeCity(User user) {
    //     return userRepository.changeCity(user);
    // }
    //
    // public ResponseEntity<String> changeAddress(User user) {
    //     return userRepository.changeAddress(user);
}
