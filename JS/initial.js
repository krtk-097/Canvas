//--------------------- MAIN AREA ----------------------
let body = document.body;
let headingBar = document.querySelector(".heading_container");
let newBtn = document.querySelector(".new");
let canvasArea = document.querySelector(".canvas_area");
let canvas = document.querySelector("#canvas");
let tool = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//find line cap on net
tool.lineCap = 'round';
let value = 3;
tool.lineWidth = value;
window.addEventListener("resize", function () { 
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

//--------------------- TOOLS ----------------------
//pencil
let pencilBtn = document.querySelector(".pencil");
let dropdown = document.querySelector(".dropdown_pencil");
let color = document.querySelectorAll("#option");
let pSlider = document.querySelector("#pSlider");
let current_color;

//eraser
let dropdownEraser = document.querySelector(".dropdown_eraser");
let eraserBtn = document.querySelector(".eraser");
let eSlider = document.querySelector("#eSlider");
let activeTool = "pencil";

//notes
let notesBtn = document.querySelector(".notes");
let dropdownNote = document.querySelector(".dropdown_note");
let noteColor = document.querySelectorAll(".noteOption");

//shape
let shapeBtn = document.querySelector(".shape");
let dropdownShape = document.querySelector(".dropdown_shape");
let shapetype = document.querySelectorAll(".shape_icon");
let shapeColor = document.querySelectorAll(".shapeOption");
let activeShapeColor = "black";  
let type = "square" 

let uploadBtn = document.querySelector(".upload");
let downloadBtn = document.querySelector(".download");
let colorArr = ["pink", "lightred", "yellow", "lightblue", "lightgreen"]; 

let undoBtn = document.querySelector(".undo");
let redoBtn = document.querySelector(".redo");
let undoArr = [];
let redoArr = [];
let interval = null;

let zoomInBtn = document.querySelector(".zoom_in");
let zoomOutBtn = document.querySelector(".zoom_out");
zoomLevel = 1;

function drawing(color, value) {
    let isMousedown = false;
    canvasArea.addEventListener("mousedown", function (e) {
        let x = e.clientX;
        let y = e.clientY;
        y = getCoordinate(y);
        let points = {
            "x": x,
            "y": y,
            "value": value,
            "color": color,
            "event": "mousedown"
        }
        tool.beginPath();
        tool.moveTo(x, y);
        isMousedown = true;
        undoArr.push(points);
    })

    canvasArea.addEventListener("mousemove", function (e) {
        //mousemove function in js
        let x = e.clientX;
        let y = e.clientY;
        y = getCoordinate(y);
        if (isMousedown == true) {
            if (activeTool == "pencil") {
                tool.globalCompositeOperation = 'source-over';
                tool.strokeStyle = color;
                tool.lineWidth = value;
                let points = {
                    "x": x,
                    "y": y,
                    "value": value,
                    "color": color,
                    "event": "mousemove"
                }
                undoArr.push(points);
                tool.lineTo(x, y);
                tool.stroke();
            }
            else if (activeTool == "eraser") {
                tool.globalCompositeOperation = 'destination-out';
                tool.lineWidth = value;
                tool.lineTo(x, y);
                tool.stroke();
            }
            else if (activeTool == "note") {
                tool.strokeStyle = "rgba(0,0,0,0)"
            }
        }
    })

    canvasArea.addEventListener("mouseup", function (e) {
        tool.stroke();
        isMousedown = false;
    })
}

function getCoordinate(initalY) {
    let obj = headingBar.getBoundingClientRect();
    return initalY - obj.height;
}

newBtn.addEventListener("click", function () {
    tool.clearRect(0, 0, canvas.width, canvas.height);

    // removing all notes
    let notes = document.querySelectorAll(".sticky_notes");
    if (notes) {
        for (let i = 0; i < notes.length; i++)
            notes[i].remove();
    }

    // removing all images
    let image = document.querySelectorAll(".image_box");
    if (image) {
        for (let i = 0; i < image.length; i++)
            image[i].remove();
    }
})