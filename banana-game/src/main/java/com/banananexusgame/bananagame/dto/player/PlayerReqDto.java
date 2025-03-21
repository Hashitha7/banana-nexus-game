package com.banananexusgame.bananagame.dto.player;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PlayerReqDto {
    private String userName;
    private String password;
    private String email;
}
