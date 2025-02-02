# AI Financial Wellness Companion

## Overview

This project aims to create an **AI-powered digital tool** to assist users in achieving **financial wellness**. The tool helps individuals manage their finances, understand complex financial products, and receive personalized recommendations to improve their financial health. This solution is designed for **Sun Life's Hackathon Challenge**, where the goal is to leverage AI for promoting financial security and wellness.

## Features

- **Financial Planning and Predictions:**
    - Users can input their current financial data (savings, income, expenses) and receive AI-powered predictions for their future financial goals.
    - AI forecasts retirement age, savings, and provides insights based on the user’s financial data.

- **Real-Time Chatbot Assistance:**
    - The AI chatbot can answer financial-related queries, helping users understand financial products, make decisions, and provide suggestions.
    - The chatbot fetches user data from the database for more personalized and informed responses.

- **Interactive Dashboards:**
    - Visualizations such as graphs and charts help users track their savings, expenditures, and milestones toward financial goals.
    - Track progress toward retirement savings and provide monthly financial insights.

- **Personalized Recommendations:**
    - The application offers financial recommendations based on the user’s current financial state and goals, helping them make informed decisions to improve their financial well-being.

## Tech Stack

- **Frontend:**
    - React.js for building the user interface.
    - TailwindCSS for styling.
    - Recharts for displaying data visualizations (e.g., financial projections, savings growth).
    - TypeScript for type safety and maintainability.

- **Backend:**
    - Node.js with Express for the server.
    - MongoDB as the database to store user data and financial records.
    - Integration with the **Gemini AI API** for the financial chatbot and data predictions.

- **Tools & Libraries:**
    - Axios for making HTTP requests.
    - Recharts for charts and visualizations.
    - React Query for managing server-state and fetching data.
    - Webpack and Babel for bundling and transpiling the code.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-financial-companion.git
cd ai-financial-companion
```
### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd backend
npm install
```

### 3. Running the Project
#### Frontend
```bash
cd frontend
npm run dev
```
This will start the React development server on http://localhost:8080.

#### Backend
```bash
cd backend
node server.js
```
This will start the backend server on http://localhost:5000.

Make sure your backend and frontend servers are both running for the app to function properly.

### 4. Configure the Database

Ensure that your MongoDB instance is running locally or use a cloud-based MongoDB service like MongoDB Atlas.

In the .env file that should be given to you by our developers, you will find the MongoDB URI

## API Documentation
The backend exposes the following API endpoints:

* POST /api/chat: Receives a message from the user and returns an AI response based on the financial query.
* GET /api/retirement: Fetches retirement-related data and projections.
* POST /api/retirement: Updates the retirement data in the database.

### How to use
1. Set up the application by following the setup instructions above.
2. Login and input your financial data, such as monthly savings, income, expenses, etc.
3. Use the AI-powered chatbot to ask questions about your finances, such as retirement planning, saving strategies, or investment advice.
4. Track your progress with visual charts and insights provided by the dashboard.
5. Based on the provided data, the system will give you personalized recommendations to improve your financial health.

## Contributing
Feel free to fork this repository and submit pull requests with improvements. Contributions are welcome!
