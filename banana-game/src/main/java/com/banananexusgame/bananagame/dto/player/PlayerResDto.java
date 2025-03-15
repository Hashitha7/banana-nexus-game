package com.banananexusgame.bananagame.dto.player;

import com.banananexusgame.bananagame.enums.common.AccountVerifyStatus;
import com.banananexusgame.bananagame.enums.common.ActiveStatus;
import com.banananexusgame.bananagame.enums.common.Level;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class PlayerResDto {
    private String id;
    private String userName;
    private String password;
    private String email;
    private AccountVerifyStatus email_verified;
    private double level;
    private Level level_eum;
    private Date created;
    private Date updated;
    private ActiveStatus status;
}
