// ==============================
// 1. 原本的角色
// ==============================
let orig_walkSheet;
const ORIG_WALK_FRAMES = 8;
let orig_walkFrameW = 0;
let orig_walkFrameH = 0;

let orig_runSheet;
const ORIG_RUN_FRAMES = 22;
let orig_runFrameW = 0;
let orig_runFrameH = 0;

let orig_xPos = 0;
let orig_yPos = 0;
let orig_baseY = 0; 
const ORIG_SPEED = 4;
let orig_dir = 1; 

let orig_isRunning = false;
let orig_runFrameIndex = 0;
const ORIG_RUN_BOB_AMPLITUDE = 30;
let orig_isMoving = false; 

// ==============================
// 2. 男角1 (新增梳頭動畫變數)
// ==============================
let new_walkSheet, new_runSheet, new_combSheet; // *** 新增 new_combSheet ***
const NEW_WALK_FRAMES = 9;
const NEW_RUN_FRAMES = 12;
const NEW_COMB_FRAMES = 14; // *** 男角1梳頭幀數 ***
let new_walkFrameW = 0;
let new_walkFrameH = 0;
let new_runFrameW = 0;
let new_runFrameH = 0;
let new_combFrameW = 0; // *** 新增幀寬 ***
let new_combFrameH = 0; // *** 新增幀高 ***

let new_xPos = 0;
let new_yPos = 0;
let new_baseY = 0; 
const NEW_SPEED = 4;
const NEW_RUN_BOB_AMPLITUDE = 20;
let new_dir = 1; 

let new_isRunning = false;
let new_runFrameIndex = 0;
let new_isMoving = false; 

// ==============================
// 3. 男角2
// ==============================
let third_walkSheet, third_runSheet;
const THIRD_WALK_FRAMES = 8;
const THIRD_RUN_FRAMES = 5;
let third_walkFrameW = 0;
let third_walkFrameH = 0;
let third_runFrameW = 0;
let third_runFrameH = 0;

let third_xPos = 0;
let third_yPos = 0;
let third_baseY = 0;
const THIRD_SPEED = 4;
const THIRD_RUN_BOB_AMPLITUDE = 15;
let third_dir = 1; 

let third_isRunning = false;
let third_runFrameIndex = 0;
let third_isMoving = false; 

// ==============================
// 4. 共用設定
// ==============================
function preload() {
  orig_walkSheet = loadImage('圖片/走路/走路.png');
  orig_runSheet = loadImage('圖片/跑步/跑步.png');
  
  new_walkSheet = loadImage('圖片/男角1走路/男角1走路.png');
  new_runSheet = loadImage('圖片/男角1跑步/男角1跑步.png');
  new_combSheet = loadImage('圖片/男角1停下來梳頭/男角1停下來梳頭.png'); // *** 載入梳頭圖集 ***
  
  third_walkSheet = loadImage('圖片/男角2走路/男角2走路.png');
  third_runSheet = loadImage('圖片/男角2跑步/男角2跑步.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  imageMode(CENTER);

  // --- 尺寸計算 (省略不變的部分) ---
  if (orig_walkSheet) {
    orig_walkFrameW = floor(orig_walkSheet.width / ORIG_WALK_FRAMES);
    orig_walkFrameH = orig_walkSheet.height;
  }
  if (orig_runSheet) {
    orig_runFrameW = floor(orig_runSheet.width / ORIG_RUN_FRAMES);
    orig_runFrameH = orig_runSheet.height;
  }
  if (new_walkSheet) {
    new_walkFrameW = floor(new_walkSheet.width / NEW_WALK_FRAMES);
    new_walkFrameH = new_walkSheet.height;
  }
  if (new_runSheet) {
    new_runFrameW = floor(new_runSheet.width / NEW_RUN_FRAMES);
    new_runFrameH = new_runSheet.height;
  }
  // *** 計算男角1梳頭幀寬高 ***
  if (new_combSheet) {
    new_combFrameW = floor(new_combSheet.width / NEW_COMB_FRAMES);
    new_combFrameH = new_combSheet.height;
  }
  
  if (third_walkSheet) {
    third_walkFrameW = floor(third_walkSheet.width / THIRD_WALK_FRAMES);
    third_walkFrameH = third_walkSheet.height;
  }
  if (third_runSheet) {
    third_runFrameW = floor(third_runSheet.width / THIRD_RUN_FRAMES);
    third_runFrameH = third_runSheet.height;
  }

  // --- 初始化位置 (維持並排) ---
  let commonY = height / 2;
  let totalCharacterWidth = orig_walkFrameW + new_walkFrameW + third_walkFrameW + 100;
  let startX = width / 2 - totalCharacterWidth / 2;

  orig_xPos = startX + orig_walkFrameW / 2;
  orig_yPos = commonY;
  orig_baseY = orig_yPos;

  new_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW / 2;
  new_yPos = commonY;
  new_baseY = new_yPos;

  third_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW + 50 + third_walkFrameW / 2;
  third_yPos = commonY;
  third_baseY = third_yPos;
}

function draw() {
  background('#F0CEA0');

  // ==============================
  // 獨立控制邏輯
  // ==============================

  // === 角色 1 (Original) 控制：箭頭鍵 ===
  orig_isMoving = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW);
  if (keyIsDown(LEFT_ARROW)) {
    orig_xPos -= ORIG_SPEED;
    orig_dir = -1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    orig_xPos += ORIG_SPEED;
    orig_dir = 1;
  }

  // === 角色 2 (男角1) 控制：A/D 鍵 ===
  new_isMoving = keyIsDown('A'.charCodeAt(0)) || keyIsDown('D'.charCodeAt(0));
  if (keyIsDown('A'.charCodeAt(0))) {
      new_xPos -= NEW_SPEED;
      new_dir = -1;
  } else if (keyIsDown('D'.charCodeAt(0))) {
      new_xPos += NEW_SPEED;
      new_dir = 1;
  }

  // === 角色 3 (男角2) 控制：J/L 鍵 ===
  third_isMoving = keyIsDown('J'.charCodeAt(0)) || keyIsDown('L'.charCodeAt(0));
  if (keyIsDown('J'.charCodeAt(0))) {
      third_xPos -= THIRD_SPEED;
      third_dir = -1;
  } else if (keyIsDown('L'.charCodeAt(0))) {
      third_xPos += THIRD_SPEED;
      third_dir = 1;
  }

  // 限制三個角色位置不超出畫布
  orig_xPos = constrain(orig_xPos, 50, width - 50);
  new_xPos = constrain(new_xPos, 50, width - 50);
  third_xPos = constrain(third_xPos, 50, width - 50);
  
  // ==============================
  // 繪製 
  // ==============================
  drawOriginalCharacter();
  drawNewCharacter();
  drawThirdCharacter();
}


// --- 函式：繪製原本的角色 (邏輯不變) ---
function drawOriginalCharacter() {
  // 1. 跑步動畫
  if (orig_isRunning && orig_runSheet) {
    const currentFrame = orig_runFrameIndex;
    const sx = currentFrame * orig_runFrameW;

    const progress = orig_runFrameIndex / ORIG_RUN_FRAMES;
    let drawY = orig_baseY + sin(progress * TWO_PI) * ORIG_RUN_BOB_AMPLITUDE;

    push();
    translate(orig_xPos, drawY);
    scale(orig_dir, 1);
    image(orig_runSheet, 0, 0, orig_runFrameW, orig_runFrameH, sx, 0, orig_runFrameW, orig_runFrameH);
    pop();

    orig_runFrameIndex++;
    if (orig_runFrameIndex >= ORIG_RUN_FRAMES) {
      orig_isRunning = false;
      orig_runFrameIndex = 0;
      orig_yPos = orig_baseY;
    }
  } 
  // 2. 走路動畫
  else if (orig_isMoving && orig_walkSheet) {
    const currentFrame = floor(frameCount % ORIG_WALK_FRAMES);
    const sx = currentFrame * orig_walkFrameW;

    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_walkSheet, 0, 0, orig_walkFrameW, orig_walkFrameH, sx, 0, orig_walkFrameW, orig_walkFrameH);
    pop();
  }
  // 3. 靜止 (顯示走路第 0 幀)
  else if (orig_walkSheet) {
      const sx = 0; 
      
      push();
      translate(orig_xPos, orig_baseY);
      scale(orig_dir, 1);
      image(orig_walkSheet, 0, 0, orig_walkFrameW, orig_walkFrameH, sx, 0, orig_walkFrameW, orig_walkFrameH);
      pop();
  }
}

// --- 函式：繪製男角1 (新增梳頭邏輯) ---
function drawNewCharacter() {
  // 1. 跑步動畫
  if (new_isRunning && new_runSheet) {
    const currentFrame = new_runFrameIndex;
    const sx = currentFrame * new_runFrameW;

    const progress = new_runFrameIndex / NEW_RUN_FRAMES;
    let drawY = new_baseY + sin(progress * TWO_PI) * NEW_RUN_BOB_AMPLITUDE;

    push();
    translate(new_xPos, drawY);
    scale(new_dir, 1);
    image(new_runSheet, 0, 0, new_runFrameW, new_runFrameH, sx, 0, new_runFrameW, new_runFrameH);
    pop();

    new_runFrameIndex++;
    if (new_runFrameIndex >= NEW_RUN_FRAMES) {
      new_isRunning = false;
      new_runFrameIndex = 0;
      new_yPos = new_baseY;
    }
  } 
  // 2. 走路動畫
  else if (new_isMoving && new_walkSheet) {
    const currentFrame = floor(frameCount % NEW_WALK_FRAMES);
    const sx = currentFrame * new_walkFrameW;

    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_walkSheet, 0, 0, new_walkFrameW, new_walkFrameH, sx, 0, new_walkFrameW, new_walkFrameH);
    pop();
  }
  // 3. 靜止時的梳頭動畫 (Idle Combing) - 優先級高於走路第 0 幀
  else if (!new_isMoving && !new_isRunning && new_combSheet) { // *** 新增梳頭邏輯 ***
      // 持續播放梳頭循環動畫
      const currentFrame = floor(frameCount % NEW_COMB_FRAMES);
      const sx = currentFrame * new_combFrameW;

      push();
      translate(new_xPos, new_baseY);
      scale(new_dir, 1);
      image(new_combSheet, 0, 0, new_combFrameW, new_combFrameH, sx, 0, new_combFrameW, new_combFrameH);
      pop();
  }
  // 4. (備用) 靜止不動 - 只有在沒有梳頭圖集的情況下才會顯示走路第 0 幀
  else if (new_walkSheet) {
      const sx = 0;
      
      push();
      translate(new_xPos, new_baseY);
      scale(new_dir, 1);
      image(new_walkSheet, 0, 0, new_walkFrameW, new_walkFrameH, sx, 0, new_walkFrameW, new_walkFrameH);
      pop();
  }
}

// --- 函式：繪製男角2 (邏輯不變) ---
function drawThirdCharacter() {
  // 1. 跑步動畫
  if (third_isRunning && third_runSheet) {
    const currentFrame = third_runFrameIndex;
    const sx = currentFrame * third_runFrameW;

    const progress = third_runFrameIndex / THIRD_RUN_FRAMES;
    let drawY = third_baseY + sin(progress * TWO_PI) * THIRD_RUN_BOB_AMPLITUDE;

    push();
    translate(third_xPos, drawY);
    scale(third_dir, 1);
    image(third_runSheet, 0, 0, third_runFrameW, third_runFrameH, sx, 0, third_runFrameW, third_runFrameH);
    pop();

    third_runFrameIndex++;
    if (third_runFrameIndex >= THIRD_RUN_FRAMES) {
      third_isRunning = false;
      third_runFrameIndex = 0;
      third_yPos = third_baseY;
    }
  } 
  // 2. 走路動畫
  else if (third_isMoving && third_walkSheet) {
    const currentFrame = floor(frameCount % THIRD_WALK_FRAMES);
    const sx = currentFrame * third_walkFrameW;

    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_walkSheet, 0, 0, third_walkFrameW, third_walkFrameH, sx, 0, third_walkFrameW, third_walkFrameH);
    pop();
  }
  // 3. 靜止 (顯示走路第 0 幀)
  else if (third_walkSheet) {
      const sx = 0; 
      
      push();
      translate(third_xPos, third_baseY);
      scale(third_dir, 1);
      image(third_walkSheet, 0, 0, third_walkFrameW, third_walkFrameH, sx, 0, third_walkFrameW, third_walkFrameH);
      pop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 重設位置
  let commonY = height / 2;
  let totalCharacterWidth = orig_walkFrameW + new_walkFrameW + third_walkFrameW + 100;
  let startX = width / 2 - totalCharacterWidth / 2;

  orig_xPos = startX + orig_walkFrameW / 2;
  orig_yPos = commonY;
  orig_baseY = orig_yPos;

  new_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW / 2;
  new_yPos = commonY;
  new_baseY = new_yPos;
  
  third_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW + 50 + third_walkFrameW / 2;
  third_yPos = commonY;
  third_baseY = third_yPos;
}

function keyPressed() {
  // 角色 1 (Original) - SPACE
  if (key === ' ' || keyCode === 32) {
    if (!orig_isRunning && orig_runSheet) {
      orig_isRunning = true;
      orig_runFrameIndex = 0;
      orig_baseY = orig_yPos;
    }
  }
  
  // 角色 2 (男角1) - W
  if (key.toUpperCase() === 'W') {
    if (!new_isRunning && new_runSheet) {
      new_isRunning = true;
      new_runFrameIndex = 0;
      new_baseY = new_yPos;
    }
  }
  
  // 角色 3 (男角2) - I
  if (key.toUpperCase() === 'I') {
    if (!third_isRunning && third_runSheet) {
      third_isRunning = true;
      third_runFrameIndex = 0;
      third_baseY = third_yPos;
    }
  }
}