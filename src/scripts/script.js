mock_data = []

function parseDate(dateString) {
    return Math.floor(new Date(dateString).getTime() / 1000);
}

mock_data.sort((a, b) => new Date(a.time) - new Date(b.time));

// Function to calculate RSI
function calculateRSI(data, period = 14) {
    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
        const change = data[i].close - data[i - 1].close;
        if (change > 0) {
            gains += change;
        } else {
            losses -= change;
        }
    }

    const averageGain = gains / period;
    const averageLoss = losses / period;
    const rs = averageGain / averageLoss;
    const rsi = 100 - (100 / (1 + rs));
    // console.log(rsi);
    
    window.currentRSI = rsi;
    return rsi;
}

document.addEventListener('DOMContentLoaded', function() {
    const createChart = window.LightweightCharts.createChart;

    const chartContainer = document.getElementById('chart');
    const mainChart = createChart(chartContainer, {
        width: window.innerWidth * 0.75,
        height: window.innerHeight * 0.5,
        layout: {
            background: { color: '#000F1C' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
    });

    const rsiChart = createChart(chartContainer, {
        width: window.innerWidth * 0.75,
        height: window.innerHeight * 0.25,
        layout: {
            background: { color: '#000F1C' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
    });

    console.log("loaded");
    const candlestickSeries = mainChart.addCandlestickSeries();

    const rsiSeries = rsiChart.addLineSeries({
        color: 'blue',
        lineWidth: 2,
    });

    function toggleRSIVisibility(visible) {
        rsiSeries.applyOptions({ visible: visible });
    }
    window.toggleRSIVisibility = toggleRSIVisibility;
    toggleRSIVisibility(false);

    function updateRSI() {
        // console.log("updatersi");
        
        const rsiData = [];
        const candlestickData = window.data.candlestickData;

        for (let i = 14; i < candlestickData.length; i++) {
            const rsi = calculateRSI(candlestickData.slice(i - 14, i + 1));
            rsiData.push({
                time: candlestickData[i].time,
                value: rsi
            });
        }
        rsiSeries.setData(rsiData);
    }

    function addRSIMarker(c) {
        if (mock_data.length === 0) return;
        const latestRSIData = rsiSeries.data()[rsiSeries.data().length - 1];
        const marker = {
            time: latestRSIData.time,
            position: 'aboveBar',
            color: "yellow",
            shape: 'arrowDown',
            text: c,
            size: 2, // Increase the size of the marker
            textSize: 24 // Increase the size of the text
        };
        const existingMarkers = rsiSeries.markers() || [];
        existingMarkers.push(marker);
        rsiSeries.setMarkers(existingMarkers);
    }
    window.addRSIMarker = addRSIMarker;

    let count = 0;

    window.update_data = function(prop) {
        const newData = prop;
        mock_data.push(newData);
        candlestickSeries.update({
            time: parseDate(newData.time),
            open: newData.open,
            high: newData.high,
            low: newData.low,
            close: newData.close
        });
        count++;
        if (count <= 50) mainChart.timeScale().fitContent();
        document.latestPrice = newData.close;
        document.getElementById("csp").innerText = newData.close;
        updateRSI();
    };
    
    window.place_marker = function(c,s) {
        if (mock_data.length === 0) return;
        const latestData = mock_data[mock_data.length - 1];
        const marker = {
            time: parseDate(latestData.time),
            position: 'aboveBar',
            color: s ? 'red' : 'green',
            shape: 'arrowDown',
            text: c
        };
        const existingMarkers = candlestickSeries.markers() || [];
        existingMarkers.push(marker);
        candlestickSeries.setMarkers(existingMarkers);
    }
    
    mock_data.forEach(element => {
        update_data(element);
        console.log("updated")
    });

    candlestickSeries.setData(mock_data.map(item => ({
        time: parseDate(item.time),
        open: item.open,
        high: item.high , // Example high value
        low: item.low ,  // Example low value
        close: item.close
    })));

    // Initial RSI calculation
    updateRSI();
});