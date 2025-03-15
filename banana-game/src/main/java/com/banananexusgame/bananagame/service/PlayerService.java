package com.banananexusgame.bananagame.service;

import com.banananexusgame.bananagame.dto.player.PlayerReqDto;


public interface PlayerService {
    void saveNewPlayer(PlayerReqDto playerReqDto);

    void verifyAccountAndEmail(String token);

}
