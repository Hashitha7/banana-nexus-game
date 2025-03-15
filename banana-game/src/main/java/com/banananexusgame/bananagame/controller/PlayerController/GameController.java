package com.banananexusgame.bananagame.controller.PlayerController;

import com.banananexusgame.bananagame.config.security.custom.CustomUserAuthenticator;
import com.banananexusgame.bananagame.dto.common.CommonResponse;
import com.banananexusgame.bananagame.dto.game.*;
import com.banananexusgame.bananagame.dto.game.*;

import com.banananexusgame.bananagame.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.banananexusgame.bananagame.constants.AppConstants.DetailConstants.HEADER_AUTH;




@RestController
@RequestMapping(value = "/game")
@RequiredArgsConstructor
@Log4j2
public class GameController {

    private final GameService gameService;

    @PostMapping(value = "/start")
    public ResponseEntity<?> startGame(@RequestHeader(value = HEADER_AUTH) String token) {

        Long user_id = CustomUserAuthenticator.getUserIdFromToken(token);
        GameDetailsResDto resDto = gameService.startGame(user_id);
        return ResponseEntity.ok(new CommonResponse<>(true, "Game started", resDto));
    }


    @PostMapping(value = "/end")
    public ResponseEntity<?> endGame(@RequestHeader(value = HEADER_AUTH, required = true) String token, @RequestBody GameEndReqDto dto) {

        Long user_id = CustomUserAuthenticator.getUserIdFromToken(token);
        GameEndResDto resDto = gameService.endGame(user_id, dto);
        return ResponseEntity.ok(new CommonResponse<>(true, resDto));
    }


    @PostMapping(value = "/answer/check")
    public ResponseEntity<?> checkGameAnswer(@RequestHeader(value = HEADER_AUTH, required = true) String token, @RequestBody GameAnswerCheckReqDto dto) {

        Long user_id = CustomUserAuthenticator.getUserIdFromToken(token);
        GameAnswerCheckResDto resDto = gameService.checkAnswer(user_id, dto);
        return ResponseEntity.ok(new CommonResponse<>(true, resDto));
    }


    @GetMapping(value = "/top-score")
    public ResponseEntity<?> getTopScore(@RequestHeader(value = HEADER_AUTH, required = true) String token) {

        Long user_id = CustomUserAuthenticator.getUserIdFromToken(token);
        List<TopScoreResDto> topScore = gameService.getTopScore();
        return ResponseEntity.ok(new CommonResponse<>(true, topScore));
    }

}
