controls = {
    rsi:{
        val:false,
        handler:() => {
            val=controls.rsi.val;
            const element = document.getElementById("rsi");
            if (element) {
                element.classList.toggle("active");
            }
            
            toggleRSIVisibility(!val)
            console.log(!val)
            controls.rsi.val = !val;
        }
    }
}

function togglecontrol(bool){
    controls[bool].handler()
}

/*
    s : 0 for sell 1 for buy
    qty : qty to sell or buy
*/
function handlesale(s,qty){
    if (!qty){
        qty = parseInt(document.getElementById("control-input").value)
        document.getElementById("control-input").value = '1'
    }
    //code to modify stats
    if (s == 1){
        buyShares(qty);
    }
    if (s == 0){
        sellShares(qty);
    }
    //clean config
    
}