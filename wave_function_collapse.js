const tiles = [];
const tileImages = [];

let grid = [];

const DIM = 40;

function preload() {
    const path = "dungeon";
    for (let i = 0; i < 41; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`)
    }
}


function setup() {
    createCanvas(1200,1200);

rotated
    tiles[0] = new Tile(tileImages[0], ["CCC","ABB","BBA","CCC"]);
    tiles[1] = new Tile(tileImages[1], ["ABB","BBB","BBA","CCC"]);
    tiles[2] = new Tile(tileImages[2], ["CCC","ABB","BBB","BBA"]);
    tiles[3] = new Tile(tileImages[3], ["CCC","ABB","BBB","BBA"]);
    tiles[4] = new Tile(tileImages[4], ["CCC","ABB","BBB","BBA"]);
    tiles[5] = new Tile(tileImages[5], ["CCC","CCC","ABB","BBA"]);
    tiles[7] = new Tile(tileImages[7], ["ABB","BBB","BBA","CCC"]);
    tiles[8] = new Tile(tileImages[8], ["ABB","BBB","BBA","CCC"]);
    tiles[9] = new Tile(tileImages[9], ["ABB","BBA","CCC","CCC"]);
    tiles[10] = new Tile(tileImages[10], ["BBB","BBA","CCC","ABB"]);
    tiles[11] = new Tile(tileImages[11], ["BBB","BBA","CCC","ABB"]);
    tiles[12] = new Tile(tileImages[12], ["BBB","BBB","BBB","BBB"]);
    tiles[13] = new Tile(tileImages[13], ["BBA","CCC","ABB","BBB"]);
    tiles[14] = new Tile(tileImages[14], ["BBA","CCC","ABB","BBB"]);
    tiles[15] = new Tile(tileImages[15], ["BBA","CCC","ABB","BBB"]);
    tiles[16] = new Tile(tileImages[16], ["BBB","BBA","CCC","ABB"]);
    tiles[17] = new Tile(tileImages[17], ["BBA","CCC","CCC","ABB"]);

    tiles[19] = new Tile(tileImages[19], ["BBB","BBA","ABB","BBB"]);
    tiles[20] = new Tile(tileImages[20], ["BBB","BBB","BBA","ABB"]);
    tiles[21] = new Tile(tileImages[21], ["ABB","BBB","BBB","BBA"]);
    tiles[22] = new Tile(tileImages[22], ["BBA","ABB","BBB","BBB"]);
    tiles[23] = new Tile(tileImages[23], ["BBB","BBB","BBB","BBB"]);
    tiles[24] = new Tile(tileImages[24], ["BBB","BDD","EEB","BBB"]);
//non-rotated
    tiles[6] = new Tile(tileImages[6], ["BBB","BBB","BBB","BBB"]);
    tiles[18] = new Tile(tileImages[18], ["CCC","CCC","CCC","CCC"]);
    tiles[40] = new Tile(tileImages[40], ["HHH","HHH","HHH","HHH"]);
    tiles[25] = new Tile(tileImages[25], ["BEE","DBB","BBB","BBB"]);
    tiles[26] = new Tile(tileImages[26], ["BBB","BBB","BEE","DDB"]);
    tiles[27] = new Tile(tileImages[27], ["EEB","BBB","BBB","BBD"]);
    tiles[28] = new Tile(tileImages[28], ["BBB","BBB","BBB","BBB"]);
    tiles[29] = new Tile(tileImages[29], ["BBB","BBB","BBB","BBB"]);
    tiles[30] = new Tile(tileImages[30], ["BBB","BBB","BBB","BBB"]);
    tiles[31] = new Tile(tileImages[31], ["BBB","BBB","BBB","BBB"]);
    tiles[32] = new Tile(tileImages[32], ["BBB","BBB","BBB","BBB"]);
    tiles[33] = new Tile(tileImages[33], ["BBB","BBB","BBB","BBB"]);
//Pit
    tiles[34] = new Tile(tileImages[34], ["BBB","BBH","HHB","BBB"]);
    tiles[35] = new Tile(tileImages[35], ["BBB","BBB","BHH","HBB"]);
    tiles[36] = new Tile(tileImages[36], ["HHB","BBB","BBB","BBH"]);
    tiles[37] = new Tile(tileImages[37], ["BHH","HBB","BBB","BBB"]);
    tiles[38] = new Tile(tileImages[38], ["HHH","HBB","BBB","BBH"]);
    tiles[39] = new Tile(tileImages[39], ["BBB","BBH","HHH","HBB"]);




    for (let i = 0; i < 25; i++) {
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

function mousePressed() {
    redraw();
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