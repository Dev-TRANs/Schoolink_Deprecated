from fastapi import FastAPI, responses, staticfiles
import uvicorn
import os, sys
import glob

def get_is_dev() :
    return len(sys.argv) == 2 and sys.argv[1] == 'dev'

is_dev = get_is_dev()

app = FastAPI()

if not is_dev:
    @app.get("/assets/{id}")
    def assets (id: str):
        print(id)
        return responses.FileResponse('./dist/assets/' + id)
    
    @app.get('/{all:path}')
    def all () :
        return responses.FileResponse('./dist/index.html')
def main ():
    print('start')
    uvicorn.run("back:app", host="127.0.0.1", port=5000, reload=is_dev)
