import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
from fredapi import Fred
import world_bank_data as wb
from itertools import combinations
from typing import List
import json


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://localhost:30200"
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


def calcular_correlacion(tickers: List[str]):
    correlations = {}
    for ticker1, ticker2 in combinations(tickers, 2):
        stock1 = yf.Ticker(ticker1)
        stock2 = yf.Ticker(ticker2)

        try:
            data1 = stock1.history(period="5y")
            data2 = stock2.history(period="5y")
        except Exception as e:
            raise HTTPException(status_code=404, detail=f"Error al obtener datos para {ticker1} o {ticker2}: {str(e)}")

        data1 = data1.reset_index()
        data1["Date"] = data1["Date"].dt.strftime("%Y-%m-%d")
        result1 = [{"time": str(date), "value": close} for date, close in zip(data1["Date"], data1["Close"])]

        data2 = data2.reset_index()
        data2["Date"] = data2["Date"].dt.strftime("%Y-%m-%d")
        result2 = [{"time": str(date), "value": close} for date, close in zip(data2["Date"], data2["Close"])]

        df1 = pd.DataFrame(result1)
        df2 = pd.DataFrame(result2)

        merged_df = pd.merge(df1, df2, on='time')

        correlation = merged_df['value_x'].corr(merged_df['value_y'])

        # Convertir las tuplas a cadenas para usarlas como claves
        key = f"{ticker1}-{ticker2}"
        correlations[key] = round(correlation, 3)

    return correlations


@app.post("/get_correlation/")
async def calculate_correlation(request: Request):
    data = await request.json()
    tickers = data.get("tickers")
    if not tickers or not isinstance(tickers, list):
        raise HTTPException(status_code=400, detail="Se esperaba una lista de tickers en el formato JSON.")

    try:
        correlations = calcular_correlacion(tickers)
        return correlations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno al calcular la correlación: {str(e)}")
