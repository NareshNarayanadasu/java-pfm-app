package com.example.Personal_Finance_Management.service;

import com.example.Personal_Finance_Management.ExpenceRepository.UserRepo;
import com.example.Personal_Finance_Management.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class USerServices {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtService jwtService;
   @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(10);
    public User register(User user){

        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String verify(User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(user.getUsername());
            }
        }catch (BadCredentialsException e){
            return "Invalid username or password";
        }catch (Exception e){
            return "Authentication failed due to error: "+e.getMessage();

        }
        return "Authentication failed";
    }
}
