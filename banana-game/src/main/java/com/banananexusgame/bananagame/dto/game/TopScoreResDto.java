package com.banananexusgame.bananagame.dto.game;

import com.banananexusgame.bananagame.enums.common.Level;
import lombok.*;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TopScoreResDto {
    private Long id;
    private String userName;
    private Level level_eum;
    private double point;
    private Date date;
}
