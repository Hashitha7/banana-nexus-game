package com.banananexusgame.bananagame.constants;


import com.banananexusgame.bananagame.entity.Player;
import org.springframework.stereotype.Component;

@Component
public class EmailHtmlConstant {

    public static String getPlayerVerificationEmailBody(String url, Player player) {
        return "<p> "+"Hello "+ player.getUserName()+","+"</p> \n" +
                "<br/>"+
                "<p>"+"verification link - "+ url+ "</p>";
    }
}
