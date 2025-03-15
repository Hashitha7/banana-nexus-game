package com.banananexusgame.bananagame.service;

import com.banananexusgame.bananagame.dto.game.*;
import com.banananexusgame.bananagame.dto.game.*;

import java.util.List;


public interface GameService {
    GameDetailsResDto startGame(Long player_id);
    GameEndResDto endGame(Long player_id, GameEndReqDto gameEndType);
    GameAnswerCheckResDto checkAnswer(Long player_id, GameAnswerCheckReqDto gameAnswerCheckReqDto);
    List<TopScoreResDto> getTopScore();
}
