# Wiscoursealert

## Setup

1. Set up environment file `.env` in `backend` directory

```python
PORT = 3000
MONGODB_URI =
REDIS_HOST =
REDIS_PORT = 12224
REDIS_PASS =
```

2. Set up conda environment for streamlit app

```shell
conda create -n wiscoursealert
conda activate wiscoursealert
pip install streamlit watchdog
```

## Run

1. Run back-end

```shell
cd backend
node app.js
```

2. Run front-end

```shell
cd frontend
streamlit run app.py
```
