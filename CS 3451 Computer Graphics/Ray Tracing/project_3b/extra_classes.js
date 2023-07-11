
// Global variables for intersection function

class classNewSphere {
  constructor(x, y, z, radius) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.material = material;
    this.position = createVector(x, y, z);
    this.type = "s";
  }
}

class classAmbientLight {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

class classNewLight {
  constructor(r, g, b, x, y, z) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class classNewMaterial {
  constructor(dr, dg, db, ar, ag, ab,  sr, sg, sb, pow, k_refl) {
    this.dr = dr;
    this.dg = dg;
    this.db = db;
    this.ar = ar;
    this.ag = ag;
    this.ab = ab;
    this.sr = sr;
    this.sg = sg;
    this.sb = sb;
    this.pow = pow;
    this.k_refl = k_refl;
  }
}

class classNewCylinder {
  constructor(x, y, z, radius, h, material) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.h = h;
    this.material = material;
    this.position = createVector(x, y, z);
    this.type = "c";
  }
}

class classEyeRay {
  constructor(rayDirVector, originVector) {
    this.rayDirVector = rayDirVector; // direction
    this.originVector = originVector;  // origin
  }
}

class classReflRay {
  constructor (rayDirVector, originVector) {
    this.this.rayDirVector = rayDirVector;
    this.originVector = originVector;
  }
}

function sphereIntersect(eye_object, sObject) {
  let dx = eye_object.rayDirVector.x;
  let xo = eye_object.originVector.x;
  let sx = sObject.x;
  
  let dy = eye_object.rayDirVector.y;
  let yo = eye_object.originVector.y;
  let sy = sObject.y;
  
  let dz = eye_object.rayDirVector.z;
  let zo = eye_object.originVector.z;
  let sz = sObject.z;
  
  let a_tx = sq(dx);
  let b_tx = 2 * dx * xo - 2 * dx * sx;
  let c_tx = sq(xo) - 2 * xo * sx + sq(sx);
  
  let a_ty = sq(dy);
  let b_ty = 2 * dy * yo - 2 * dy * sy;
  let c_ty = sq(yo) - 2 * yo * sy + sq(sy);
  
  let a_tz = sq(dz);
  let b_tz = 2 * dz * zo - 2 * dz * sz;
  let c_tz = sq(zo) - 2 * zo * sz + sq(sz);
  
  let a_term = a_tx + a_ty + a_tz;
  let b_term = b_tx + b_ty + b_tz;
  let c_term = c_tx + c_ty + c_tz - sq(sObject.radius);
  
  // check if b^2-4ac is neg
  if ((sq(b_term) - 4 * a_term * c_term) < 0) {
    return -1;
  }
  
  let t_add = (-b_term + sqrt(sq(b_term) - 4 * a_term * c_term) ) / (2 * a_term);
  let t_sub = (-b_term - sqrt(sq(b_term) - 4 * a_term * c_term) ) / (2 * a_term);
 
  
  let t = 0;
  
  // steps to find the smallest non-negative t
  if (t_add <= 0 && t_sub <= 0) {
    return -1;
  } else if (t_add <= 0 && t_sub > 0) {
    t = t_sub;
  } else if (t_add > 0 && t_sub <= 0) {
    t = t_add;
  } else {
    if (t_add < t_sub) {
      t = t_add;
    } else {
      t = t_sub;
    }
  }
  
  return t;
}

function cylinderIntersect(eye_object, cObject) {
  // From Part A. body of cylinder
  let dx = eye_object.rayDirVector.x;
  let xo = eye_object.originVector.x;
  let cx = cObject.x;
  let dz = eye_object.rayDirVector.z;
  let zo = eye_object.originVector.z;
  let cz = cObject.z;
  
  let a_tx = sq(dx);
  let b_tx = 2 * dx * xo - 2 * dx * cx;
  let c_tx = sq(xo) - 2 * xo * cx + sq(cx);
  
  let a_tz = sq(dz);
  let b_tz = 2 * dz * zo - 2 * dz * cz;
  let c_tz = sq(zo) - 2 * zo * cz + sq(cz);
  
  let a_term = a_tx + a_tz;
  let b_term = b_tx + b_tz;
  let c_term = c_tx + c_tz - sq(cObject.radius);
  
  // check if b^2-4ac is neg
  if ((sqrt(sq(b_term) - 4 * a_term * c_term)) < 0) {
    return -1;
  }
  
  
  // 1a. result of quadratic formula
  let negT = (-b_term - sqrt(sq(b_term) - 4 * a_term * c_term) ) / (2 * a_term); //negative branch --> near 
  let addT = (-b_term + sqrt(sq(b_term) - 4 * a_term * c_term) ) / (2 * a_term); //positive branch --> far
  
  
  // 2a. find intersection points for two roots/ two t values
  let negIntPt = -1;
  let addIntPt = -1;  
  
  if (negT > 0 && addT > 0) {
    negIntPt = p5.Vector.mult(eye_object.rayDirVector, negT); // near intersection point 
    negIntPt = p5.Vector.add(negIntPt, eye_object.originVector); // added from the origin
    
    addIntPt = p5.Vector.mult(eye_object.rayDirVector, addT); // far intersection point
    addIntPt = p5.Vector.add(addIntPt, eye_object.originVector); // added from the origin
  }
  
  
  // 3a. check bounds
  let cyl_body_t = 0;
  
  if (negT > 0 && negIntPt.y >= cObject.y && negIntPt.y <= (cObject.y + cObject.h)) {
    cyl_body_t = negT;
  } else if (addT > 0 && addIntPt.y >= cObject.y && addIntPt.y <= (cObject.y + cObject.h)) {
    cyl_body_t = addT;
  }
  
  
  // Part B. Caps
  // initialize some values
  let bot_surfnorm = createVector(0, -1, 0);
  let top_surfnorm = createVector(0, 1, 0);
  let bot_centerDisk = createVector(cObject.x, cObject.y, cObject.z);
  let top_centerDisk = createVector(cObject.x, cObject.y + cObject.h, cObject.z);
  
  
  // t values for caps
  let bot_t = find_disk_t(bot_surfnorm, bot_centerDisk, eye_object.originVector, eye_object.rayDirVector);
  let top_t = find_disk_t(top_surfnorm, top_centerDisk, eye_object.originVector, eye_object.rayDirVector);


  // intersection points for caps
  let bot_intPoint = find_disk_intPoint(bot_t, eye_object.originVector, eye_object.rayDirVector);
  let top_intPoint = find_disk_intPoint(top_t, eye_object.originVector, eye_object.rayDirVector);
  
  // distance from center for caps
  let bot_dist = find_center_distance (bot_intPoint, bot_centerDisk);
  let top_dist = find_center_distance (top_intPoint, top_centerDisk);
 

  // bottom cap check
  let bot_cap_t = 0;
  if (bot_dist <= cObject.radius && bot_dist > 0) {
    bot_cap_t = bot_t;
  }
  
  
  // top cap check
  let top_cap_t = 0;
  if (top_dist <= cObject.radius && top_dist > 0) {
    top_cap_t = top_t;
  }
  
  // 5b. compare call three t values
  let type = 0;
  let t = 1000;
  
  if (cyl_body_t <= 0) {
    if (bot_cap_t <= 0 && top_cap_t <= 0) {
      return -1;
    } else if (bot_cap_t > 0 && top_cap_t <= 0) {
      t = bot_cap_t;
      type = 2;
    } else if (bot_cap_t <= 0 && top_cap_t > 0) {
      t = top_cap_t;
      type = 3;
    } else {
      if (bot_cap_t < top_cap_t) {
        t = bot_cap_t;
        type = 2;
      } else {
        t = top_cap_t;
        type = 3;
      }
    }
  } else if (bot_cap_t <= 0) {
    if (cyl_body_t > 0 && top_cap_t <= 0) {
      t = cyl_body_t;
      type = 1;
    } else if (cyl_body_t <= 0 && top_cap_t > 0) {
      t = top_cap_t;
      type = 3;
    } else {
      if (cyl_body_t < top_cap_t) {
        t = cyl_body_t;
        type = 1;
      } else {
        t = top_cap_t;
        type = 3;
      }
    }
  } else if (top_cap_t <= 0) {
    if (cyl_body_t > 0 && bot_cap_t <= 0) {
      t = cyl_body_t;
      type = 1;
    } else if (cyl_body_t <= 0 && bot_cap_t > 0) {
      t = bot_cap_t;
      type = 2;
    } else {
      if (cyl_body_t < bot_cap_t) {
        t = cyl_body_t;
        type = 1;
      } else {
        t = bot_cap_t;
        type = 2;
      }
    }
  }
  
  return {t, type};
}


function find_disk_t (surfnorm, centerDisk, originVector, rayDirVector) {
  let disk_t = 0;
  
  let cent_origin = p5.Vector.sub(centerDisk, originVector); //(center of disk - ray origin)
  let numerator = p5.Vector.dot(surfnorm, cent_origin); //surfnorm * (centerDisk - originVector)
  let denominator = p5.Vector.dot(surfnorm, rayDirVector); //(surfnorm * rayDirVector)
  if (denominator != 0) {
    disk_t = numerator / denominator; //(surfnorm * (centerDisk - originVector)) / (surfnorm * rayDirVector)
  }
  
  return disk_t;
}


function find_disk_intPoint (tValue, originVector, rayDirVector) {
  let intPoint = 0;
  if (tValue > 0) {
    intPoint = p5.Vector.add(originVector, p5.Vector.mult(rayDirVector, tValue));
  }
  return intPoint;
}


function find_center_distance (intPoint, centerDiskVector) {
  let dist = 2000000;
 
  if (intPoint != 0) {
    let ax = sq(centerDiskVector.x - intPoint.x);
    let by = sq(centerDiskVector.y - intPoint.y);
    let cz = sq(centerDiskVector.z - intPoint.z);
    dist = sqrt(ax + by + cz);
  }
  
  return dist;
}


function find_min_t (object_ray) {
  let minT = 10000;
  
  let tValue = 0;
  let retCylType = 0;
  let closetObject;
  let getCylinder;
  
  for (let i = 0; i < objectList.length; i++) {
    let storedObject = objectList[i];
    
    if (objectList[i].type == "s") {
      tValue = sphereIntersect(object_ray, storedObject); 
    } else {
      getCylinder = cylinderIntersect(object_ray, storedObject);
      tValue = getCylinder.t;
    }
    
    if (tValue > 0 && tValue < minT) {
      minT = tValue;
      closetObject = storedObject;
      
      if (objectList[i].type == "c") {
        retCylType = getCylinder.type;
      }
    }
  }
  return {minT, retCylType, closetObject};
}

function checkShadow(object_ray, closestObject) {
  let retTValue = -1;
  
  for (let i = 0; i < objectList.length; i++) {
    let storedObject = objectList[i];
    
    if (storedObject != closestObject) {
      retTValue = -1;
      
      if (objectList[i].type == "s") {
        retTValue = sphereIntersect(object_ray, storedObject);
      } else {
        getCylinder = cylinderIntersect(object_ray, storedObject);
        retTValue = getCylinder.t;
      }
      
      if (retTValue > 0 && retTValue < 1) {
        return true;
      }
    }
  }
  return false;
}
