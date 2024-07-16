from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

import rain_router
import weather_router

app = FastAPI()

app.mount("/css", StaticFiles(directory="css"), name="static_css")
app.mount("/js", StaticFiles(directory="js"), name="static_js")

@app.get("/")
async def main_page():
    return FileResponse("index.html")

app.include_router(rain_router.router)
app.include_router(weather_router.weather)