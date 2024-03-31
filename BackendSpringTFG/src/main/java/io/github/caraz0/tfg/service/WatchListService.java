package io.github.caraz0.tfg.service;

import io.github.caraz0.tfg.model.User;
import io.github.caraz0.tfg.model.WatchList;
import io.github.caraz0.tfg.repository.UserRepository;
import io.github.caraz0.tfg.repository.WatchListRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class WatchListService implements IWatchListService {
    private final WatchListRepository watchListRepository;
    private final UserRepository userRepository;

    public WatchListService(WatchListRepository watchListRepository, UserRepository userRepository) {
        this.watchListRepository = watchListRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addWatchList(String symbol, String username) {
        User user = userRepository.findByUsername(username);
        WatchList watchList = new WatchList(0L, symbol, user);
        watchListRepository.save(watchList);
    }

    @Override
    public void removeWatchList(String symbol, String username) {

        watchListRepository.removeWatchListByUserAndSymbol(username, symbol);
    }
    @Override
    public List<WatchList> getWatchList(String username) {
        return watchListRepository.findWatchListByUserUsername(username);
    }
}
