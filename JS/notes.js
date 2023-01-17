notesBtn.addEventListener("click", function () {
    let isActive = notesBtn.classList.contains("active_tool");
    if (!isActive) {
        notesBtn.classList.add("active_tool")
        dropdownNote.style.left = 0;
        activeTool = "notes";
    }
    else {
        notesBtn.classList.remove("active_tool")
        dropdownNote.style.left = -30 + "vh";
    }
});

for (let i = 0; i < noteColor.length; i++) {
    noteColor[i].addEventListener("click", function (e) {
        let NoteColor = noteColor[i].classList[0];
        createTask(NoteColor);
        dropdownNote.style.left = -30 + "vh";
        notesBtn.classList.remove("active_tool");
    })
}

function createTask(color) {
    let stickyPad = document.createElement("div");
    stickyPad.setAttribute("class", "sticky_notes");
    stickyPad.innerHTML = `
    <div class="navBar">
        <div class="minimise nIcon">
            <i class="fas fa-window-minimize"></i>
        </div>
        <div class="delete nIcon">
            <i class="fas fa-times"></i>
        </div>
    </div>
    <div class="mainArea ${color}">
        <h2 contenteditable = "true">Title</h2>
        <div class = "textArea" contenteditable = "true"></div>
    </div>`
    canvasArea.appendChild(stickyPad);

    let mainArea = stickyPad.querySelector(".mainArea")
    let minimise = stickyPad.querySelector(".minimise");
    minimise.addEventListener("click", function () {
        let isActive = minimise.classList.contains("activeNIcon")
        if (!isActive) {
            minimise.classList.add("activeNIcon");
            mainArea.style.display = "none";
        }
        else {
            minimise.classList.remove("activeNIcon");
            mainArea.style.display = "block";
        }
    });

    let deleteNote = stickyPad.querySelector(".delete");
    deleteNote.addEventListener("click", function () {
        stickyPad.remove();
    })

    let navBar = stickyPad.querySelector(".navBar");
    navBar.addEventListener("click", function (e) {
        activeTool = "notes";
        dragNote(e);
    })
    navBar.click(); // to activate drag option
}

function dragNote(e, type) {
    tool.strokeStyle = "rgba(0,0,0,0)"; // to remove pencil marks
    let stickyPad
    if(type != "image"){
        stickyPad = e.currentTarget.parentNode;
    }
    else{
        stickyPad = e.currentTarget.parentNode.parentNode;
    }
    let offset = [0, 0];
    let isDown = false;
    stickyPad.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            stickyPad.offsetLeft - e.clientX,
            stickyPad.offsetTop - e.clientY
        ];
    }, true);

    canvasArea.addEventListener('mousemove', function (e) {
        if (isDown) {
            stickyPad.style.left = (e.clientX + offset[0]) + 'px';
            stickyPad.style.top = (e.clientY + offset[1]) + 'px';
        }
    }, true);

    canvasArea.addEventListener('mouseup', function () {
        isDown = false;
    }, true);

}