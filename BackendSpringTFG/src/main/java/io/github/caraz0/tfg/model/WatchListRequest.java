package io.github.caraz0.tfg.model;

public class WatchListRequest {
    private String symbol;


    public WatchListRequest() {
    }

    public WatchListRequest(String symbol, String username) {
        this.symbol = symbol;

    }

    public String getSymbol() {
        return this.symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

}
