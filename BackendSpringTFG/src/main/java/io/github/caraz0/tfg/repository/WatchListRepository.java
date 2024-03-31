package io.github.caraz0.tfg.repository;

import io.github.caraz0.tfg.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
     void removeWatchListById(Long id);

     @Modifying
     @Transactional
     @Query("DELETE FROM WatchList w WHERE w.user.username = :username AND w.symbol = :symbol")
     void removeWatchListByUserAndSymbol(String username, String symbol);

     @Query("SELECT w FROM WatchList w WHERE w.user.username = :username")
     List<WatchList> findWatchListByUserUsername(String username);

}
