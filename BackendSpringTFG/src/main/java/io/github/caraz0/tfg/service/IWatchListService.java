package io.github.caraz0.tfg.service;

import io.github.caraz0.tfg.model.WatchList;

import java.util.List;

public interface IWatchListService {
    void addWatchList(String symbol, String username);

    void removeWatchList(String symbol, String username);

    List<WatchList> getWatchList(String username);
}
