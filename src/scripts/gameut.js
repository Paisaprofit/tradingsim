// Retrieve logged-in user data
function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
  }
  
  // Initialize the game
  async function initializeGame() {
    const loggedInUser = getLoggedInUser();
  
    // Show login message if no user is logged in
    if (!loggedInUser) {
      document.getElementById("login-message").style.display = "block";
      return;
    }
  
    // Show the game container
    // document.getElementById("game-container").style.display = "block";
  
    const gameData = getGameData(loggedInUser); // Fetch user-specific game data
    // const stockData = await fetchStockData(); // Fetch stock data for game
    const stockData = [120];
    let currentStockPrice = curren; // Get initial stock price
    let stockIndex = 0;
  
    // Update the game UI
    function updateGameUI() {
        console.log(gameData.balance,gameData.sharesOwned,currentStockPrice.toFixed(2));
    //   document.getElementById("balance").innerText = gameData.balance.toFixed(2);
    //   document.getElementById("sharesOwned").innerText = gameData.sharesOwned;
    //   document.getElementById("stockPrice").innerText = currentStockPrice.toFixed(2);
  
      // Disable the sell button if conditions are not met
    //   const sellButton = document.getElementById("sellButton");
    //   const quantity = parseInt(document.getElementById("quantity").value || "0", 10);
    //   sellButton.disabled = gameData.sharesOwned === 0 || quantity > gameData.sharesOwned || quantity <= 0;
    }
  
    // Buy shares
    function buyShares(quantity) {
        if (quantity <= 0) return;
      const totalCost = quantity * currentStockPrice;
      if (gameData.balance >= totalCost) {
        gameData.balance -= totalCost;
        gameData.sharesOwned += quantity;
        saveGameData(loggedInUser, gameData);
      }
      updateGameUI();
    }
  
    // Sell shares
    function sellShares(quantity) {
        if (quantity <= 0) return
      if (gameData.sharesOwned >= quantity) {
        const totalRevenue = quantity * currentStockPrice;
        gameData.balance += totalRevenue;
        gameData.sharesOwned -= quantity;
        saveGameData(loggedInUser, gameData);
      }
      updateGameUI();
    }

    window.sellShares = sellShares;
    window.buyShares = buyShares;
  
    // Attach event listeners
    // document.getElementById("buyButton").addEventListener("click", () => {
    //   const quantity = parseInt(document.getElementById("quantity").value || "0", 10);
    //   if (quantity > 0) buyShares(quantity);
  
    // document.getElementById("sellButton").addEventListener("click", () => {
    //   const quantity = parseInt(document.getElementById("quantity").value || "0", 10);
    //   if (quantity > 0) sellShares(quantity);
    // });
  
    // Update the stock price and UI every second
    setInterval(() => {
      if (stockIndex < stockData.length) {
        currentStockPrice = stockData[stockIndex].value;
        stockIndex++;
        updateGameUI();
      }
    }, 1000);
  }
  
  // Retrieve and save game data
  function getGameData(username) {
    const allGameData = JSON.parse(localStorage.getItem("gameData")) || {};
    return allGameData[username] || { sharesOwned: 0, balance: 1000 };
  }
  
  function saveGameData(username, gameData) {
    const allGameData = JSON.parse(localStorage.getItem("gameData")) || {};
    allGameData[username] = gameData;
    localStorage.setItem("gameData", JSON.stringify(allGameData));
  }
  
  // Start the game logic
  document.addEventListener("DOMContentLoaded", initializeGame);
  
