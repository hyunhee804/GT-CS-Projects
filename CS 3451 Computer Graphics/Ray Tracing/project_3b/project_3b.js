// Here are the two new routines that you should add to your ray tracer for Part B

// initialization
let globalR = 0;
let globalG = 0;
let globalB = 0;
let k = 0;

let debug = false;

let ambLightList = [];
let newLightList = [];
let objectList = [];

let material;
let ambientLight = new classAmbientLight(0, 0, 0);


function new_sphere (x, y, z, radius) {
  let s = new classNewSphere(x, y, z, radius, material);
  objectList.push(s);
}

function ambient_light (r, g, b) {
  ambientLight = new classAmbientLight(r, g, b);
}

// You should swap in your routines from Part A for the placeholder routines below

function reset_scene() {
  globalR = 0;
  globalG = 0;
  globalB = 0;
  
  ambLightList =[];
  newLightList = [];
  objectList = [];
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
  let nl = new classNewLight(r, g, b, x, y, z);
  newLightList.push(nl);
}

function new_material (dr, dg, db,  ar, ag, ab,  sr, sg, sb,  pow,  k_refl) {
  material = new classNewMaterial(dr, dg, db, ar, ag, ab, sr, sg, sb, pow, k_refl);
}

function new_cylinder (x, y, z, radius, h) {
  let c = new classNewCylinder(x, y, z, radius, h, material);
  objectList.push(c);
}

function eye_rays(x, y) {
  let x_prime = (x - width / 2) * ((2 * k) / width);
  let y_prime = (y - height / 2) * ((2 * k) / height);
  
  let rayDirVector = createVector(x_prime, -(y_prime), -1).normalize(); //ray direction
  let originVector = createVector(0, 0, 0); // origin

 let ray = new classEyeRay (rayDirVector, originVector);
 return ray;
}

function refl_rays (intPoint, surfNorm) {
  let rayDirVector = p5.Vector.dot(surfNorm, intPoint);
  rayDirVector = p5.Vector.mult(rayDirVector, 2);
  rayDirVector = p5.Vector.mult(rayDirVector, surfNorm);
  rayDirVector = p5.Vector.sub(rayDirVector, intPoint);
  
  let originVector = intPoint;
  
  let refl_ray = new classReflRay (rayDirVector, originVector);
  return refl_ray;
}

function draw_scene() {
  noStroke();
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      debug = (x==250 && y==340) ? true : false;
      
      let eyeObject_ray = eye_rays(x, y);
      
      let min_t = find_min_t(eyeObject_ray).minT;
      let cyl_type = find_min_t(eyeObject_ray).retCylType;
      let closedObject = find_min_t (eyeObject_ray).closetObject;
      
      
      if (min_t == 10000) {
        fill (globalR * 255, globalG * 255, globalB * 255);
      } else {
        let eyeR = 0;
        let eyeG = 0;
        let eyeB = 0;
        
        let diffuseR = 0;
        let diffuseG = 0;
        let diffuseB = 0;
        
        let specularR = 0;
        let specularG = 0;
        let specularB = 0;
        
        let ambientR = 0;
        let ambientG = 0;
        let ambientB = 0;
        
        let lightColor;
        
        for (let i = 0; i < newLightList.length; i++) {
          // intersection points
          let intersectPoint = p5.Vector.add(eyeObject_ray.originVector, p5.Vector.mult(eyeObject_ray.rayDirVector, min_t));
          
          // vector of the closest cylinder
          let objectVector = createVector(closedObject.x, closedObject.y, closedObject.z);
          
          // find surface noraml
          let surfaceNormal = p5.Vector.sub(intersectPoint, objectVector);
          
          if (closedObject.type == "s") {
            surfaceNormal = createVector(surfaceNormal.x, surfaceNormal.y , surfaceNormal.z);
          } else {
            if (cyl_type == 3) {
              surfaceNormal = createVector(0, 1, 0);
            } else if (cyl_type == 2) {
              surfaceNormal = createVector(0, -1, 0);
            } else if (cyl_type == 1) {
              surfaceNormal = createVector(surfaceNormal.x, 0 , surfaceNormal.z);
            }
          }
          surfaceNormal.normalize();
          
           // to find L in shading equation
          let lightColor = newLightList[i];
          let lightVector = createVector(lightColor.x, lightColor.y, lightColor.z);
          lightVector = p5.Vector.sub(lightVector, intersectPoint);
          lightVector.normalize();
          
          let dotProductNL = p5.Vector.dot(surfaceNormal, lightVector);
          
          // shadow 
          let lightIP_x = lightColor.x - intersectPoint.x;
          let lightIP_y = lightColor.y - intersectPoint.y;
          let lightIP_z = lightColor.z - intersectPoint.z;
          let lightIP = createVector(lightIP_x, lightIP_y, lightIP_z);
          
          let offset = p5.Vector.mult(lightIP, 0.000001);
          let off_andIntPt = p5.Vector.add(offset, intersectPoint); //for origin
          
          let shadow_dir = createVector(lightIP_x, lightIP_y, lightIP_z);
          let shadow_og = createVector(off_andIntPt.x, off_andIntPt.y, off_andIntPt.z);
          let shadow_ray = new classEyeRay(shadow_dir, shadow_og);
          
          let shadow = checkShadow (shadow_ray, closedObject);
          
          if (shadow == false) {
            diffuseR += closedObject.material.dr * lightColor.r * max(0, dotProductNL);
            diffuseG += closedObject.material.dg * lightColor.g * max(0, dotProductNL);
            diffuseB += closedObject.material.db * lightColor.b * max(0, dotProductNL);
            
            // specular
            let multVector = p5.Vector.mult(eyeObject_ray.rayDirVector, -1).normalize();
            let hVector = p5.Vector.add(lightVector, multVector).normalize();
            let specularity = p5.Vector.dot(surfaceNormal, hVector);
           
  
            specularity = max(0, specularity);
            specularity = pow(specularity, closedObject.material.pow);
            
            specularR += specularity * lightColor.r * closedObject.material.sr;
            specularG += specularity * lightColor.g * closedObject.material.sg;
            specularB += specularity* lightColor.b * closedObject.material.sb;
          }
          
          let reflectionR = 0;
          let norm_intPoint = 0;
          let reflOrig = 0;
          
          if (closedObject.material.krefl > 0) {
            let e = ray * -1;
            norm_intPoint = p5.Vector.dot(surfaceNormal, intersectPoint);
            reflectionR = p5.Vector.mult(surfaceNormal, 2);
            reflectionR = p5.Vector.mult(norm_intPoint, reflectionR);
            reflectionR = p5.Vector.sub(reflectionR, intersectPoint);
            
            reflOrig = p5.Vector.add(intersectPoint, p5.Vector.mult(reflectionR, 0.0001));
            
          }
        }
        
        // ambient
        ambientR = closedObject.material.dr * ambientLight.r * closedObject.material.ar;
        ambientG = closedObject.material.dg * ambientLight.g * closedObject.material.ag;
        ambientB = closedObject.material.db * ambientLight.b * closedObject.material.ab;
        
        // final color
        eyeR += diffuseR + specularR + ambientR; //+ closedObject.material.krefl;
        eyeG += diffuseG + specularG + ambientG; //+ closedObject.material.krefl;
        eyeB += diffuseB + specularB + ambientB; //+ closedObject.material.krefl;
        
        fill (eyeR * 255, eyeG * 255, eyeB * 255);
      }
      
      rect (x, y, 1, 1);
    }
  }
}
