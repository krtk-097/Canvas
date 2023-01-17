drawing("black", value);

pencilBtn.addEventListener("click", function () {
    let isActive = pencilBtn.classList.contains("active_tool");
    if (!isActive) {
        pencilBtn.classList.add("active_tool")
        dropdown.style.left = 0;
        activeTool = "pencil";
    }
    else {
        pencilBtn.classList.remove("active_tool")
        dropdown.style.left = -30 + "vh";
    }
})
 
for (let i = 0; i < color.length; i++) {
    color[i].addEventListener("click", function () {
        color.forEach((col) => {
            col.classList.remove("active_color");
        })
        color[i].classList.add("active_color");
        current_color = color[i].classList[0];  
        drawing(current_color, value);
        pencilBtn.classList.remove("active_tool")
        dropdown.style.left = -30 + "vh";
    })
}

pSlider.addEventListener("change", function () {
    value = pSlider.value;
    drawing(color, value);
    pencilBtn.classList.remove("active_tool")
    dropdown.style.left = -30 + "vh";
})

eraserBtn.addEventListener("click", function () {
    let isActive = eraserBtn.classList.contains("active_tool");
    if (!isActive) {
        eraserBtn.classList.add("active_tool");
        dropdownEraser.style.left = 0;
        activeTool = "eraser";
    }
    else {
        eraserBtn.classList.remove("active_tool")
        dropdownEraser.style.left = -30 + "vh";
        activeTool = "pencil";
    }
})

eSlider.addEventListener("change", function () {
    value = eSlider.value;
    drawing(color, value);
    eraserBtn.classList.remove("active_tool")
    dropdownEraser.style.left = -30 + "vh";
})
