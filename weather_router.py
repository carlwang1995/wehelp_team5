from dotenv import load_dotenv
from fastapi import *
import os
import requests
import traceback

load_dotenv()

weather = APIRouter(tags=["weather"])

def get_raw_data() -> dict:
    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001"
    CWB_KEY = os.getenv("CWB_API_KEY")
    response = requests.get(url, params={"Authorization":CWB_KEY})
    if response.status_code != 200:
        return
    else:
        data = response.json()
        return data

def process_data(raw_data: dict) -> list:
    try:
        record: list = raw_data["records"]["location"]
        data = []
        for location in record:
            location_name = location["locationName"]
            # get forecast data
            forecast_data = [{}, {}, {}]
            wx_element = location["weatherElement"][0]
            mint_element = location["weatherElement"][2]
            maxt_element = location["weatherElement"][4]
            ci_element = location["weatherElement"][3]
            pop_element = location["weatherElement"][1]

            for i in range(3):
                # time period and weather
                start_time = wx_element["time"][i]["startTime"]
                end_time = wx_element["time"][i]["endTime"]
                time_period = {"start": start_time, "end": end_time}
                forecast_data[i]["timePeriod"] = time_period
                wx = wx_element["time"][i]["parameter"]["parameterName"]
                forecast_data[i]["weather"] = wx

                # max and min temperature
                mint = int(mint_element["time"][i]["parameter"]["parameterName"])
                maxt = int(maxt_element["time"][i]["parameter"]["parameterName"])
                temp = {"min": mint, "max":maxt}
                forecast_data[i]["temperature"] = temp

                # comfort index
                ci = ci_element["time"][i]["parameter"]["parameterName"]
                forecast_data[i]["comfortIndex"] = ci

                # pop
                pop = int(pop_element["time"][i]["parameter"]["parameterName"])
                forecast_data[i]["precipitationProbability"] = pop

            single_data = {"location": location_name, "forecast": forecast_data}
            data.append(single_data)

        return data 
    
    except:
        traceback.print_exc()
        return

@weather.get("/api/weather")
async def get_weather(request: Request):
    try:
        raw_data = get_raw_data()
        if not raw_data:
            return {"error": True, "msg": "raw data fetching error"}
        data = process_data(raw_data)
        if not data:
            return {"error": True, "msg": "data validation error"}
        result = {"success": True, "data": data}
        return result
    except Exception as e:
        traceback.print_exc()
        return {"error": True, "msg": e}
