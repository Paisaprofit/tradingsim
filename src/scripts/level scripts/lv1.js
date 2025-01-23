async function addMessagesWithDelay(x) {
    await addMessageWithDelay(0, "Hi there! I'm here to help you understand RSI—the Relative Strength Index. Whether you're just starting out or an advanced trader, let's explore RSI together!", x);
}

addMessagesWithDelay(5000)


window.levelhandler = () => {
    checkpoints = {
        "rsi70": false,
        "rsi30": false,
        "f3":false,
        "f7":false,
        "timeout":true,
        "quiz": {
            "q3":null,
            "q7":null
        },
        "final": false
    }

    

    setInterval(() => {
        /*
        
                RSI UNDER 30 - OVERSOLD CONDITION
        
        */ 
        if (currentRSI <= 30 && checkpoints["rsi30"] == false ){
            //defs
            final_handler = () => {
                        
                play();
                document.getElementById("chatmessages").firstElementChild.remove()
            }
            choice_handler = (n) => {
                if (n == 1) {
                    
                    addInteractiveMessage("Correct!","Continue","",final_handler)
                }
            }
            //functionality
            pause()
            checkpoints["rsi30"] = true
            if (!controls['rsi'].val){
                togglecontrol['rsi']
            }
            //marker
            addRSIMarker("Oversold")
            //popup
            addInteractiveMessage("The RSI being under 30 indicates the stock is oversold, suggesting it may be undervalued and a potential buying opportunity. <br> However, confirm with other indicators or trends before acting, as oversold doesn't always mean the price will rise immediately.","Continue","",final_handler);            
        }

        /*
        
                RSI ABOVE 70 - OVERBOUGHT CONDITION
        
        */ 
        if (currentRSI >= 70 && checkpoints["rsi70"] == false ){
            //defs
            final_handler = () => {
                        
                play();
                document.getElementById("chatmessages").firstElementChild.remove()
            }
            choice_handler = (n) => {
                if (n == 1) {
                    
                    addInteractiveMessage("Correct!","Continue","",final_handler)
                }
            }
            //functionality
            pause()
            checkpoints["rsi70"] = true
            if (!controls['rsi'].val){
                togglecontrol['rsi']
            }
            //marker
            addRSIMarker("Overbought")
            //popup
            addInteractiveMessage("The RSI above 70 suggests the stock might be overbought—its price could be inflated. <br><br> Consider waiting for a pullback or selling to lock in profits, but confirm with other indicators.","Continue","",final_handler);            
        }

        /*
        
                TRY YOURSELF 
    
        */ 
        if (checkpoints["rsi30"] && checkpoints["rsi70"] && checkpoints['timeout']) {setInterval(() => {console.log("ran");
        ;checkpoints['timeout'] = false},5000)}
        if(!checkpoints['final'] && checkpoints["rsi30"] && checkpoints["rsi70"] && !checkpoints['timeout']){
            console.log("eligible for final quiz");
            
            if (currentRSI >= 70 && checkpoints["f7"] == false ){
            //defs
            final_handler = () => {
                        
                play();
                document.getElementById("chatmessages").firstElementChild.remove()
            }
            choice_handler = (n) => {
                if (n == 2) {
                    addInteractiveMessage("Good job! <br><br>  ","Continue","",final_handler)
                    checkpoints['quiz']['q7'] = true;
                }else {
                    addInteractiveMessage("Buying now is risky as the stock may be overbought and prone to a price drop.  ","Continue","",final_handler)
                    checkpoints['quiz']['q7'] = false;
                }
            }
            //functionality
            pause()
            checkpoints["f7"] = true           
            if (checkpoints['f3'] && checkpoints['f7']){checkpoints['final'] = true;final_score()}
            if (!controls['rsi'].val){
                togglecontrol['rsi']
            }
            //marker
            addRSIMarker("Overbought")
            //popup
            addInteractiveMessage("Should you buy or sell?","Buy","Sell",choice_handler);            
        }

        if (currentRSI <= 30 && checkpoints["f3"] == false ){
            //defs
            final_handler = () => {
                play();
                document.getElementById("chatmessages").firstElementChild.remove()
            }
            choice_handler = (n) => {
                if (n == 1) {
                    
                    addInteractiveMessage("Good job!","Continue","",final_handler)
                    checkpoints['quiz']['q3'] = true;
                }
                if (n == 2){
                    addInteractiveMessage("You're selling when the stock is oversold, which could mean missing a chance for it to bounce back.","Continue","",final_handler)
                    checkpoints['quiz']['q3'] = false;
                }
            }
            //functionality
            pause()
            checkpoints["f3"] = true
            if (checkpoints['f3'] && checkpoints['f7']){checkpoints['final'] = true;final_score()}
            if (!controls['rsi'].val){
                togglecontrol['rsi']
            }
            //marker
            addRSIMarker("Oversold")
            //popup
            addInteractiveMessage("Should you buy or sell?","Buy","Sell",choice_handler);            
        }}
        final_score();
    }, 100);
}


function final_score(){
    console.log("ran final_score");
    
    if ((checkpoints['quiz']['q3'] == null || checkpoints['quiz']['q7'] == null)){return}
    window.final_score = () => {};
    score = 0
    score += 1 * (checkpoints['quiz']['q3'])
    score += 1 * (checkpoints['quiz']['q7'])
    setTimeout(() => {
        switch (score) {
            case 0:
                addMessage(0,"Don't give up! 💪 Try this level again and focus on the key concepts. Your score: 0%. You can do it!")
                break;
        
            case 1:
                addMessage(0,"Great job on completing this level! 🎉 Keep exploring and improving. Your score: 50%. 🚀")
                break;
            
            case 2:
                addMessage(0,"Congratulations! 🎉 You've mastered this level with flying colors! Feel free to explore further and conquer new challenges. Your score: 100%! 🌟")
                break;
        }
    }, 2500);
}


let timerInterval;
let remainingTime;

function setCountdownTimer(duration) {
    remainingTime = duration;
    const display = document.getElementById('timer');
    
    const updateDisplay = () => {
        let minutes = parseInt(remainingTime / 60, 10);
        let seconds = parseInt(remainingTime % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
    };

    const startTimer = () => {
        timerInterval = setInterval(() => {
            if (--remainingTime < 0) {
                clearInterval(timerInterval);
                display.textContent = "Time's up!";
                pause()
                addInteractiveMessage(`Time's Up! You can restart the level to continue playing. `,"continue","",() => {window.history.back();})
            } else {
                updateDisplay();
            }
        }, 1000);
    };

    window.pausetimer = () => {
        clearInterval(timerInterval);
    };

    window.resumetimer = () => {
        startTimer();
    };

    updateDisplay();
    startTimer();
}

setCountdownTimer(300);



window.final_score = final_score

setTimeout(() => {
    window.levelhandler();
}, 5000);
