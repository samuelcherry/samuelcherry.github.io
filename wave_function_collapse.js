const tiles = [];
const tileImages = [];

let grid = [];

const DIM = 20;
const canvasSize = 600;

function preload() {
    const path = "dungeon";
    for (let i = 0; i < 34; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`)
    }
}

function saveImage(){
    saveCanvas('dungeon.png');
}

function generateImage(){
    location.reload();
}


function setup() {
    createCanvas(canvasSize, canvasSize);

    let buttonGenerate = createButton('generate');
    buttonGenerate.position(-25, 620);
    buttonGenerate.mousePressed(generateImage);

    let buttonExport = createButton('export');
    buttonExport.position(100, 620);
    buttonExport.mousePressed(saveImage);
    

rotate
//TOP
    tiles[0] = new Tile(tileImages[0], ["CCC","ABB","BBB","BBA"]);
    tiles[1] = new Tile(tileImages[1], ["CCC","ABB","BBB","BBA"]);
    tiles[2] = new Tile(tileImages[2], ["CCC","ABB","BBB","BBA"]);
//RIGHT
    tiles[3] = new Tile(tileImages[3], ["BBA","CCC","ABB","BBB"]);
    tiles[4] = new Tile(tileImages[4], ["BBA","CCC","ABB","BBB"]);
    tiles[5] = new Tile(tileImages[5], ["BBA","CCC","ABB","BBB"]);
//DOWN
    tiles[6] = new Tile(tileImages[6], ["BBB","BBA","CCC","ABB"]);
    tiles[7] = new Tile(tileImages[7], ["BBB","BBA","CCC","ABB"]);
    tiles[8] = new Tile(tileImages[8], ["BBB","BBA","CCC","ABB"]);
//RIGHT
    tiles[9] = new Tile(tileImages[9], ["ABB","BBB","BBA","CCC"]);
    tiles[10] = new Tile(tileImages[10], ["ABB","BBB","BBA","CCC"]);
    tiles[11] = new Tile(tileImages[11], ["ABB","BBB","BBA","CCC"]);
//CAVE GROUND
    tiles[12] = new Tile(tileImages[12], ["BBB","BBB","BBB","BBB"]);
//CORNER INSIDE
    tiles[13] = new Tile(tileImages[13], ["CCC","ABB","BBA","CCC"]);
    tiles[14] = new Tile(tileImages[14], ["CCC","CCC","ABB","BBA"]);
    tiles[15] = new Tile(tileImages[15], ["BBA","CCC","CCC","ABB"]);
    tiles[16] = new Tile(tileImages[16], ["ABB","BBA","CCC","CCC"]);
//CORNER OUTSIDE 
    tiles[17] = new Tile(tileImages[17], ["BBB","BBA","ABB","BBB"]);
    tiles[18] = new Tile(tileImages[18], ["BBB","BBB","BBA","ABB"]);
    tiles[19] = new Tile(tileImages[19], ["ABB","BBB","BBB","BBA"]);
    tiles[20] = new Tile(tileImages[20], ["BBA","ABB","BBB","BBB"]);
//COLOR TILES
    tiles[21] = new Tile(tileImages[21], ["BBB","BBB","BBB","BBB"]);
    tiles[22] = new Tile(tileImages[22], ["CCC","CCC","CCC","CCC"]);
    tiles[23] = new Tile(tileImages[23], ["BBB","BBB","BBB","BBB"]);
//CHEST
    tiles[24] = new Tile(tileImages[24], ["BBB","BBD","EBB","BBB"]);
    tiles[25] = new Tile(tileImages[25], ["BBB","BBB","BBE","DBB"]);
    tiles[26] = new Tile(tileImages[26], ["EBB","BBB","BBB","BBD"]);
    tiles[27] = new Tile(tileImages[27], ["BBE","DBB","BBB","BBB"]);
//GROUND ACCENTS
    tiles[28] = new Tile(tileImages[28], ["BBB","BBB","BBB","BBB"]);
    tiles[29] = new Tile(tileImages[29], ["BBB","BBB","BBB","BBB"]);
    tiles[30] = new Tile(tileImages[30], ["BBB","BBB","BBB","BBB"]);
    tiles[31] = new Tile(tileImages[31], ["BBB","BBB","BBB","BBB"]);
    tiles[32] = new Tile(tileImages[32], ["BBB","BBB","BBB","BBB"]);
    tiles[33] = new Tile(tileImages[33], ["BBB","BBB","BBB","BBB"]);

    for (let i = 0; i < 24; i++) {
      for (let j = 1; j < 4; j++) {
        tiles.push(tiles[i].rotate(j));
      }
    }


    for(let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        tile.analyze(tiles);
    }

    startOver();
}


function startOver() {

  for(let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}


function checkValid(arr, valid){
    for (let i = arr.length -1; i >= 0; i--) {
        let element = arr[i];
        if (!valid.includes(element)) {
            arr.splice(i,1);
        }
    }
}




function draw() {
    background(0);
    const w = width/ DIM;
    const h = height / DIM;
    for (let j=0; j < DIM; j++){
        for(let i = 0; i < DIM; i++){
            let cell = grid[i+j * DIM];
            if (cell.collapsed) {
                let index = cell.options[0];
                image(tiles[index].img, i * w, j*h, w, h);
            }else{
                fill(0);
                stroke(255)
                rect(i *w, j * h, w, h);
            }
        }
    }

    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed);

    if(gridCopy.Length == 0){
        return
    }

    gridCopy.sort((a, b) => {
        return a.options.length - b.options.length;
    });

    let len = gridCopy[0].options.length;
    let stopIndex = 0;
    for (let i =1; i < gridCopy.length; i++) {
        if (gridCopy[i].options.length > len) {
            stopIndex = i;
            break;
        }
    }

    if (stopIndex > 0) gridCopy.splice(stopIndex);

    const cell = random(gridCopy);
    cell.collapsed = true;
    const pick = random(cell.options);
    if (pick === undefined) {
        startOver();
        return;
    }
    cell.options = [pick];

    const nextGrid = [];
    for (let j=0; j < DIM; j++){
        for(let i = 0; i < DIM; i++){
            let index = i + j * DIM;
            if (grid[index].collapsed) {
                nextGrid[index] = grid[index];
            }else{
                let options = new Array(tiles.length).fill(0).map((x, i) => i);
                let validOptions = [];
                if(j > 0){
                    let up = grid[i + (j-1) * DIM];
                    for(let option of up.options){
                        let valid = tiles[option].down;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                if(i < DIM - 1){
                    let right = grid[i + 1 + j * DIM];
                    let validOptions = [];
                    for(let option of right.options) {
                        let valid = tiles[option].left;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                if(j < DIM - 1){
                    let down = grid[i + (j + 1) * DIM];
                    let validOptions = [];
                    for(let option of down.options) {
                        let valid = tiles[option].up;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                if(i > 0){
                    let left = grid[i - 1 + j * DIM];
                    let validOptions = [];
                    for(let option of left.options){
                        let valid = tiles[option].right;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }

                nextGrid[index] = new Cell(options);
            }
        }
    }
    grid = nextGrid;
}