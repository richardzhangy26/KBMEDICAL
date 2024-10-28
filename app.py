from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot_graph import ChatBotGraph

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化聊天机器人
chatbot = ChatBotGraph()

@app.get("/chat")
async def chat(question: str):
    try:
        answer = chatbot.chat_main(question)
        return {"status": "success", "answer": answer}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
