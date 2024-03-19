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

msft = yf.Ticker("^GSPC")

# get all stock info
print(msft.info)

# get historical market data
print(msft.history(period="1mo"))
data = yf.Tickers('msft aapl goog')
print(data.history(period="1mo"))
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
    data = stock.history(period="4mo")

    data = data.reset_index()  # Reiniciar el índice para obtener las fechas como una columna
    data["Date"] = data["Date"].dt.strftime("%Y-%m-%d")  # Formatear la fecha como "yyyy-mm-dd"
    result = [{"time": str(date), "value": close} for date, close in zip(data["Date"], data["Close"])]
    return result

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{ticker}")
async def say_hello(ticker: str):
    return {"message": f"Hello {ticker}"}
