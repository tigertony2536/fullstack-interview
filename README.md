# Ticket2Attraction full-stack SPA
    
## Description
    
Full-stack Ticketing systems SPA using React-TypeScript for front-end and express.js for API server
    
## Table of Contents 
    
- [Features](#Features)
- [Installation](#Installation)

    
## Features
- Add tickets from tickets board to cart.
- Increse and decrease amount of tickets board in cart.
- Calculate and display total cost of tickets in cart.
- Display discount if provide correct code.
- Calculate and display grand total cost.
    
## Installation
### Requirements
- NodeJs
- Docker(Optional)
    
To run this project in your localhost. Follow this instruction.
#### Clone repository and install dependencies

```
git clone https://github.com/tigertony2536/fullstack-interview.git
    
./client
npm i
    
./server
npm i
```
    
### Setup Api
There are 2 choices you can choose
    
1. Mock Api
- This projects using mock api in developement phase using json-server library. 
```
./client
json-server --port 8000 --watch ./api_mock/db.json
```
2. Database
This project use Postres SQL
- Create .env file and create Port and DATABASE_URL variables for connecting to database. If you use docker compose file in this project to create database container, you can use copy this
```
./.env
PORT=8000

DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
```
- Connect prisma ORM to .env files in your root and start Api server.
```
./server
npx prisma generate
npm run dev
```

