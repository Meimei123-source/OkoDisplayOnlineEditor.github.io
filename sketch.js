let scaleSlider, colorSlider, saturationSlider;
let myFont;

function preload() {
  myFont = loadFont('Overpass-Black.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Scale slider to adjust the size of shapes
  scaleSlider = createSlider(0.5, 2, 1, 0.1);
  scaleSlider.position(20, 50);
  scaleSlider.class('pinkSlider'); // Apply custom CSS class

  // Color slider to adjust the color of shapes
  colorSlider = createSlider(0, 255, 0, 1); // RGB values range from 0-255
  colorSlider.position(20, 110);
  colorSlider.class('pinkSlider'); // Apply custom CSS class

  // Saturation slider to adjust the saturation of the color
  saturationSlider = createSlider(0, 255, 255, 1); // Saturation values from 0 (gray) to 255 (full color)
  saturationSlider.position(20, 170);
  saturationSlider.class('pinkSlider'); // Apply custom CSS class
}

function draw() {
  background(235, 235, 224);
  drawShapes();

  textSize(14.5);
  fill(255, 0, 255);
  strokeWeight(0);
  textFont(myFont);
  text("Scale", 20, 40);
  text("Colour", 20, 100);
  text("Saturation", 20, 160);
  text("*Press Return⏎ to Save", 20, 220);
  text("Oko Display ©GuoYu 2024", 20, 615);
}

function drawShapes(buffer = null) {
  let scaleFactor = scaleSlider.value();
  let colorValue = colorSlider.value();
  let saturationValue = saturationSlider.value();

  // Extended color range logic
  let r, g, b;
  if (colorValue < 85) { 
    // Transition from magenta to red
    r = 255;
    g = 0;
    b = map(colorValue, 0, 85, 255, 0);
  } else if (colorValue < 170) {
    // Transition from red to yellow
    r = 255;
    g = map(colorValue, 85, 170, 0, 255);
    b = 0;
  } else if (colorValue < 255) {
    // Transition from yellow to green
    r = map(colorValue, 170, 255, 255, 0);
    g = 255;
    b = 0;
  } else {
    // Transition from green to blue
    r = 0;
    g = map(colorValue, 255, 340, 255, 0); // Assuming a slight overshoot for full green
    b = 255;
  }

  // Apply saturation
  r *= (saturationValue / 255);
  g *= (saturationValue / 255);
  b *= (saturationValue / 255);

  let ctx = buffer || this;
  ctx.stroke(r, g, b);
  ctx.strokeWeight(50 * scaleFactor);
  ctx.noFill();

  let centerX = width / 2.2;
  let centerY = height / 2;

  ctx.line(centerX - 150 * scaleFactor, centerY - 100 * scaleFactor, centerX - 150 * scaleFactor, centerY + 100 * scaleFactor);
  ctx.arc(centerX - 75 * scaleFactor, centerY - 100 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor, 180, 360);
  ctx.arc(centerX - 75 * scaleFactor, centerY + 100 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor, 360, 180);
  ctx.line(centerX + 0, centerY - 100 * scaleFactor, centerX + 0, centerY + 100 * scaleFactor);

  ctx.line(centerX + 100 * scaleFactor, centerY - 175 * scaleFactor, centerX + 100 * scaleFactor, centerY + 175 * scaleFactor);
  ctx.arc(centerX + 175 * scaleFactor, centerY + 100 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor, 90, 180);
  ctx.arc(centerX + 175 * scaleFactor, centerY - 10 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor, 180, 270);

  ctx.ellipse(centerX + 300 * scaleFactor, centerY + 100 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor);
  
  let oCenterX = centerX + 300 * scaleFactor;
  let oCenterY = centerY + 100 * scaleFactor;
  let oRadius = 25 * scaleFactor;

  let oDx = mouseX - oCenterX;
  let oDy = mouseY - oCenterY;
  let oDistance = dist(oCenterX, oCenterY, mouseX, mouseY);

  if (oDistance > oRadius) {
    oDx = oDx * (oRadius / oDistance);
    oDy = oDy * (oRadius / oDistance);
  }

  ctx.ellipse(oCenterX + oDx, oCenterY + oDy, 10 * scaleFactor, 10 * scaleFactor);

  let centerLargeX = centerX - 75 * scaleFactor;
  let centerLargeY = centerY + 100 * scaleFactor;
  let radius = 25 * scaleFactor;

  let dx = mouseX - centerLargeX;
  let dy = mouseY - centerLargeY;
  let distance = dist(centerLargeX, centerLargeY, mouseX, mouseY);

  if (distance > radius) {
    dx = dx * (radius / distance);
    dy = dy * (radius / distance);
  }

  ctx.ellipse(centerLargeX + dx, centerLargeY + dy, 10 * scaleFactor, 10 * scaleFactor);
}

function keyPressed() {
  if (keyCode === ENTER) {
    let buffer = createGraphics(windowWidth, windowHeight);
    buffer.angleMode(DEGREES);
    
    drawShapes(buffer);

    save(buffer, 'Oko Display Online Editor.png');
  }
}

