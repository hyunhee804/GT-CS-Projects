// these are the routines that you should write for the project

// global r, g, b
let globalR = 0;
let globalG = 0;
let globalB = 0;

// global k
let k = 0;

// global new_light list
let lightColorist = [];

// global new_material material
let material;

// global new_cylinder list
let cylinderList = [];

// global variables in draw_scene()
let t = 0;

let lightColor;
let closeObject;

let intersectPoint;
let cylinderVector;
let surfaceNormal;
let lightVector;
let lightIntersect;

let debug = false;


function reset_scene() {
  globalR = 0;
  globalG = 0;
  globalB = 0;
  
  lightColorist = [];
  cylinderList = [];
}

function set_background (r, g, b) {
  globalR = r;
  globalG = g;
  globalB = b;
}

function set_fov (angle) {
  radAngle = angle * PI/180;
  k = Math.tan(radAngle / 2);
}

function new_light (r, g, b, x, y, z) {
  let l = new classNewLight(r, g, b, x, y, z);
  lightColorist.push(l);
}

function new_material (dr, dg, db, ar, ag, ab,  sr, sg, sb,  pow,  k_refl) {
  material = new classNewMaterial(dr, dg, db, ar, ag, ab, sr, sg, sb, pow, k_refl);
}


function new_cylinder (x, y, z, radius, h) {
  let c = new classCylinder(x, y, z, radius, h, material);
  cylinderList.push(c);
}

function eye_rays(x, y) {
  let x_prime = (x - width / 2) * ((2 * k) / width);
  let y_prime = (y - height / 2) * ((2 * k) / height);
  let pointVector = createVector(x_prime, -(y_prime), -1); //ray direction
  let eVector = createVector(0, 0, 0); 

 let ray = new rayClass (pointVector, eVector);
 return ray;
}

function draw_scene() {
  noStroke();

  // go through all the pixels in the image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      
      // get eye ray object
      let eyeobject = eye_rays(x, y);
      let min_t = 10000;
      
      for (let i = 0; i < cylinderList.length; i++) {
        let store_cylinder = cylinderList[i];
        
        // steps to find the smallest nonnegative t
        t = findIntersection(eyeobject, store_cylinder);
        
        // keep track of mininum t value
        if (t > 0 && t < min_t) {
          min_t = t;
          closeObject = store_cylinder;
        }
      }
      
      if (min_t == 10000) {
        // no intersection
        fill (globalR * 255, globalG * 255, globalB * 255);
      } else {
        // yes intersection
        let redPosition = 0;
        let greenPosition = 0;
        let bluePosition = 0;
        
        for (let i = 0; i < lightColorist.length; i++) {
          lightColor = lightColorist[i];
          
          // intersection points
          intersectPoint = p5.Vector.mult(eyeobject.pointVector, min_t);
          
          // vector of the closest cylinder
          cylinderVector = createVector(closeObject.x, closeObject.y, closeObject.z);
          
          // to find Surface Normal, N, in shading equation
          surfaceNormal = p5.Vector.sub(intersectPoint, cylinderVector);
          surfaceNormal = createVector(surfaceNormal.x, 0, surfaceNormal.z);
          surfaceNormal = surfaceNormal.normalize();
          
          // to find L in shading equation
          lightVector = createVector(lightColor.x, lightColor.y, lightColor.z);
          lightIntersect = p5.Vector.sub(lightVector, intersectPoint);
          lightIntersect = lightIntersect.normalize();
          
          let dotProductNL = p5.Vector.dot(surfaceNormal, lightIntersect);
          
          redPosition += closeObject.material.dr * lightColor.r * max(0, dotProductNL);
          greenPosition += closeObject.material.dg * lightColor.g * max(0, dotProductNL);
          bluePosition += closeObject.material.db * lightColor.b * max(0, dotProductNL);
        }
        fill (redPosition * 255, greenPosition * 255, bluePosition * 255);
      }
      rect (x, y, 1, 1);
    }
  }
}
