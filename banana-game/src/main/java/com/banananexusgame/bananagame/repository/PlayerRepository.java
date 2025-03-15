package com.banananexusgame.bananagame.repository;


import com.banananexusgame.bananagame.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;


@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findFirstByUserName(String userName);

    Optional<Player> findFirstByEmail(String email);

    Optional<Player> findFirstByIdAndEmail(Long id,String email);
}
