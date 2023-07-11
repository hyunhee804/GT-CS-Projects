/************************************************************************

Project 2B 3D Object Modeling

Name: Hyun Hee Park
Protagonist: Squid Game Doll
Summary: The midterm and final exam both do not stop. So the main character
kills both of them. At the end, it should appear "No More Exams"

*************************************************************************/

let time = 0;
let characterMoving = 0;

let examStarted;
let examEnded;
let iAmMidterm;
let iAmFinal;
let iSaidNoMore;
let nowExamsGone;

function setup() {
  createCanvas(1000, 600, WEBGL);
  
  // ********* textures ********
  examStarted = createGraphics(300, 60);
  examStarted.background(41, 47, 43);
  examStarted.fill(216, 236, 224);
  examStarted.textSize(20);
  examStarted.stroke('yellow');
  examStarted.text('Exam Week Has Started', 40, 35);
  
  examEnded = createGraphics(300, 60);
  examEnded.background(41, 47, 43);
  examEnded.fill(243, 175, 175);
  examEnded.textSize(20);
  examEnded.stroke('red');
  examEnded.text('Please No More Exams', 40, 35);
  
  iAmMidterm = createGraphics(80, 30);
  iAmMidterm.background('white');
  iAmMidterm.fill('black');
  iAmMidterm.textSize(20);
  iAmMidterm.stroke('yellow');
  iAmMidterm.text('Midterm', 5, 20);
  
  iAmFinal = createGraphics(90, 30);
  iAmFinal.background('white');
  iAmFinal.fill('black');
  iAmFinal.textSize(15);
  iAmFinal.stroke('yellow');
  iAmFinal.text('Final Exam', 5, 20);
  
  iSaidNoMore = createGraphics(280, 60);
  iSaidNoMore.background(41, 47, 43);
  iSaidNoMore.fill(243, 175, 175);
  iSaidNoMore.textSize(20);
  iSaidNoMore.stroke('red');
  iSaidNoMore.text('I said NO MORE', 50, 35);
  
  nowExamsGone = createGraphics(280, 60);
  nowExamsGone.background(41, 47, 43);
  nowExamsGone.fill('white');
  nowExamsGone.textSize(20);
  nowExamsGone.stroke('yellow');
  nowExamsGone.strokeWeight(2);
  nowExamsGone.text('Now, NO MORE.', 55, 35);
  
  // **** textures end here *****
  
  let fov = 60.0;
  perspective(Math.PI * fov / 180.0, width / height, 0.1, 2000);

}


function draw() {
// **************** Setting *********************
  background(200, 234, 241);   //set background color 
 
  // set the virtual camera position
  camera(0, 0, 350, 0, 0, 0, 0, 1, 0);  // x, y, z, from, at, up
  
  ambientLight(100, 100, 100);   //include some light even in shadows
  
  pointLight(255, 255, 255, 88, -100, 200);  //set light position

  noStroke();  //no plygon outlines
  
  let delta = 25;
  
//*****************Setting************************
    
  // grass
  push();
  translate(0, -83.6);
  grass(); 
  pop();
    
  // traffic light starts here *******
  push();
  translate(0, -10);
  
  // traffinc bar only
  push();
  rotate(PI / 2);
  scale(0.5);
  translate(-100, 0); //to raise up, use x-axis
  trafficBar();
  pop();
 
 // lights
  if (time < 10) {
    // green light

    push();
    translate(0, -120, -130);
    texture(examStarted);
    plane(150, 30);
    pop();
 
    push();
    greenLight();
    pop();
  } else if (time > 10 && time < 14) {
    // red light
    push();
    translate(0, -120, -130);
    texture(examEnded);
    plane(150, 30);
    pop();
    
    push();
    redLight();
    pop();
  } else {
    push();
    redLight();
    pop();
  }
  pop(); // traffic light ends here ********
  
  
  // Squid Doll starts here
  if (time < 11) {
    //start position (showing back)
    push();
    rotateY(PI);
    translate(0, -12.5);
    scale(0.7);
    squidDoll();
    pop();
  } else if (time > 11 && time < 15) {
    // turn around
    push();
    translate(0, -12.5);
    scale(0.7);
    rotateY(PI * -durationTime(11, 12));
    rotateY(PI);
    squidDoll();
    pop();
  } else if (time > 15 && time < 20) {
    // zoom in
    camera(0, -10, 350 + (-durationTime(14, 16) * 280), 0, 0, 0, 0, 1, 0);
    
    push();
    translate(-100, -60, -130);
    texture(iSaidNoMore);
    plane(130, 30);
    pop();
    
    push();
    translate(0, -12.5);
    scale(0.7);
    squidDoll();
    pop();
  } else if (time > 20 && time < 24) {
    //zoom out
    camera(0, 0 * 0, (durationTime(20, 24) * 350), 0, 0, 0, 0, 1, 0);
    
    push();
    translate(0, -12.5);
    scale(0.7);
    squidDoll();
    pop();
  } else if (time > 24 && time < 35) {
    // watch exams dying
    push();
    translate(0, -12.5);
    scale(0.7);
    squidDoll();
    pop();
  } else if (time > 35) {
    camera(0, 0, 350 + (-durationTime(35, 40) * 250), 0, 0, 0, 0, 1, 0);
    
    push();
    translate(-100, -60, -130);
    texture(nowExamsGone);
    plane(130, 30);
    pop();
    
    push();
    translate(0, -12.5);
    scale(0.7);
    squidDoll();
    pop();
  } // Squid Doll ends here
  
  
  // RedBeam killing the exams start here 
  if (time > 24 && time < 26) {
    // from eyes
    push();
    translate(-4, -10, 84.5);
    redBeam();
    pop();
    
    push();
    translate(4, -10, 84.5);
    redBeam();
    pop();
  } else if (time > 26 & time < 30) {
    // slowly penetrating
    push();
    translate(-4 * durationTime(26, 29) * 5, 20 * durationTime(26, 29) * 1.4, 30 * durationTime(26, 29) * 4);
    translate(-4, -10, 84.5);
    redBeam();
    pop();
    
    push();
    translate(4 * durationTime(26, 29) * 5, 20 * durationTime(26, 29) * 1.4, 30 * durationTime(26, 29) * 5.3);
    translate(4, -10, 84.5);
    redBeam();
    pop();
  } else if (time > 30) {
    // rotate to lie down 
    push();
    translate(-4 * durationTime(26, 29) * 5, 20 * durationTime(26, 29) * 1.4, 30 * durationTime(26, 29) * 4);
    translate(-4, -10, 84.5);
    rotateX(-PI/4 * durationTime(30, 31));
    redBeam();
    pop();
    
    push();
    translate(4 * durationTime(26, 29) * 5, 20 * durationTime(26, 29) * 1.4, 30 * durationTime(26, 29) * 5.3);
    translate(4, -10, 84.5);
    rotateX(-PI/4 * durationTime(30, 31));
    redBeam();
    pop();
    
  } //killing the exams end here
  

  // midterms and final exams start here
  if (time < 13) {
    // moving towards the doll
    
    // left side midterm
    push();
    translate(-sin(characterMoving * 7), 0.0, -8 * characterMoving);
    translate(-25, -5, 300);
    texture(iAmMidterm);
    plane(30, 10);
    pop();
    
    push();
    translate(-sin(characterMoving * 7), 0.0, -8 * characterMoving);
    rotateY(PI);
    translate(25, 15, -300);
    scale(0.5);
    examCharacter();
    pop();
   
    // right side final exam
    push();
    translate(sin(characterMoving * 7), 0.0, -4 * characterMoving);
    translate(25, -5, 300);
    texture(iAmFinal);
    plane(35, 10);
    pop();
    
    push();
    translate(sin(characterMoving * 7), 0.0, -4 * characterMoving);
    rotateY(PI);
    translate(-25, 15, -300);
    scale(0.5);
    examCharacter();
    pop();
    
    characterMoving += 0.03;
  } else if (time > 13 && time < 30) {
    // stand still
    
    //left side midterm
    push();
    translate(-sin(characterMoving * 7), 0.0, -8 * characterMoving);
    translate(-25, -5, 300);
    texture(iAmMidterm);
    plane(30, 10);
    pop();
    
    push();
    translate(-sin(characterMoving * 7), 0, -8 * characterMoving);
    rotateY(PI);
    translate(25, 15, -300);
    scale(0.5);
    examCharacter();
    pop();
    
    //right side final exam
    push();
    translate(sin(characterMoving * 7), 0.0, -4 * characterMoving);
    translate(25, -5, 300);
    texture(iAmFinal);
    plane(35, 10);
    pop();
    
    push();
    translate(sin(characterMoving * 7), 0, -4 * characterMoving);
    rotateY(PI);
    translate(-25, 15, -300);
    scale(0.5);
    examCharacter();
    pop();
  } else {
    // lie down
    
    // left side midterm
    push();
    translate(-sin(characterMoving * 7), 0.0, -8 * characterMoving);
    translate(-25, -5, 300);
    texture(iAmMidterm);
    plane(30, 10);
    pop();
    
    push();
    translate(-sin(characterMoving * 7), 0, -8 * characterMoving);
    rotateY(PI);
    translate(25, 37 * durationTime(30, 31), -300);
    scale(0.5);
    rotateX(PI/2 * durationTime(30, 31));
    examCharacter();
    pop();
    
    //right side final exam
    push();
    translate(sin(characterMoving * 7), 0.0, -4 * characterMoving);
    translate(25, -5, 300);
    texture(iAmFinal);
    plane(35, 10);
    pop();
    
    push();
    translate(sin(characterMoving * 7), 0, -4 * characterMoving);
    rotateY(PI);
    translate(-25, 37 * durationTime(20, 31), -300);
    scale(0.5);
    rotateX(PI/2 * durationTime(30, 31));
    examCharacter();
    pop();
  } // exam characters end here
 
 
  time += 0.04;
  //console.log(frameCount);
}

function durationTime(startTime, endTime) {
  var dTime = endTime - startTime;
  var newTime = (time - startTime) / dTime;
  
  return constrain(newTime, 0, 1);
}
