from fastapi import APIRouter, Request, Response
from dotenv import load_dotenv
import os
import requests
import traceback

load_dotenv()

router = APIRouter(
    prefix="/rain",
    tags=["Rain"]
)


def fetch_cwa_rain_data():
    api_link = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001"
    CWB_KEY = os.getenv("CWB_API_KEY")
    res = requests.get(url=api_link,
                       params={"Authorization": CWB_KEY},
                       headers={"accept": "application/json"})

    if res.status_code == 200:
        print("[fetch_cwa_rain_data] Rain data request success!")

        if not bool(res.json()):
            print("[fetch_cwa_rain_data] Rain data response JSON is empty")
            return {"error": True, "message": "取得氣象局資料成功，但氣象局資料response為空"}

        else:
            try:
                json_data = res.json()
                result = {}
                for station in json_data["records"]["Station"]:
                    # 蘭嶼鄉要獨立出來：比對到"蘭嶼鄉"+"台東縣"的話，把CountyName改為"蘭嶼鄉"覆蓋過去(TownName維持"蘭嶼鄉")
                    if station["GeoInfo"]["TownName"] == "蘭嶼鄉" and station["GeoInfo"]["CountyName"] == "臺東縣":
                        station["GeoInfo"]["CountyName"] = "蘭嶼鄉"

                    if station["GeoInfo"]["CountyName"] not in result:
                        result[station["GeoInfo"]["CountyName"]] = {}
                        result[station["GeoInfo"]
                               ["CountyName"]]["stationCount"] = 1
                        result[station["GeoInfo"]["CountyName"]
                               ]["Past24hr"] = station["RainfallElement"]["Past24hr"]["Precipitation"]
                        result[station["GeoInfo"]["CountyName"]]["Past24-48hr"] = station["RainfallElement"]["Past2days"]["Precipitation"] - \
                            station["RainfallElement"]["Past24hr"]["Precipitation"]
                        result[station["GeoInfo"]["CountyName"]]["Past48-72hr"] = station["RainfallElement"]["Past3days"]["Precipitation"] - \
                            station["RainfallElement"]["Past2days"]["Precipitation"]
                    else:
                        result[station["GeoInfo"]["CountyName"]
                               ]["stationCount"] += 1
                        result[station["GeoInfo"]["CountyName"]
                               ]["Past24hr"] += station["RainfallElement"]["Past24hr"]["Precipitation"]
                        result[station["GeoInfo"]["CountyName"]]["Past24-48hr"] += station["RainfallElement"]["Past2days"]["Precipitation"] - \
                            station["RainfallElement"]["Past24hr"]["Precipitation"]
                        result[station["GeoInfo"]["CountyName"]]["Past48-72hr"] += station["RainfallElement"]["Past3days"]["Precipitation"] - \
                            station["RainfallElement"]["Past2days"]["Precipitation"]

                output = {}
                output["success"] = True
                output["data"] = []
                for county in result:
                    county_result = {}
                    county_result["縣市名稱"] = county
                    county_result["降雨"] = {}
                    county_result["降雨"]["過去24小時"] = result[county]["Past24hr"] / \
                        result[county]["stationCount"]
                    county_result["降雨"]["過去24-48小時"] = result[county]["Past24-48hr"] / \
                        result[county]["stationCount"]
                    county_result["降雨"]["過去48-72小時"] = result[county]["Past48-72hr"] / \
                        result[county]["stationCount"]
                    output["data"].append(county_result)

                print("[fetch_cwa_rain_data] Rain data parse success!")
                return output

            except Exception:
                traceback.print_exc()
                return {"error": True, "message": "取得氣象局資料成功，解析資料時發生錯誤，請到後端查詢錯誤資訊"}

    else:
        traceback.print_exc()
        return {"error": True, "message": "取得氣象局資料錯誤，請到後端查詢錯誤資訊"}


@router.get("")
async def get_rain_data():
    return fetch_cwa_rain_data()
