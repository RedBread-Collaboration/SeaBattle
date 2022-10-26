from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from chat.api import chat_router

from db import database
from game.api import game_router

from user.api import user_router

from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.database = database


@app.on_event("startup")
async def startup() -> None:
    database_ = app.state.database
    if not database_.is_connected:
        await database_.connect()

        # Create a table.
        query = """CREATE TABLE users (uuid VARCHAR(255) PRIMARY KEY, username VARCHAR(255) UNIQUE, status BOOLEAN);"""
        await database_.execute(query=query)

        query = "CREATE TABLE games (uuid VARCHAR(255) PRIMARY KEY, username_1 VARCHAR(255) UNIQUE, " + \
            "username_2 VARCHAR(255) UNIQUE, timestamp BIGINT, turn BOOLEAN);"
        await database_.execute(query=query)

        query = "CREATE TABLE chats (uuid VARCHAR(255) PRIMARY KEY, game_uuid VARCHAR(255), " + \
            "username VARCHAR(255), timestamp BIGINT, message VARCHAR(1024));"
        await database_.execute(query=query)


@app.on_event("shutdown")
async def shutdown() -> None:
    database_ = app.state.database
    if database_.is_connected:
        await database_.disconnect()


app.include_router(chat_router)

app.include_router(game_router)

app.include_router(user_router)


class ConnectionManager:

    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, username: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[username] = websocket

    def disconnect(self, websocket: WebSocket):
        for key, connection in self.active_connections.items():
            if connection == websocket:
                del self.active_connections[key]
                break

    async def send_personal_message(self, username: str, message: str):
        await self.active_connections[username].send_text(message)

    async def broadcast(self, message: str):
        print(self.active_connections)
        for _, connection in self.active_connections.items():
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await manager.connect(username, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(data)
            await manager.send_personal_message(data["username"], data["data"])
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        # await manager.broadcast(f"Client #{username} left the chat")
