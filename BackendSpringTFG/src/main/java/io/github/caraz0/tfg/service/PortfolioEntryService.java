package io.github.caraz0.tfg.service;

import io.github.caraz0.tfg.model.PortfolioEntry;
import io.github.caraz0.tfg.model.User;
import io.github.caraz0.tfg.repository.PortfolioEntryRepository;
import io.github.caraz0.tfg.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioEntryService implements IPortfolioEntryService{
    private final PortfolioEntryRepository portfolioEntryRepository;
    private final UserRepository userRepository;

    public PortfolioEntryService(PortfolioEntryRepository portfolioEntryRepository, UserRepository userRepository) {
        this.portfolioEntryRepository = portfolioEntryRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void savePortfolioEntry(PortfolioEntry portfolioEntry, String username) {
        User user = userRepository.findByUsername(username);
        portfolioEntry.setUser(user);
        portfolioEntryRepository.save(portfolioEntry);
    }

    @Override
    public void removePortfolioEntry(Long id) {
        portfolioEntryRepository.removePortfolioEntryById(id);
    }

    @Override
    public void updatePortfolioEntry(PortfolioEntry portfolioEntry) {
        portfolioEntryRepository.save(portfolioEntry);
    }

    @Override
    public List<PortfolioEntry> getPortfolioEntries(String username) {
        return portfolioEntryRepository.findPortfolioEntryByUserUsername(username);
    }

}
