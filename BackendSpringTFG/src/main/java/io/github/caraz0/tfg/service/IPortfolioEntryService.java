package io.github.caraz0.tfg.service;

import io.github.caraz0.tfg.model.PortfolioEntry;

import java.util.List;

public interface IPortfolioEntryService {
    void savePortfolioEntry(PortfolioEntry portfolioEntry, String username);

    void removePortfolioEntry(Long id);

    void updatePortfolioEntry(PortfolioEntry portfolioEntry);

    List<PortfolioEntry> getPortfolioEntries(String username);
}
