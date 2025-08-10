
# Live Chat App – Server Side (MERN Stack)

This is the **backend** of a real-time live chat application built with the **MERN stack** and **Socket.IO**.  
It handles authentication, message storage, and real-time communication between users.  

🔗 **Frontend Repository:** [Live Chat Client Side](https://github.com/fatemesoleymanian/live-chat-cient-side)  
🎥 **Video Tutorial:** [Watch on YouTube](https://www.youtube.com/watch?v=KnsG8bysLQA&list=PLa2Qnr2FBb09XhhxhGCoO37V74LiNJ1eu)

---

## 📌 Features

- **User Authentication** – Sign up, log in, and secure sessions with JWT.
- **Password Hashing** – Secure storage with `bcryptjs`.
- **Real-Time Messaging** – Instant chat powered by `Socket.IO`.
- **MongoDB Integration** – Store user data and messages.
- **Error Handling** – Centralized async error management.
- **Validation** – Request body validation with `yup`.
- **CORS Support** – Seamless connection with the React frontend.

---

## 🛠️ Tech Stack

**Backend**
- [Node.js](https://nodejs.org/) – JavaScript runtime
- [Express.js](https://expressjs.com/) – Web framework
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) – Database & ODM
- [Socket.IO](https://socket.io/) – Real-time WebSocket communication
- [JWT](https://jwt.io/) – JSON Web Token authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) – Password hashing
- [yup](https://github.com/jquense/yup) – Data validation
- [dotenv](https://github.com/motdotla/dotenv) – Environment variable management

**Development Tools**
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- [Nodemon](https://nodemon.io/) – Auto-restart during development
- [rimraf](https://github.com/isaacs/rimraf) – Clean build directory
- [pre-commit](https://www.npmjs.com/package/pre-commit) – Run checks before committing

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/fatemesoleymanian/live-chat-server-side
cd live-chat-server-side
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### 4️⃣ Start the development server

```bash
npm start
```

The server will run on **[http://localhost:5000](http://localhost:5000)**

---

## ⚡ Real-Time Events (Socket.IO)

* `join` – Join a chat room.
* `sendMessage` – Send a message to a room.
* `receiveMessage` – Receive a new message from the server.
* `userTyping` – Broadcast typing status.

---

## 🤝 Contributing

Pull requests are welcome!
If you’d like to improve this backend, feel free to fork the repo and submit changes.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

**Developed by Honeloper**
💬 Building real-time experiences with MERN & Socket.IO.

