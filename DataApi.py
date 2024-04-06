from typing import List

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
    allow_methods=["*"],
    allow_headers=["*"],
)


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


ipc_data = [
    {'time': '2021-09-15', 'value': 4},
    {'time': '2021-10-15', 'value': 5.4},
    {'time': '2021-11-15', 'value': 5.5},
    {'time': '2021-12-15', 'value': 6.5},
    {'time': '2022-01-15', 'value': 6.1},
    {'time': '2022-02-15', 'value': 7.6},
    {'time': '2022-03-15', 'value': 9.8},
    {'time': '2022-04-15', 'value': 8.3},
    {'time': '2022-05-15', 'value': 8.7},
    {'time': '2022-06-15', 'value': 10.2},
    {'time': '2022-07-15', 'value': 10.8},
    {'time': '2022-08-15', 'value': 10.5},
    {'time': '2022-09-15', 'value': 8.9},
    {'time': '2022-10-15', 'value': 7.3},
    {'time': '2022-11-15', 'value': 6.8},
    {'time': '2022-12-15', 'value': 5.7},
    {'time': '2023-01-15', 'value': 5.9},
    {'time': '2023-02-15', 'value': 6},
    {'time': '2023-03-15', 'value': 3.3},
    {'time': '2023-04-15', 'value': 4.1},
    {'time': '2023-05-15', 'value': 3.2},
    {'time': '2023-06-15', 'value': 1.9},
    {'time': '2023-07-15', 'value': 2.3},
    {'time': '2023-08-15', 'value': 2.6},
    {'time': '2023-09-15', 'value': 3.5},
    {'time': '2023-10-15', 'value': 3.5},
    {'time': '2023-11-15', 'value': 3.2},
    {'time': '2023-12-15', 'value': 3.1},
    {'time': '2024-01-15', 'value': 3.4},
    {'time': '2024-02-15', 'value': 2.8}
]


@app.get("/get_macro_data/")
async def data(ticker: str):
    if ticker == "IPCESP":
        return ipc_data
    elif ticker == "IPCEEUU":
        return "El string no es igual a 'palabra'"
    else:
        return


@app.get("/get_compared_data/")
async def get_compared_data(ticker: str, price: int, amount: int, purchase_date: str, operationAction:str):
    stock = yf.Ticker(ticker)
    data = stock.history(start=purchase_date)
    if operationAction == "SELL":
        data['Price_Difference'] = (price - data['Close']) * amount
    else:
        data['Price_Difference'] = (data['Close'] - price) * amount
    data = data.reset_index()
    data["Date"] = data["Date"].dt.strftime("%Y-%m-%d")
    result = [{"time": str(date), "value": price_diff} for date, price_diff in
              zip(data["Date"], data["Price_Difference"])]
    print(result)
    return result


@app.get("/get_compared_data_all/")
async def get_compared_data(tickers: List[str], prices: List[int], amounts: List[int], purchase_dates: List[str]):
    total_price_difference = 0

    for ticker, price, amount, purchase_date in zip(tickers, prices, amounts, purchase_dates):
        stock = yf.Ticker(ticker)
        data = stock.history(start=purchase_date)
        data['Price_Difference'] = (data['Close'] - price) * amount
        total_price_difference += sum(data['Price_Difference'])

    return {"total_price_difference": total_price_difference}
