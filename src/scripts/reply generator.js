class MascotChatbot {
    constructor(options) {
      this.name = options.name || "Mascot";
      this.container = options.container || document.body;
      this.responses = this.getResponses();
      this.init();
    }
  
    // Initialize the chatbot
    init() {
      this.renderChatUI();
      this.addEventListeners();
      this.introduce();
    }
  
    // Render the chatbot UI
    renderChatUI() {
      this.container.innerHTML = `
        <div id="mascot-chatbot">
          <div id="chat-header">
            <h3>${this.name}</h3>
          </div>
          <div id="chat-body">
            <div id="chat-messages"></div>
          </div>
          <div id="chat-input">
            <input type="text" id="user-input" placeholder="Ask me something...">
            <button id="send-btn">Send</button>
          </div>
        </div>
      `;
    }
  
    // Add event listeners to UI elements
    addEventListeners() {
      document.querySelector("#send-btn").addEventListener("click", () => this.handleUserInput());
      document.querySelector("#user-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.handleUserInput();
      });
    }
  
    // Display a message in the chat
    displayMessage(sender, message) {
      const messagesContainer = document.querySelector("#chat-messages");
      const messageElement = document.createElement("div");
      messageElement.className = sender;
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  
    // Mascot introduction messages
    introduce() {
      this.displayMessage("bot", `Hi there! I'm ${this.name}, your trading buddy.`);
      this.displayMessage("bot", "I'm here to help you understand trading concepts like RSI and more.");
    }
  
    // Handle user input
    handleUserInput() {
      const userInput = document.querySelector("#user-input").value.trim();
      if (userInput) {
        this.displayMessage("user", userInput);
        this.respondToUser(userInput);
        document.querySelector("#user-input").value = "";
      }
    }
  
    // Provide responses to user input
    respondToUser(input) {
      const response = this.responses[input] || "I’m not sure about that. Can you ask something else?";
      this.displayMessage("bot", response);
    }
  
    // Get comprehensive response data
    getResponses() {
      return {
        "What is trading?": "Trading is the act of buying and selling financial instruments like stocks, bonds, commodities, or currencies with the goal of making a profit.",
        "What are stocks?": "Stocks represent ownership in a company. When you buy a stock, you become a shareholder and own a small piece of that company.",
        "What is the stock market?": "The stock market is where stocks are bought and sold. Think of it as a marketplace where investors trade shares of companies.",
        "What is a broker?": "A broker is a person or platform that helps you buy and sell financial instruments. Online brokers make it easy to trade from your phone or computer.",
        "How do I start trading?": "To start trading, you’ll need a brokerage account. Once you set it up, you can deposit money, research stocks or other instruments, and start trading.",
        "What is technical analysis?": "Technical analysis involves analyzing price charts and patterns to predict future price movements. It’s like reading the story of the market’s past.",
        "What is fundamental analysis?": "Fundamental analysis focuses on a company’s financial health, like earnings, revenue, and industry trends, to assess its stock value.",
        "What’s the difference between a market order and a limit order?": "A market order buys or sells at the current market price, while a limit order sets a specific price at which you want to trade.",
        "What are stop-loss orders?": "A stop-loss order automatically sells your position if the price drops to a certain level, helping you limit your losses.",
        "What is diversification?": "Diversification is spreading your investments across different assets to reduce risk. Don’t put all your eggs in one basket!",
        "What is leverage in trading?": "Leverage allows you to control a larger position with a smaller amount of capital by borrowing funds. While it can amplify profits, it also increases risk.",
        "What is short selling?": "Short selling involves borrowing shares to sell them, hoping the price drops so you can buy them back at a lower cost and return them, keeping the difference.",
        "What are options in trading?": "Options are contracts that give you the right, but not the obligation, to buy or sell an asset at a specific price before a certain date.",
        "What is algorithmic trading?": "Algorithmic trading uses computer programs and algorithms to execute trades based on predefined criteria, like price, volume, or timing.",
        "What is risk management?": "Risk management involves strategies to minimize potential losses, such as setting stop-loss orders, diversifying your portfolio, and not over-leveraging.",
        "How do I handle losing trades?": "Losses are part of trading. Focus on your strategy, analyze what went wrong, and avoid emotional decisions. Remember, discipline is key.",
        "When should I take profits?": "Set a target price based on your research or use trailing stop orders to lock in gains while letting your profits run.",
        "How do I identify trends?": "Look for higher highs and higher lows in an uptrend, or lower highs and lower lows in a downtrend. Use moving averages or trendlines for confirmation.",
        "What’s a good risk-reward ratio?": "A common ratio is 1:3, meaning for every $1 of risk, aim for $3 in potential reward. Adjust based on your strategy and market conditions.",
        "What does overbought mean?": "When RSI is above 70, it means the stock might be overbought. This could indicate it’s overvalued and may soon see a price drop.",
        "What about oversold?": "When RSI is below 30, it means the stock might be oversold. This suggests it could be undervalued and might rise soon.",
        "How do I use RSI?": "A common strategy is to watch for RSI crossing the 30 or 70 levels. For example, if RSI moves below 30 and then back up, it might be a good time to buy.",
        "How is RSI calculated?": "The RSI formula is: RSI = 100 - (100 / (1 + RS)). RS stands for Relative Strength, which is the ratio of Average Gain to Average Loss over a set period (commonly 14 days).",
        "What’s RSI divergence?": "Great question! RSI divergence occurs when the stock’s price and RSI move in opposite directions. For example, if the price makes a new high but RSI doesn’t, it could signal a trend reversal.",
        "How can I use RSI with other indicators?": "Excellent strategy! Combine RSI with indicators like MACD for momentum confirmation or Bollinger Bands to gauge price volatility. It helps you make stronger decisions.",
        "Can I adjust RSI settings?": "Yes, the default RSI period is 14 days, but you can tweak it based on your trading style. A shorter period (e.g., 7 days) makes RSI more sensitive, while a longer period (e.g., 21 days) smoothens it out.",
        "Can you give me an example?": "Imagine a stock’s price rises to a new high, but RSI stays flat or drops. That’s bearish divergence and could mean the uptrend is losing strength.",
        "default": "That’s it for now! Remember, RSI and trading strategies require practice and discipline. Let me know if you have more questions!"
      };
    }
  }
  
  // Initialize the chatbot
  const chatbotOptions = {
    name: "Mascot",
    container: document.getElementById("chatbot-container")
  };
  
  const mascotChatbot = new MascotChatbot(chatbotOptions);
  