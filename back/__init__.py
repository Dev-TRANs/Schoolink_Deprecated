from fastapi import FastAPI
import uvicorn
import os, sys

def get_is_dev() :
    return len(sys.argv) == 2 and sys.argv[1] == 'dev'

is_dev = get_is_dev()

app = FastAPI()

if not is_dev:
    @app.get("/{full_path:path}")
    async def hello():
        return {"message" : "Hello,Worlda"}


def main ():
    print('start')
    uvicorn.run("back:app", host="127.0.0.1", port=5000, reload=is_dev)
