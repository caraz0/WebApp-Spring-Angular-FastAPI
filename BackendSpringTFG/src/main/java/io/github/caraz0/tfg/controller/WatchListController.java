package io.github.caraz0.tfg.controller;

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

    @PostMapping("/add/{symbol}")
    public void saveWatchList(@PathVariable("symbol") String symbol) throws Exception {

        watchListService.addWatchList(symbol, securityContextHelper.getUser().getUsername());

    }

    @DeleteMapping("/delete/{symbol}")
    public void removeWatchList(@PathVariable("symbol") String symbol) throws Exception {

        watchListService.removeWatchList(symbol, securityContextHelper.getUser().getUsername());

    }

    @GetMapping("/getAll")
    public Object getWatchList() {

        return watchListService.getWatchList(securityContextHelper.getUser().getUsername());

    }
}
