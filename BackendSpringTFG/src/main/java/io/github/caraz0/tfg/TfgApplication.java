package io.github.caraz0.tfg;

import io.github.caraz0.tfg.model.User;
import io.github.caraz0.tfg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TfgApplication /*implements CommandLineRunner */{

    @Autowired
    private UserService userService;
    public static void main(String[] args) {
        SpringApplication.run(TfgApplication.class, args);
    }

   /* @Override
    public void run(String... args) throws Exception {
        User user = new User();

        user.setUsername("admin");
        user.setPassword("admin");
        user.setEmail("admin@gmail.com");

         User savedUser = userService.saveUser(user);
        System.out.println("User saved: " + savedUser.getUsername());
    }*/
}
