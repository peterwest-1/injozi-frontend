# Injozi Frontend

## Requirements

We would like for you to build your application to run on a docker container port 3000:3000.

- We should be able to run compose up to build and test the application
- The application needs to builds itself with all needed requirements installed.
- Bonus points to build for Android and iOS as well

## Docker

```bash
docker build -t injozi-frontend:developement .
```

```bash
docker run --publish 3000:3000 injozi-frontend:developement
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
