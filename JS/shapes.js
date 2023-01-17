

shapeBtn.addEventListener("click", function () {
    let isActive = shapeBtn.classList.contains("active_tool");
    if (!isActive) {
        shapeBtn.classList.add("active_tool")
        dropdownShape.style.left = 0;
        canvasArea.addEventListener("click", addEvent)
    }
    else {
        shapeBtn.classList.remove("active_tool");
        dropdownShape.style.left = -30 + "vh";
        canvasArea.removeEventListener("click", addEvent)
    }
})
// will select the desired shape " type = shapetype[i].classList[0];" will
// let  choose the shape , it will return the first class which is square,circle
for(let i = 0; i < shapetype.length; i++){
    shapetype[i].addEventListener("click",function(){
        shapetype.forEach((type)=>{
            type.classList.remove("active_shape");
        })
        type = shapetype[i].classList[0];
        shapetype[i].classList.add("active_shape");
    })
}

// will assign the desired colour
for (let i = 0; i < shapeColor.length; i++) {
    shapeColor[i].addEventListener("click", function (e) {
        activeShapeColor = shapeColor[i].classList[0];
    })
}

function addEvent(e) {
    let x = e.clientX;
    let y = e.clientY;
    y = getCoordinate(y)
    tool.beginPath();
    tool.strokeStyle = activeShapeColor;
    if(type == "square"){
        tool.rect(x, y, 200, 200);
        tool.stroke();
    }
    else if(type == "circle"){
        tool.arc(x, y, 100, 0, 2 * Math.PI);
        tool.stroke();
    }
    else if(type == "fillcircle"){
        tool.fillStyle = activeShapeColor;
        tool.arc(x, y, 100, 0, 2 * Math.PI);
        tool.fill();
    }
    else if(type == "fillsquare"){
        tool.fillStyle = activeShapeColor;
        tool.rect(x, y, 200, 200);
        tool.fill();
    }
}


//============= DARK AND LIGHT THEME======================

document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.setAttribute("data-theme", "dark");
  });

 document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.setAttribute("data-theme", "light");

    // Get our button switcher
    var themeSwitcher = document.getElementById("theme-switcher");

    // When our button gets clicked
    themeSwitcher.onclick = function() {
      // Get the current selected theme, on the first run
      // it should be `light`
      var currentTheme = document.documentElement.getAttribute("data-theme");
       var themeName=document.getElementById("theme-switcher").innerHTML;
       
      // Switch between `dark` and `light`
      var switchToTheme = currentTheme === "dark" ? "light" : "dark";
      var switchThemeName=themeName==="DARK" ? "LIGHT" : "DARK";
      document.getElementById("theme-switcher").innerHTML=switchThemeName;
      // Set our currenet theme to the new one
      document.documentElement.setAttribute("data-theme", switchToTheme);
    }
  });