package com.example.Personal_Finance_Management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
//    private long phoneNo;
//    private String email;
//    private String adharno;
//    private long accountno;
//    private long panCard;


}
