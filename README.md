# Ticket2Attraction full-stack SPA

![App Screenshot](/client/public/assets/screenshot.png)

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

### Setup Api server

This project provide mock data for developement phase. You can use it with tools like Json-server (You might have to modified data a little to make it work), But in this project, we use docker to create container of PostreSQL database . You can find docker-compose.yml file in ./server directory. Firstly, create .env file and create Port and DATABASE_URL variables for connecting to database.

```
./.env
PORT= <YOUR_PORT>
DATABASE_URL=<YOUR_DATABASE_URL>
```

We use ORM for convinient's sake. Run these command to start prisma and connect it to .env files in your root.

```
./server
npx prisma generate
```

You can start Api server now!.

```
npm run dev
```
