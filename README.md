## Installation

```bash
$ npm install
```

## Docker Compose
```bash
## Start PostgreSQL/MongoDB in Docker
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# HRM mode
$ npm run start:hrm

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## PM2

```bash
# 查看进程
pm2 list

# 查看指定进程日志
pm2 log <pm2.config.js中的name>
```

