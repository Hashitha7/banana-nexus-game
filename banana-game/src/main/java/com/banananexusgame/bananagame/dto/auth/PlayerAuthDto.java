package com.banananexusgame.bananagame.dto.auth;

import com.banananexusgame.bananagame.dto.player.PlayerResDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;



@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
public class PlayerAuthDto extends PlayerResDto implements CommonUserAuth {
}
