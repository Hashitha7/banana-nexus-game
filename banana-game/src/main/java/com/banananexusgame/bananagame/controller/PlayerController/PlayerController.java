package com.banananexusgame.bananagame.controller.PlayerController;


import com.banananexusgame.bananagame.config.security.custom.CustomUserAuthenticator;
import com.banananexusgame.bananagame.config.throttling_config.Throttling;
import com.banananexusgame.bananagame.dto.common.CommonResponse;
import com.banananexusgame.bananagame.dto.game.GameDetailsResDto;
import com.banananexusgame.bananagame.dto.player.PlayerReqDto;

import com.banananexusgame.bananagame.service.GameService;
import com.banananexusgame.bananagame.service.PlayerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.banananexusgame.bananagame.constants.AppConstants.DetailConstants.HEADER_AUTH;


@Log4j2
@RestController
@RequestMapping(value = "/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    private final GameService gameService;

    @Throttling(timeFrameInSeconds = 60, calls = 5)
    @PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> playerSignUp(@RequestBody PlayerReqDto reqDto){
        playerService.saveNewPlayer(reqDto);
        return ResponseEntity.ok(new CommonResponse<>(true,"sign up successfully!"));
    }

    @Throttling(timeFrameInSeconds = 60, calls = 10)
    @PatchMapping(value = "/account/verify", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyAccount(@RequestParam("token") String token) {
        log.info("verifyAccount token => reqBody: {}",token);
        playerService.verifyAccountAndEmail(token);
        return ResponseEntity.ok(new CommonResponse<>(true, "Your account has been activated successfully!"));
    }

    @PostMapping(value = "/game/start", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> startGame(@RequestHeader(value = HEADER_AUTH) String token) {

        Long user_id = CustomUserAuthenticator.getUserIdFromToken(token);
        GameDetailsResDto resDto = gameService.startGame(user_id);
        return ResponseEntity.ok(new CommonResponse<>(true, "Game started", resDto));
    }
}