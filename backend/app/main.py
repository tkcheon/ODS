from fastapi import FastAPI
from .routers.hello import router
import uvicorn

app = FastAPI()

# 라우터 등록
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081, reload=True)




@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q:str = None):  
    return {"item_id": item_id, "q": q}

    