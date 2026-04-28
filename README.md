# One Million Checkboxes

A real-time collaborative checkbox application built with Node.js, Express, Socket.io, and Redis. Multiple users can interact with a shared set of checkboxes and see changes update in real-time across all connected clients.

##  Project Overview

This project demonstrates a real-time state management system where:
- Users can toggle checkboxes in a web interface
- All checkbox states are persisted in Redis
- Changes are broadcast to all connected clients in real-time using Socket.io
- The application supports 200 checkboxes with persistent state

##   Architecture

### High-Level Flow

```
Client (Browser)
    ↓
    → Fetch initial checkbox states from /checkboxes
    → Listen to Socket.io "server:checkbox-change" events
    → Emit "client:checkbox-change" when user toggles a checkbox
    ↓
Server (Node.js/Express)
    ↓
    → REST API to serve current checkbox states
    → Socket.io connection to handle real-time events
    → Redis for persistent state storage
    → Redis Pub/Sub for broadcasting changes across clients
    ↓
Redis
    ↓
    → Stores checkbox states as JSON array
    → Pub/Sub channel for broadcasting checkbox changes
```

##  Tech Stack

- **Backend**: Node.js with Express
- **Real-time Communication**: Socket.io
- **State Persistence**: Redis (ioredis client)
- **Frontend**: Vanilla JavaScript with CSS3
- **Package Manager**: Bun

##  Prerequisites

Before running the project, ensure you have:

- **Node.js** (v16+) or **Bun**
- **Redis** running on `localhost:6379`
- **npm** or **bun** for package management

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/divakardsp/One-Million-Checkboxes.git
   cd One-Million-Checkboxes
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Ensure Redis is running**
   ```bash
   redis-server
   ```

##  Running the Project

1. **Start the server**
   ```bash
   PORT=3000 node --watch src/index.js
   ```
   - The `--watch` flag enables hot-reload for development
   - Server will run on `http://localhost:3000`

2. **Open in browser**
   ```
   http://localhost:3000
   ```

3. **Open multiple tabs to see real-time updates**
   - Toggle a checkbox in one tab
   - See it update in all other tabs instantly

##  Project Structure

```
One-Million-Checkboxes/
├── public/
│   └── index.html              # Frontend UI with styles and Socket.io client
├── src/
│   ├── index.js                # Main server entry point
│   ├── onConnection.js         # Socket.io connection handler
│   ├── onCheckboxChange.js     # Handles checkbox state updates
│   └── redisConnection.js      # Redis client configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```


### Server Port
Pass `PORT` environment variable:
```bash
PORT=3000 node src/index.js
```

