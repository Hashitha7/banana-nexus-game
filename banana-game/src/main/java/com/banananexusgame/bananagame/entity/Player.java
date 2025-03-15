package com.banananexusgame.bananagame.entity;


import com.banananexusgame.bananagame.enums.common.AccountVerifyStatus;
import com.banananexusgame.bananagame.enums.common.ActiveStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.banananexusgame.bananagame.enums.common.Level;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable = false)
    private String userName;
    private String password;

    @Column(unique=true, nullable = false)
    private String email;
    @Enumerated(value = EnumType.STRING)
    private AccountVerifyStatus email_verified;
    private double level;

    @Enumerated(value = EnumType.STRING)
    private Level level_eum;
    @JsonFormat(pattern = "dd-MM-yyyy HH:MM:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
    @JsonFormat(pattern = "dd-MM-yyyy HH:MM:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated;
    @Enumerated(value = EnumType.STRING)
    private ActiveStatus status;

    @Lob
    private String current_verify_token;

    @JsonFormat(pattern = "dd-MM-yyyy HH:MM:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date email_verify_link_timestamp;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Score> scores = new ArrayList<>();
}
