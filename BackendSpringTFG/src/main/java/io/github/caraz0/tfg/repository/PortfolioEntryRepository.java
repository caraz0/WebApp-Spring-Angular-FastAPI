package io.github.caraz0.tfg.repository;

import io.github.caraz0.tfg.model.PortfolioEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioEntryRepository extends JpaRepository<PortfolioEntry, Long> {
}
