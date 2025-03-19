# Grok Chat Demo

A simple Node.js application demonstrating the use of Grok AI through the agent-twitter-client package. This project allows you to interact with Grok AI through a command-line interface without requiring Twitter API keys.

## Features
- Simple command-line interface for Grok chat
- Rate limit handling
- Conversation management
- No Twitter API keys required

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Twitter credentials:
```
TWITTER_USERNAME=your_username
TWITTER_PASSWORD=your_password
```

3. Run the application:
```bash
node index.js
```

## Usage

The application provides a simple command-line interface to chat with Grok. Just type your message and press Enter. Type 'exit' to quit the application.

Example commands:
```bash
# Start a new chat
node index.js

# The app will prompt you for input
> What are your thoughts on AI?
[Grok will respond here]
```

## Rate Limits
- Free tier: 25 messages every 2 hours
- The application will notify you when you're approaching rate limits

## Note
This is a demo application using unofficial API access to Grok through Twitter's interface. Use responsibly and be aware of Twitter's terms of service. 