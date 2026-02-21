from operator import index
import dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates



dotenv.load_dotenv()

app = FastAPI()


app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")
templates = Jinja2Templates(directory="../frontend/templates")


@app.get("/")
async def read_root():
    return FileResponse("../frontend/templates/index.html", media_type="text/html")


@app.get("/chat")
async def read_chat():
    return FileResponse("../frontend/templates/chat.html", media_type="text/html")