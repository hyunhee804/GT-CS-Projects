function examCharacter() {
  
  // hair
  fill(45, 45, 45);
  push();
  translate(0, -15);
  rotateX(0.09);
  rotateY(PI);
  sphere(15, 900, 150);
  pop();

  // left eye
  fill(70, 70, 70);
  push();
  translate(-5, -12.5, 13);
  sphere(2);
  pop();
  
  // right eye
  fill(70, 70, 70);
  push();
  translate(5, -12.5, 13);
  sphere(2);
  pop();

  // mouth
  fill(150, 52, 43);
  push();
  translate(0, -6, 12);
  sphere(1.8);
  pop();
  
  // face
  fill(253, 239, 203);
  push();
  translate(0, -14);
  sphere(15, 100, 100);
  pop();
  
  // neck
  fill(253, 239, 203);
  push();
  translate(0, 1.2);
  cylinder(6.5, 4.5);
  pop();
  
  // 11. left sleeve
  fill (19, 162, 153);
  push();
  rotateZ(-125);
  translate(-4, 25, 3);
  scale(0.9);
  cylinder(5, 30);
  pop();
  
  // 12. right sleeve
  fill (19, 162, 153);
  push();
  rotateZ(125);
  scale(0.93);
  translate(3, 25, 2);
  cylinder(5, 25);
  pop();
  
  // 15. left hand
  fill(253, 239, 203);
  push();
  translate(-27, 29, 3);
  sphere(3.3);
  pop();
  
  // 16. right hand
  fill(253, 239, 203);
  push();
  translate(25, 27.7, 1.7);
  sphere(3.3);
  pop();
  
  // 17. torso
  fill (19, 162, 153);
  push();
  translate(0, 21);
  cylinder(15, 35);
  pop();
  
  // 18. left thigh
  fill (19, 162, 153);
  push();
  translate(-8, 45);
  cylinder(5.5, 30);
  pop();
  
  // 19. right thigh
  fill (19, 162, 153);
  push();
  translate(8, 45);
  cylinder(5.5, 30);
  pop();
  
  // 22. left foot
  fill(70, 70, 70);
  push();
  translate(-8.5, 63);
  sphere(4);
  pop();
  
  // 23. right foot
  fill(70, 70, 70);
  push();
  translate(8, 63);
  sphere(4);
  pop();
}
