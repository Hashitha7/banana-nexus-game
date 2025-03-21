package com.banananexusgame.bananagame.controller.AppController;

import com.banananexusgame.bananagame.dto.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping(value = "/application")
@RequiredArgsConstructor
@Log4j2
public class AppController {
    @Value("${appVersion}")
    private String appVersion;

    @GetMapping(value = "/version")
    public ResponseEntity<?> getAppVersion() {
        return ResponseEntity.ok(new CommonResponse<>(true, appVersion));
    }


}
