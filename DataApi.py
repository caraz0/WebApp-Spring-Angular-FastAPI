from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

msft = yf.Ticker("GC=F")

# get all stock info
print(msft.info)

# get historical market data
data = yf.Tickers('msft aapl goog')
# show meta information about the history (requires history() to be called first)
msft.history_metadata

# show actions (dividends, splits, capital gains)
msft.actions
msft.dividends
msft.splits
msft.capital_gains  # only for mutual funds & etfs

# show share count
msft.get_shares_full(start="2022-01-01", end=None)

# show news
print(msft.news)


@app.get("/get_stock_data/")
async def get_stock_data(ticker: str):
    stock = yf.Ticker(ticker)
    data = stock.history(period="5y")

    data = data.reset_index()
    data["Date"] = data["Date"].dt.strftime("%Y-%m-%d")
    result = [{"time": str(date), "value": close} for date, close in zip(data["Date"], data["Close"])]
    return result


@app.get("/get_stock_name/")
async def get_stock_name(ticker: str):
    stock = yf.Ticker(ticker)

    return stock.info["shortName"]


@app.get("/get_stock_lastvalue/")
async def say_hello(ticker: str):
    data = yf.Ticker(ticker)
    historic = data.history(period="1mo")
    last_value = round(historic['Close'].iloc[-1], 2)
    currency = data.info["currency"]

    return {"last_value": last_value, "currency": currency}

