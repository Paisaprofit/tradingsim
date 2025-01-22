// Fetch stock data from the JSON file only once
async function fetchStockData() {
    const response = await fetch("../public/candlestick_data.json"); // Load stock data from the file
    const data = await response.json();
    console.log("Stock Data Fetched:", data);
    return data;
}

// Initialize the graph with Chart.js
function initializeGraph() {
    const ctx = document.getElementById("stockChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [], // Timestamps
            datasets: [
                {
                    label: "Stock Price",
                    data: [], // Stock prices
                    borderColor: "red", // Default color (will change dynamically)
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Stock Price (₹)",
                    },
                },
            },
        },
    });
    return chart;
}

// Update the graph dynamically
function updateGraph(chart, stockData, index) {
    const currentData = stockData[index];

    chart.data.labels.push(currentData.time); // Add timestamp to x-axis
    chart.data.datasets[0].data.push(currentData.value); // Add stock price to y-axis
    chart.data.datasets[0].borderColor = currentData.color; // Update line color
    chart.update(); // Refresh the chart
}

// Start the stock graph updates
async function startStockGraph() {
    const stockData = await fetchStockData(); // Fetch stock data from JSON (only once)
    // const chart = initializeGraph(); // Initialize the graph
    let index = 0;
    // Update the graph every second
    const interval = setInterval(() => {
        if (index < stockData.length) {
            // updateGraph(chart, stockData, index); // Update with the current data point
            // console.log(stockData[index]);
            
            // update_data(stockData[index]);
            index++;
        } else {
            clearInterval(interval); // Stop updates when all data is processed
        }
    }, 1000); // 1-second interval
}

// Run the graph updates
document.addEventListener("DOMContentLoaded", startStockGraph);
