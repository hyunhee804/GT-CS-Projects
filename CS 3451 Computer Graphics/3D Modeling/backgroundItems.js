function grass() {
  fill(210, 177, 96);
  push();
  translate(0, 150, -80);
  box(2000, 35, 100000);
  pop();
}

function trafficBar() {
  fill(61, 61, 61);
  push();
  cylinder(12, 80);
  pop();
}

function redLight() {
  fill(255, 0, 0);
  push();
  translate(-6.5, -49.8, 4.2);
  sphere(4);
  pop();
}

function greenLight() {
  fill(0, 244, 0);
  push();
  translate(6.5, -50, 4.2);
  sphere(4);
  pop();
}

function redBeam() {
  fill(246, 19, 14);
  push();
  rotateX(PI / 2.2);
  cylinder(0.8, 150);
  pop();
}
