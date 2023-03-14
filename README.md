# TASKS app

A Tasks / To-Do app using Vue and Tailwind CSS. Most of the component styles are taken from [Flowbite](https://flowbite.com/).

The backend of the app is in a [separate repository](https://github.com/mbrignone/fastapi_auth), included as a submodule here, and it uses FastAPI and PostgreSQL.

## Features

- Sign in / up using Google or with email and password.
- Create, edit and remove tasks with a title and a description.
- Mark tasks as done.
- Responsive design.

## Project Setup

1. Clone the repository, including the submodule (`--recursive`), which contains the backend.

```sh
$ git clone --recursive git@github.com:mbrignone/tasks_app.git
```

2. Create Google OAuth client ID credentials (see [here](https://developers.google.com/workspace/guides/create-credentials)) and add both `http://localhost` and `http://localhost:5173` as Authorized JavaScript origins.

3. Create a `src/environment/.env` file with the following values:

```
VITE_BACKEND_API_BASE_URL=http://127.0.0.1:80
VITE_GOOGLE_LOGIN_CLIENT_ID=<your_client_id>
```

NOTE: You can skip step #2 and then don't set the Google client ID in step #3. The app will still work but you will get an error if you try to authenticate using Google.

## Run the App

```sh
$ docker compose up -d [--build]
```

The `--build` option forces a rebuild of the images before starting the containers.

The app should now be running on http://localhost:5173/.
You can see the frontend and the backend logs using the `docker logs` command (with the `--follow` optionally).

```sh
$ docker logs vue_app
$ docker logs fastapi_app
```
