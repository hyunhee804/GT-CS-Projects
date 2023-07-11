function squidDoll() {
  
  // 1. bang hair
  fill(45, 45, 45);
  push();
  translate(0, -15);
  rotateX(0.09);
  rotateY(PI);
  sphere(15, 900, 150);
  pop();
  
  // 2. left pig-tail
  fill(45, 45, 45);
  push();
  translate(-15, -10);
  sphere(5);
  pop();
  
  // 3. right pig tail
  fill(45, 45, 45);
  push();
  translate(15, -10);
  sphere(5);
  pop();
  
  // 4. left eye
  fill(70, 70, 70);
  push();
  translate(-5, -12.5, 13);
  sphere(2);
  pop();
  
  // 5. right eye
  fill(70, 70, 70);
  push();
  translate(5, -12.5, 13);
  sphere(2);
  pop();
  
  // 6. left eyeball
  fill(255);
  push();
  translate(-4.7, -12.8, 14);
  sphere(1);
  pop();
  
  // 7. right eyeball
  fill(255);
  push();
  translate(5.63, -12.87, 13.87);
  sphere(1);
  pop();
  
  // 8. mouth
  fill(150, 52, 43);
  push();
  translate(0, -6, 12);
  sphere(1.8);
  pop();
  
  // 9. face
  fill(247, 230, 186);
  push();
  translate(0, -14);
  sphere(15, 100, 100);
  pop();
  
  // 10. neck
  fill(247, 230, 186);
  push();
  translate(0, 1.2);
  cylinder(6.5, 4.5);
  pop();
  
  // 11. left sleeve
  fill(232, 224, 82);
  push();
  rotateZ(-125);
  translate(-4, 18, 3);
  scale(0.9);
  cylinder(5, 14);
  pop();
  
  // 12. right sleeve
  fill(232, 224, 82);
  push();
  rotateZ(125);
  scale(0.93);
  translate(3, 19, 2);
  cylinder(5, 13);
  pop();
  
  // 13. left arm
  fill(247, 230, 186);
  push();
  rotateZ(-125);
  translate(-4, 25, 3);
  scale(0.9);
  cylinder(3.7, 23);
  pop();
  
  // 14. right arm
  fill(247, 230, 186);
  push();
  rotateZ(125);
  scale(0.93);
  translate(3, 25, 2);
  cylinder(3.7, 25);
  pop();
  
  // 15. left hand
  fill(247, 230, 186);
  push();
  translate(-26, 26.5, 3);
  sphere(3.3);
  pop();
  
  // 16. right hand
  fill(247, 230, 186);
  push();
  translate(25, 27.7, 1.7);
  sphere(3.3);
  pop();
  
  // 17. torso
  fill(243, 166, 96);
  push();
  translate(0, 21);
  cylinder(15, 35);
  pop();
  
  // 18. left thigh
  fill(247, 230, 186);
  push();
  translate(-8, 44);
  cylinder(5.5, 15);
  pop();
  
  // 19. right thigh
  fill(247, 230, 186);
  push();
  translate(8, 44);
  cylinder(5.5, 15);
  pop();
  
  // 20. left knee sox
  fill(255);
  push();
  translate(-8, 65);
  cylinder(5.8, 28);
  pop();
  
  // 21. right knee sox
  fill(255);
  push();
  translate(8, 65);
  cylinder(5.8, 28);
  pop();
  
  // 22. left foot
  fill(70, 70, 70);
  push();
  translate(-8.5, 82);
  sphere(4);
  pop();
  
  // 23. right foot
  fill(70, 70, 70);
  push();
  translate(8, 82);
  sphere(4);
  pop();
}
