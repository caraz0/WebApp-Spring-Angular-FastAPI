import numpy as np
import pandas as pd
from fastapi import FastAPI
import eurostat
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
from fredapi import Fred
import world_bank_data as wb

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

fred = Fred(api_key='b4da5c4b67d7310f6de6fcf85266c420')

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
        ipc_data = wb.get_series("FP.CPI.TOTL", id_or_value='id', simplify_index=True, country='ES')
        formatted_data3 = [{'time': f'{year}-09-15', 'value': value} for year, value in ipc_data.items() if
                           not np.isnan(value)]
        return formatted_data3
        return ipc_data
    elif ticker == "CPIGER":
        ipc_data = wb.get_series("FP.CPI.TOTL", id_or_value='id', simplify_index=True, country='DE')
        formatted_data2 = [{'time': f'{year}-09-15', 'value': value} for year, value in ipc_data.items() if
                         not np.isnan(value)]
        return formatted_data2
    elif ticker == "GDPGER":
        gdp_data = wb.get_series("NY.GDP.MKTP.CD", id_or_value='id', simplify_index=True, country='DE')
        formatted_data3 = [{'time': f'{year}-09-15', 'value': value} for year, value in gdp_data.items() if
                         not np.isnan(value)]
        return formatted_data3
    elif ticker == "GDPESP":
        gdp_data = wb.get_series("NY.GDP.MKTP.CD", id_or_value='id', simplify_index=True, country='ES')
        formatted_data3 = [{'time': f'{year}-09-15', 'value': value} for year, value in gdp_data.items() if
                         not np.isnan(value)]
        return formatted_data3
    else:
        data = fred.get_series(ticker)

        formatted_data = [{'time': str(date.date()), 'value': value} for date, value in data.items() if
                          not np.isnan(value)]

        response_data = formatted_data
        return response_data


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
    return result


@app.get("/get_portfolio/")
async def get_compared_data(ticker: str, price: int, amount: int, purchase_date: str, operationAction:str):
    stock = yf.Ticker(ticker)
    data = stock.history(start=purchase_date)
    if operationAction == "SELL":
        data['Price_Difference'] = (-data['Close']) * amount
    else:
        data['Price_Difference'] = (data['Close']) * amount
    data = data.reset_index()
    data["Date"] = data["Date"].dt.strftime("%Y-%m-%d")
    result = [{"time": str(date), "value": price_diff} for date, price_diff in
              zip(data["Date"], data["Price_Difference"])]
    print(result)
    return result


def get_close_price(symbol):

    stock_data = yf.Ticker(symbol)
    latest_data = stock_data.history(period="1d")
    close_price = latest_data['Close'].iloc[-1]
    return close_price


@app.get("/get_price_change/")
async def get_price_change(symbol: str, purchase_price: float):

    latest_close_price = get_close_price(symbol)
    price_difference = latest_close_price - purchase_price
    percentage_change = (price_difference / purchase_price) * 100
    return {
        "difference": price_difference,
        "percentage_change": percentage_change
    }


