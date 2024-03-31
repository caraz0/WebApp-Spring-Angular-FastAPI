package io.github.caraz0.tfg.controller;

import io.github.caraz0.tfg.model.PortfolioEntry;
import io.github.caraz0.tfg.service.IPortfolioEntryService;
import io.github.caraz0.tfg.utils.SecurityContextHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portfolio")
@CrossOrigin("*")
public class PortfolioEntryController {

    @Autowired
    private IPortfolioEntryService portfolioEntryService;

    @Autowired
    private SecurityContextHelper securityContextHelper;

    @GetMapping("/getAll")
    public Object getPortfolioEntries() {

        return portfolioEntryService.getPortfolioEntries(securityContextHelper.getUser().getUsername());

    }

    @PostMapping("/addPortfolioEntry")
    public void addPortfolioEntry(@RequestBody PortfolioEntry portfolioEntry) {
        portfolioEntryService.savePortfolioEntry(portfolioEntry, securityContextHelper.getUser().getUsername());
    }

    @DeleteMapping("/deletePortfolioEntry/{id}")
    public void deletePortfolioEntry(@PathVariable("id") Long id) {
        portfolioEntryService.removePortfolioEntry(id);
    }
}
