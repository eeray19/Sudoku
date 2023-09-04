
var numSelected = null;
var tileSelected = null;
var filledTiles = 0; // number of correctly filled tiles
var shouldbefilled = 0; // number of -s in the board
var hatalar = 0; 

var filledCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() { //when window object has finished loading, setGame is executed. onload() is used in order to ensure setGame is executed 
    setGame();               //only after entire web page and its associated resources have loaded
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    for (let r = 0; r < 9; r++) { //find how many empty spaces 
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === "-") {
                shouldbefilled += 1;
            }

            else { // if tile not empty, fill the array of filled nums
                filledCounts[(board[r][c])-1] += 1;
            }
        }
    }

    console.log(filledCounts)

}

function selectNumber(){ //alttaki rakamlardan seçim yap
    if (numSelected != null) { // yeni bir rakam seçileceğinde daha önce seçilen varsa 
        numSelected.classList.remove("number-selected"); // gri olmaktan çıkar
    }

    numSelected = this; // basılan rakamı seç
    numSelected.classList.add("number-selected"); //css'teki class'ı ekleyip gri yap
}

function selectTile() { //boş tile'a tıklayıp rakam ile doldurmak için
    if (numSelected) { //rakam seçimi yapıldıysa
        if (this.innerText != "") { //zaten doldurulduysa overwritelama
            return;
        }

        // "0-0" "0-1" .. "3-1"
        // koordinatları id kullanarak al, default olarak array içine alınır
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) { //rakam doğruysa
            this.innerText = numSelected.id;  //karenin içine sayıyı yaz
            filledTiles +=1;


            filledCounts[parseInt(numSelected.id) - 1] += 1;
            if (isNumberCompleted(parseInt(numSelected.id) - 1)) {
                numSelected.classList.add("number-completed");
            }

            if (isPuzzleCompleted()) {
                document.getElementById("hatalar").innerText = `Tebrikler! Bulmacayı ${hatalar} hata ile tamamladınız.`;
            }


        }
        else {
            hatalar += 1;
            document.getElementById("hatalar").innerText = `Hata Sayısı: ${hatalar}`;


            // Add the animation class dynamically
            this.style.animation = "fadeOut 2s forwards";
            // Remove the animation class after the animation completes
            this.addEventListener("animationend", function () {
                this.style.animation = ""; // Remove the animation
            }.bind(this));

        }
    }
}

function isPuzzleCompleted() {
    if (shouldbefilled == filledTiles ) {
        return true;
    }
}

function isNumberCompleted(number) {
    if(filledCounts[number] == 9) {
        return true;
    }
}
