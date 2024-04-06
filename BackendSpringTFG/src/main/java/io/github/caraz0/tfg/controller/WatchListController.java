package io.github.caraz0.tfg.controller;

import io.github.caraz0.tfg.model.WatchListRequest;
import io.github.caraz0.tfg.service.IWatchListService;
import io.github.caraz0.tfg.utils.SecurityContextHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
@CrossOrigin("*")
public class WatchListController {

    @Autowired
    private IWatchListService watchListService;
    @Autowired
    private SecurityContextHelper securityContextHelper;

    @PostMapping("/add")
    public void saveWatchList(@RequestBody WatchListRequest watchListRequest) throws Exception {

        watchListService.addWatchList(watchListRequest.getSymbol(), securityContextHelper.getUser().getUsername());

    }

    @DeleteMapping("/delete")
    public void removeWatchList(@RequestBody WatchListRequest watchListRequest) throws Exception {

        watchListService.removeWatchList(watchListRequest.getSymbol(), securityContextHelper.getUser().getUsername());

    }

    @GetMapping("/getAll")
    public Object getWatchList() {

        return watchListService.getWatchList(securityContextHelper.getUser().getUsername());

    }
}
