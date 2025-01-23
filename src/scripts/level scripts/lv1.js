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
            if (currentRSI >= 70 && checkpoints["f7"] == false ){
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
            checkpoints["f7"] = true
            if (!controls['rsi'].val){
                togglecontrol['rsi']
            }
            //marker
            addRSIMarker("Overbought")
            //popup
            addInteractiveMessage("The RSI above 70 suggests the stock might be overbought—its price could be inflated. <br><br> Consider waiting for a pullback or selling to lock in profits, but confirm with other indicators.","Continue","",final_handler);            
        }

        if (currentRSI <= 50 && checkpoints["f3"] == false ){
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
            checkpoints["f3"] = true
            if (!controls['rsi'].val){
                togglecontrol['rsi']
            }
            //marker
            addRSIMarker("Oversold")
            //popup
            addInteractiveMessage("The RSI being under 30 indicates the stock is oversold, suggesting it may be undervalued and a potential buying opportunity. <br> However, confirm with other indicators or trends before acting, as oversold doesn't always mean the price will rise immediately.","Continue","",final_handler);            
        }}

    }, 100);

}

setTimeout(() => {
    window.levelhandler();
}, 5000);
