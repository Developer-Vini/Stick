const mural = document.getElementById("mural");
const stickerList = document.getElementById("stickerList");
const nameModal = document.getElementById("nameModal");
const usernameInput = document.getElementById("username");
const cancelButton = document.getElementById("cancelButton");
const confirmButton = document.getElementById("confirmButton");
const columns = 10;
const rows = 6;
const cellWidth = 100
const cellHeight = 100;
let selectedSticker = null;
let selectedCell = null;
const occupiedCells = new Set();

const stickers = [
    "sticker0.webp",
    "sticker1.webp",
    "sticker2.webp",
    "sticker3.webp",
    "sticker4.webp",
];

stickers.forEach(stickerFile => {
    const image = document.createElement("img");

    image.src = `stickers/${stickerFile}`;
    image.classList.add("sticker-option");
    image.alt = stickerFile;


    image.addEventListener("click", () => {

        document
            .querySelectorAll(".sticker-option")
            .forEach(option => {

                option.classList.remove("selected");

            });


        image.classList.add("selected");
        selectedSticker = stickerFile;


        console.log("Selected sticker:", selectedSticker);
    });

    stickerList.appendChild(image);
});

for (let row = 0; row < rows; row++) {

    for (let column = 0; column < columns; column++) {

        const cell = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );

        cell.setAttribute("x", column * cellWidth);
        cell.setAttribute("y", row * cellHeight);
        cell.setAttribute("width", cellWidth);
        cell.setAttribute("height", cellHeight);
        cell.classList.add("cell");
        cell.addEventListener("click", () => {

            const cellId = `${row}-${column}`;

            if (occupiedCells.has(cellId)) {
                return;
            }
            if (!selectedSticker) {
                alert("Choose a sticker first.");
                return;
            }

            selectedCell = {
                row: row,
                column: column,
                element: cell

            };

            nameModal.classList.remove("hidden");
            usernameInput.focus();
        });
        mural.appendChild(cell);

    }

}

confirmButton.addEventListener("click", () => {

    const username = usernameInput.value.trim();

    if (username === "") {
        return;
    }

    if (!selectedCell) {
        return;
    }

    const cellId = `${selectedCell.row}-${selectedCell.column}`;

    occupiedCells.add(cellId);

    placeSticker(
        selectedCell,
        username,
        selectedSticker
    );

    nameModal.classList.add("hidden");

    usernameInput.value = "";
    selectedCell = null;

});

cancelButton.addEventListener("click", () => {
    nameModal.classList.add("hidden");
    usernameInput.value = "";
    selectedCell = null;

});

function placeSticker(
    cell,
    username,
    stickerFile
) {

    const x = Number(cell.element.getAttribute("x"));
    const y = Number(cell.element.getAttribute("y"));

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    group.classList.add("placed-sticker");

    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");

    image.setAttribute("href", `stickers/${stickerFile}`);
    image.setAttribute("x", x + 10);
    image.setAttribute("y", y + 10);
    image.setAttribute("width", cellWidth - 20);
    image.setAttribute("height", cellHeight - 30);
    image.setAttribute("preserveAspectRatio", "xMidYMid meet");


    const name = document.createElementNS("http://www.w3.org/2000/svg", "text");
    name.setAttribute("x", x + cellWidth / 2);
    name.setAttribute("y", y + cellHeight - 8);
    name.setAttribute("text-anchor", "middle");
    name.classList.add("sticker-name");
    name.textContent = username;

    group.appendChild(image)
    group.appendChild(name);

    mural.appendChild(group);

}