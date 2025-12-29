from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io

router = APIRouter()

@router.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="CSV 파일만 업로드할 수 있습니다.")

    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        # 5x5 CSV 검증 (예시)
        if df.shape[0] != 5 or df.shape[1] != 5:
            raise HTTPException(status_code=400, detail="5x5 크기의 CSV 파일만 허용됩니다.")

        # 여기에서 데이터프레임을 처리하거나 저장할 수 있습니다. 또는
        # 예시: 데이터를 콘솔에 출력
        print("Received 5x5 CSV data:")
        print(df)

        return {"filename": file.filename, "message": "CSV 파일이 성공적으로 업로드 및 처리되었습니다.", "data": df.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"파일 처리 중 오류 발생: {e}")
