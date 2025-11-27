📈 Vestio - Paper Trading Platform

Master the Stock Market without the risk.

Vestio is a full-stack MERN application that simulates a real-world stock trading environment. It allows users to practice trading strategies with $100,000 in virtual paper money, tracking real-time stock prices and portfolio performance.

🚀 Live Demo

Frontend (App): https://vestio-pi.vercel.app/login

Backend (API): https://vestio-trading.onrender.com

💡 Project Idea

The goal of Vestio is to democratize financial literacy. Many people are afraid to invest because they fear losing money. Vestio solves this by providing a zero-risk sandbox environment.

Users can:

Register for a secure account.

Research real-world stocks using live market data.

Simulate buying and selling stocks with a virtual wallet.

Track their profit/loss over time.

✨ Key Features

🔐 Secure Authentication: Complete Sign Up & Login system using JWT (JSON Web Tokens) and bcrypt for password encryption.

🌑 Modern UI: Fully responsive, dark-mode interface built with Tailwind CSS.

💾 Cloud Database: User data and transaction history are persistently stored in MongoDB Atlas.

⚡ High Performance: Frontend powered by Vite + React for instant page loads.

🛠️ Tech Stack

Component

Technology

Description

Frontend

React.js

Component-based UI library

Styling

Tailwind CSS

Utility-first CSS framework

Backend

Node.js & Express

RESTful API server

Database

MongoDB Atlas

NoSQL Cloud Database

Auth

JWT & Bcrypt

Stateless authentication & Hashing

Deployment

Vercel & Render

CI/CD Hosting

⚙️ Local Installation Guide

If you want to run this project locally on your machine:

1. Clone the Repository

git clone [https://github.com/manyaverma727/Vestio.git](https://github.com/manyaverma727/Vestio.git)
cd Vestio


2. Setup Backend

cd server
npm install


Create a .env file in the server folder and add:

DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run the server:

npm run dev


3. Setup Frontend

Open a new terminal:

cd client
npm install
npm run dev


🔮 Future Roadmap

[ ] Integration with Finnhub API for real-time stock prices.

[ ] Interactive Charts using Chart.js or Recharts.

[ ] Portfolio Dashboard with Profit/Loss calculation.

[ ] "Watchlist" feature to track favorite stocks.

Developed by Manya Verma