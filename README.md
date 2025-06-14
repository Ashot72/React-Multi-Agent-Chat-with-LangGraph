# React Multi-Agent Chat App Powered by LangGraph Server Agents

I built a **React Multi-Agent Chat App** powered by **LangGraph Server Agents**. The React app communicates with LangGraph Server agents and renders their responses. It can connect to any agent, including the **Supervisor Agent**.

The experience is similar to ChatGPT — users can edit a human prompt to generate alternative responses, view them as branches, and even regenerate AI responses for the same prompt. Additionally, the app supports **thread history**, allowing users to revisit and continue any previous conversation at any time.

## Agents

- **Chat Agent** – Handles general conversations and allows users to upload images and ask questions about them.

- **Search Agent** – Retrieves live data using **Tavily Search**.

- **Job Notification Agent** – Uses **human-in-the-loop logic** (*interrupts*) to involve human decision-making at key points, such as selecting the best-fit employee and reviewing or editing AI-generated emails before sending.

- **Supervisor Agent** – Routes prompts to the appropriate agent based on context.


# Setup Instructions

This project consists of two parts:

1. **LangGraph Studio** – Runs the backend agents.
2. **React Multi-Agent Chat App** – The frontend interface that connects to LangGraph Studio.

---

## 🚀 Clone and Run LangGraph Studio

```bash
# Clone the repository

git clone https://github.com/Ashot72/React-Multi-Agent-Chat-with-LangGraph

# LangGraph Studio

cd React-Multi-Agent-Chat-with-LangGraph/langgraph-agents

# Create the .env file based on env.example.txt and include the required keys
# (e.g., OpenAI API key, Tavily Search key, and NodeMailer settings)

# Install dependencies
npm install

# Start the LangGraph Studio
npm start

# React App

cd React-Multi-Agent-Chat-with-LangGraph/langgraph-multichat

# Install dependencies
npm install

# Start the React app (http://localhost:3000)
npm run dev

```

Go to [React Multi-Agent Chat App Powered by LangGraph Server Agents Video](https://youtu.be/q3ME4lPdib8) page

Go to [React Multi-Agent Chat App Powered by LangGraph Server Agents Description](https://ashot72.github.io/React-Multi-Agent-Chat-with-LangGraph/doc.html) page
