undoBtn.addEventListener("mousedown", function(){
    interval = setInterval(function(){    
        if(undoArr.length > 0){
            redoArr.push(undoArr.pop());  
            redraw();  
        }
        else{
            clearInterval();
        }
    },60);
})

undoBtn.addEventListener("mouseup", function(){
    clearInterval(interval);
})

redoBtn.addEventListener("mousedown", function(){
    interval = setInterval(function(){
        if(redoArr.length > 0){
            undoArr.push(redoArr.pop());
            redraw();
        }else{
            clearInterval(interval);
        }
    },60);
}) 

redoBtn.addEventListener("mouseup", function(){
    clearInterval(interval);
})

zoomInBtn.addEventListener("click", function(){
    if(zoomLevel < 3){
        zoomLevel += 0.2;
        canvas.style.transform = `scale(${zoomLevel})`
    }
})

zoomOutBtn.addEventListener("click", function(){
    if(zoomLevel > 0.5){
        zoomLevel -= 0.2;
        canvas.style.transform = `scale(${zoomLevel})`
    }
})

function redraw(){
    tool.clearRect(0, 0, canvas.width, canvas.height); 
    for(let i = 0; i < undoArr.length; i++){
        let {x, y, color, value, event} = undoArr[i];  
        tool.strokeStyle = color;
        tool.lineWidth = value;
        if(event == "mousedown"){
            tool.beginPath();
            tool.moveTo(x,y);
        }else{
            tool.lineTo(x,y);
            tool.stroke();
        }
    }
}