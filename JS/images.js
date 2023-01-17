downloadBtn.addEventListener("click", function () {
    tool.globalCompositeOperation = 'hue';
    let link = canvas.toDataURL();
    let anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = "file.png";
    anchor.click();
    anchor.remove();
})

let imageInput = document.querySelector(".image_input");
uploadBtn.addEventListener("click", function () {
    imageInput.click();
})

imageInput.addEventListener("change", function (e) {
    let display = createImageBox();
    let img = document.createElement("img");
    let src = URL.createObjectURL(e.target.files[0]);
    img.src = src;
    display.appendChild(img);
})

function createImageBox() {
    let idx = 1;  // to know the image bg color
    let imageBox = document.createElement("div");
    imageBox.setAttribute("class", "image_box");
    imageBox.classList.add("pink");
    imageBox.innerHTML = `
    <div class="imgArea">
        <div class="image_container"></div>
        <div class="imgNavBar">
            <div class="delete imgIcon">
                <i class="fas fa-times"></i>
            </div>
            <div class="imgColor imgIcon">
                <i class="fas fa-tint"></i>
            </div>
            <div class="down imgIcon">
            <i class="fas fa-caret-down"></i>
            </div>
        </div>
    </div>
    <div class="imgText" contenteditable= "true">
        
    </div>
    `
    canvasArea.appendChild(imageBox);
    // delete the container
    let deleteNote = imageBox.querySelector(".delete");
    deleteNote.addEventListener("click", function () {
        imageBox.remove();
    })
    
    // to  change the color of the container
    let changeColor = imageBox.querySelector(".imgColor");
    changeColor.addEventListener("click", function () {
        console.log("click")
        imageBox.classList.remove(imageBox.classList[1]);
        imageBox.classList.add(colorArr[idx++]);
        idx = idx % colorArr.length;
    })
    
    // to add the text conatainer
    let down = imageBox.querySelector(".down");
    let textContainer = imageBox.querySelector(".imgText");
    let select = false;
    down.addEventListener("click", function(){
        if(select == false){
            textContainer.style.display = "block";
            select = true;
        }else{
            textContainer.style.display = "none";
            select = false;
        }
    })
    
    // to drag the container
    let imgNavBar = imageBox.querySelector(".imgNavBar");
    imgNavBar.addEventListener("click", function(e){
        activeTool = "notes"; 
        dragNote(e, "image");
    })

    // so that image can be attached to the container
    let imgContainer = imageBox.querySelector(".image_container");
    return imgContainer;
}