package io.github.caraz0.tfg.repository;

import io.github.caraz0.tfg.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
}
