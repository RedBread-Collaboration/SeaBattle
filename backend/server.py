import asyncio
import random
from os import getenv
from uuid import UUID

from dotenv import load_dotenv
from websockets import serve
from websockets.exceptions import ConnectionClosedError
from websockets.server import WebSocketServerProtocol

load_dotenv()

PORT = getenv('PORT')
HOST = getenv('HOST')
print("Listen Port: " + str(PORT))

game = {}


def getPlayer1(wsId):
    for playerId in game:
        if (playerId == wsId) and (type(playerId) == UUID):
            return game[playerId]


def getPlayer2(wsId):
    for playerId in game:
        if (playerId != wsId) and (type(playerId) == UUID):
            return game[playerId]


def isFieldsFull():
    for playerId in game:
        if len(game[playerId]['field']) == 0:
            return False
    return True


async def sendAll(msg):
    for playerId in game:
        if type(playerId) == UUID:
            ws = game[playerId]['ws']
            await ws.send(msg)
    print(msg)


async def echo(websocket: WebSocketServerProtocol):
    global game
    try:
        async for msg in websocket:
            data = msg.split(' ')

            # * LOGIN IN GAME
            if len(game) < 2 or not isFieldsFull():
                # * ENTER NICK
                if data[0] == "Nick":
                    if len(game) == 2:
                        await websocket.send("Game is already running:400")
                        print("Game is full")
                    print("Connected")
                    print(msg)
                    game.update({
                        websocket.id: {
                            'ws': websocket,
                            'nickname': data[1],
                            'field': []
                        }
                    })
                    player1 = getPlayer1(websocket.id)
                    player2 = getPlayer2(websocket.id)
                    if player1:
                        await player1['ws'].send(f"{player1['nickname']}:201")
                        if player2:
                            await player1['ws'].send(f"{player2['nickname']}:202")
                            await player2['ws'].send(f"{player2['nickname']}:201")
                            await player2['ws'].send(f"{player1['nickname']}:202")

                # * ENTER FIELD
                elif data[0] == "Field":
                    print(msg)
                    field = data[1].split(',')
                    game[websocket.id]['field'] = field
                    # print(field)

                    if len(game) == 2 and isFieldsFull():
                        startingPlayer = game[random.choice(list(game.keys()))]
                        await sendAll("Game started:200")
                        await sendAll(f"Turn {startingPlayer['nickname']}")

            # * GAME STARTED
            elif len(game) == 2:
                # * COMMAND ATTACK
                if data[0] == "Attack":
                    print(msg)
                    cellId = data[1]
                    player1 = getPlayer1(websocket.id)
                    player2 = getPlayer2(websocket.id)
                    # * IF BUMPED
                    if (cellId in player2['field']):
                        print(f"{player1['nickname']} bumped {player2['nickname']} at {cellId}")
                        await player1['ws'].send(f"Bump {cellId}")
                        await player2['ws'].send(msg)
                        await sendAll(f"Turn {player1['nickname']}")
                        player2['field'].remove(cellId)
                        if len(player2['field']) == 0:
                            await sendAll(f"Win {player1['nickname']}")
                            game = {}
                    else:
                        print(f"{player1['nickname']} not bumped {player2['nickname']} at {cellId}")
                        await player1['ws'].send(f"Dont {cellId}")
                        await player2['ws'].send(f"Not {cellId}")
                        await sendAll(f"Turn {player2['nickname']}")

                # # * ERRORS
                # else:
                #     await websocket.send("Game is already running:400")
                #     print("Game is full")

    except ConnectionClosedError:
        print("Connection closed")


async def test(websocket: WebSocketServerProtocol):
    try:
        async for msg in websocket:
            print(msg)
            await websocket.send(msg)

    except ConnectionClosedError:
        print("Connection closed")


async def main():
    async with serve(echo, HOST, PORT):
        await asyncio.Future()
    # async with serve(test, HOST, PORT):
    #     await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
    # asyncio.get_event_loop().run_until_complete(serve(echo, HOST, PORT))
    # asyncio.get_event_loop().run_forever()
