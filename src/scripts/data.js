// Function to simulate stock price changes with trends and volatility
function simulateStockPrice(previousValue, trend, volatility) {
    const randomFactor = (Math.random() * 2 - 1); // Gaussian approximation
    const change = trend + volatility * randomFactor;
    return Math.max((previousValue + change).toFixed(2), 0); // Ensure price doesn't go negative
}

// Function to determine the color based on price change
function determineColor(currentValue, previousValue) {
    return currentValue > previousValue ? "green" : "red";
}

// Function to generate candlestick data for a single interval
function generateCandlestickData(previousClose) {
    const openPrice = (Math.random() * (previousClose * 0.04) + previousClose * 0.98).toFixed(2);
    const highPrice = (Math.random() * (openPrice * 0.05) + parseFloat(openPrice)).toFixed(2);
    const lowPrice = (Math.random() * (openPrice * 0.05) + openPrice * 0.95).toFixed(2);
    const closePrice = (Math.random() * (highPrice - lowPrice) + parseFloat(lowPrice)).toFixed(2);
    return {
        open: parseFloat(openPrice),
        high: parseFloat(highPrice),
        low: parseFloat(lowPrice),
        close: parseFloat(closePrice)
    };
}
// Function to update data (assuming this function exists)
function update_data(normalData, candlestickData) {
    // Implementation of update_data function
}

window.data = { normalData: [], candlestickData: [] };

window.volatilityconst = 0.8
window.trendconst = 0.1

// Main function to generate and append data
async function generateContinuousData(normalFileName, candlestickFileName, duration = 300) {

    

    // const fs = require('fs');
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 1000);

    candlestickData = window.data.candlestickData;
    normalData = window.data.normalData;
    // try {
    //     normalData = JSON.parse(fs.readFileSync(normalFileName, 'utf8'));
    // } catch (err) {
    //     console.log("Normal data file not found. Creating new file.");
    // }

    // try {
    //     candlestickData = JSON.parse(fs.readFileSync(candlestickFileName, 'utf8'));
    // } catch (err) {
    //     console.log("Candlestick data file not found. Creating new file.");
    // }

    // Start with the last value if exists; otherwise, use a random initial value
    let previousClose = candlestickData.length > 0 ? candlestickData[candlestickData.length - 1].close : (Math.random() * 100 + 100);
    let previousValue = normalData.length > 0 ? normalData[normalData.length - 1].value : previousClose;

    // Define market conditions
    let trend = Math.random() * trendconst - 0.05; // Small trend over time
    let volatility = Math.random() * volatilityconst + 0.2 + 10000; // Volatility parameter

    // Generate data for the specified duration
    while (new Date()) {
        const currentTime = new Date().toISOString();

        // Generate normal data
        const currentValue = simulateStockPrice(previousValue, trend, volatility);
        const color = determineColor(currentValue, previousValue);
        normalData.push({
            time: currentTime,
            value: parseFloat(currentValue),
            color: color
        });
        // Generate candlestick data
        const { open, high, low, close } = generateCandlestickData(previousClose);

        
        const candlestick = {
            time: Math.floor(new Date().getTime() ),
            open: open,
            high: high,
            low: low,
            close: close
        };

        candlestickData.push({
            time: Math.floor(new Date().getTime() ),
            open: open,
            high: high,
            low: low,
            close: close
        });

        // Parse data to JSON form and pass to update_data()
        // console.log(candlestickData)
        window.latestPrice = close
        Math.random() > 0.9 ? candlestick.breakpoint = true : candlestick.breakpoint = false;
        update_data(candlestick);

        // Update previous values for the next iteration
        previousValue = currentValue;
        previousClose = close;

        // Introduce slight adjustments to trend and volatility to simulate realistic markets
        trend += (Math.random() * 0.01 - 0.005);
        volatility = Math.min(Math.max(volatility + (Math.random() * 0.2 - 0.1), 0.2), 2.0);

        // Time delta for data generation
        if (window.gameIsPaused) {
            await new Promise(resolve => {
            const interval = setInterval(() => {
                if (!window.gameIsPaused) {
                clearInterval(interval);
                resolve();
                }
            }, 100);
            });
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

window.pause = () => {window.gameIsPaused = true}
window.play = () => {window.gameIsPaused = false}


// Run the function
(async () => {
    await generateContinuousData("normal_data.json", "candlestick_data.json");
})();
