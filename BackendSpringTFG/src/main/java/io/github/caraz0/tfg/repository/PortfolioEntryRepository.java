package io.github.caraz0.tfg.repository;

import io.github.caraz0.tfg.model.PortfolioEntry;
import io.github.caraz0.tfg.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PortfolioEntryRepository extends JpaRepository<PortfolioEntry, Long> {


    @Query("SELECT p FROM PortfolioEntry p WHERE p.user.username = :username")
    List<PortfolioEntry> findPortfolioEntryByUserUsername(String username);

    @Modifying
    @Transactional
    @Query("DELETE FROM PortfolioEntry p WHERE p.id = :id")
    void removePortfolioEntryById(Long id);


}
