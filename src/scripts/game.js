// Set default user object
const loggedInUser = "defaultUser";

// Initialize the game
async function initializeGame() {
  // Show the game container
  // document.getElementById("game-container").style.display = "block";

  gameData =  {
    "sharesOwned": 0,
    "balance": 10000
  }; // Fetch user-specific game data
  // const stockData = await fetchStockData(); // Fetch stock data for game
  const stockData = [120];
  let currentStockPrice = latestPrice; // Get initial stock price
  let stockIndex = 0;
  window.updateGameUI = updateGameUI;
  // Update the game UI
  function updateGameUI() {
    document.getElementById("p").innerText = (gameData.balance + gameData.sharesOwned*latestPrice - 10000).toFixed(2);
    document.getElementById("pp").innerText = (gameData.balance + gameData.sharesOwned*latestPrice).toFixed(2);
    console.log(gameData.balance, gameData.sharesOwned, currentStockPrice);
    //   document.getElementById("balance").innerText = gameData.balance.toFixed(2);
    //   document.getElementById("sharesOwned").innerText = gameData.sharesOwned;
    //   document.getElementById("stockPrice").innerText = currentStockPrice.toFixed(2);

    // Disable the sell button if conditions are not met
    //   const sellButton = document.getElementById("sellButton");
    //   const quantity = parseInt(document.getElementById("quantity").value || "0", 10);
    //   sellButton.disabled = gameData.sharesOwned === 0 || quantity > gameData.sharesOwned || quantity <= 0;
  }

  window.updateGameUI = updateGameUI;

  setInterval(() => {
    updateGameUI()
  }, 300);

  // Buy shares
  function buyShares(quantity) {
    currentStockPrice = latestPrice;
    if (quantity <= 0) return;
    const totalCost = quantity * currentStockPrice;
    console.log(quantity,currentStockPrice,totalCost,"from buyShares")
    if (gameData.balance >= totalCost) {
      gameData.balance -= totalCost;
      gameData.sharesOwned += quantity;
      // saveGameData(loggedInUser, gameData);
      place_marker("Buy " + quantity,0)
    }
    updateGameUI();
    document.getElementById("balance").innerText = gameData.balance.toFixed(2);
    document.getElementById("so").innerText = gameData.sharesOwned;
  }

  // Sell shares
  function sellShares(quantity) {
    if (quantity <= 0) return;
    if (gameData.sharesOwned >= quantity) {
      currentStockPrice = latestPrice;
      const totalRevenue = quantity * currentStockPrice;
      gameData.balance += totalRevenue;
      gameData.sharesOwned -= quantity;
      // saveGameData(loggedInUser, gameData);
      place_marker("Sell " + quantity,1)
      console.log(`[SOLD] ${quantity} `);
    }
    
    updateGameUI();
    document.getElementById("balance").innerText = gameData.balance.toFixed(2);
    document.getElementById("so").innerText = gameData.sharesOwned;
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
  if (allGameData[username]) {
    allGameData[username].balance = parseInt(allGameData[username].balance, 10);
    allGameData[username].sharesOwned = parseInt(allGameData[username].sharesOwned, 10);
  }
  return allGameData[username] || { sharesOwned: 0, balance: 1000 };
}

function saveGameData(username, gameData) {
  const allGameData = JSON.parse(localStorage.getItem("gameData")) || {};
  allGameData[username] = gameData;
  localStorage.setItem("gameData", JSON.stringify(allGameData));
}

// Start the game logic
document.addEventListener("DOMContentLoaded", initializeGame);

