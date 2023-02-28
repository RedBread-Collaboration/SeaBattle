# RedBread SeaBattle

## Backend

### Install requirements

```
$ cd backend
$ pip3 install -r requirements.txt
...
```

### Configure .env

Create `.env` file in backend folder and configure it

| Param  | Default value | Description              |
| ------ | :-----------: | ------------------------ |
| `HOST` |    0.0.0.0    | IP address for websocket |
| `PORT` |     3001      | Port for websocket       |

Example of `.env` content you can find in `.env.example`.

### Run backend

```
$ python3 server.py
...
```

## **Frontend**

### Install packages

```
$ cd frontend
$ npm install
...
```

### Configure .env

Create `.env` file in frontend folder and configure it

| Param                     | Default value  | Description                       |
| ------------------------- | :------------: | --------------------------------- |
| `REACT_APP_FIELD_SIZE`    |       10       | Count of row and columns in field |
| `REACT_APP_CELLS_SIZE`    |       30       | Size of field cells in px         |
| `REACT_APP_WEBSOCKET_URL` | 127.0.0.1:3001 | Url to websocket                  |

Example of `.env` content you can find in `.env.example`.

### Run frontend

```
$ npm start
...
```

**Now you can open `localhost:3000` and play!!**

## **Docker**

If you use docker, you need to edit `docker-compose.yml`

```
services:
  backend:
    ...
    ports:
      - <your_port>:3001
    ...
```

Where `<your_port>` is `PORT` which you set in `backend/.env` file.

### Run docker-compose

```
$ docker-compose up
...
```

**Now you can open `localhost:3000` and play!!**
