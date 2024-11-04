function setup() {
  createCanvas(800, 400); // Set canvas size to 800x400
  angleMode(DEGREES);
}

function draw() {
  background(255);
  
  strokeWeight(50); // Keep the stroke weight the same
  noFill(); // Disable fill for shapes
  
  // Set stroke color
  stroke(255, 0, 255); // Change to your desired color (e.g., purple)
  
  // Center positions for the shapes
  let centerX = width / 2; // Horizontal center of canvas
  let centerY = height / 2; // Vertical center of canvas
  
  // Letter O
  line(centerX - 150, centerY - 100, centerX - 150, centerY + 100); // Adjusted line positions
  arc(centerX - 75, centerY - 100, 150, 150, 180, 360); // Adjusted arc size and positions
  arc(centerX - 75, centerY + 100, 150, 150, 360, 180); // Adjusted arc size and positions
  line(centerX + 0, centerY - 100, centerX + 0, centerY + 100); // Adjusted line positions
  
  // Letter k
  line(centerX + 100, centerY - 175, centerX + 100, centerY + 175); // Adjusted line positions
  arc(centerX + 175, centerY + 100, 150, 150, 90, 180); // Adjusted arc size and positions
  arc(centerX + 175, centerY - 10, 150, 150, 180, 270); // Adjusted arc size and positions
  
  // Letter o
  ellipse(centerX + 300, centerY + 100, 150, 150); // Large ellipse adjusted to center
  
  // Follow mouse logic for the small ellipse
  let oCenterX = centerX + 300; // Center adjusted
  let oCenterY = centerY + 100; // Center adjusted
  let oRadius = 25; // Half of the large ellipse radius
  
  // Calculate distance between center and mouse
  let oDx = mouseX - oCenterX;
  let oDy = mouseY - oCenterY;
  let oDistance = dist(oCenterX, oCenterY, mouseX, mouseY);
  
  // Constrain the small ellipse within the boundary of the large ellipse
  if (oDistance > oRadius) {
    oDx = oDx * (oRadius / oDistance);
    oDy = oDy * (oRadius / oDistance);
  }
  
  // Draw the small ellipse that follows the mouse within bounds
  ellipse(oCenterX + oDx, oCenterY + oDy, 10, 10); // Small ellipse

  // Center of the invisible large ellipse
  let centerLargeX = centerX - 75; // Center adjusted
  let centerLargeY = centerY + 100; // Center adjusted
  let radius = 25; // Half of the invisible large ellipse's radius
  
  // Calculate distance between center and mouse for the first ellipse
  let dx = mouseX - centerLargeX;
  let dy = mouseY - centerLargeY;
  let distance = dist(centerLargeX, centerLargeY, mouseX, mouseY);
  
  // Constrain the small ellipse within the boundary of the invisible large ellipse
  if (distance > radius) {
    dx = dx * (radius / distance);
    dy = dy * (radius / distance);
  }
  
  // Draw the small ellipse that follows the mouse within bounds
  ellipse(centerLargeX + dx, centerLargeY + dy, 10, 10); // Small ellipse
}
