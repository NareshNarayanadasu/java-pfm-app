package com.example.Personal_Finance_Management.controller;

import com.example.Personal_Finance_Management.entity.User;
import com.example.Personal_Finance_Management.service.USerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/auth")
public class UserController {
    @Autowired
    private USerServices services;
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return services.register(user);
    }
    @PostMapping("/login")
    public String login(@RequestBody User user){
        return services.verify(user);
    }

}
