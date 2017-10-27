# React Map Example

NPM v5.4.2  
NODE v8.1.3  
Yarn 1.1.0  
Docker docker-compose (optional)  

## Purpose
This Repository is to demostrate the combination of react and google map

## Getting Started

### Starting main app
Install needed package for the first time
```
yarn install
```

Starting main app Visit at 127.0.0.1:8000
```sh
npm start
```

### Starting mockapi server
You will also need to start the mockapi server
```sh
# on another session
docker-compose up
```
In case you don't have docker
```sh
cd mockapi
npm install
npm start
```

## Start Development

Run linting before push
```sh
npm run lint
```

For runing test case
```sh
npm run test
```

## Reserved ports
| Port | Usage    |
|------|----------|
| 8080 | main app |
| 8000 | mockapi  |

