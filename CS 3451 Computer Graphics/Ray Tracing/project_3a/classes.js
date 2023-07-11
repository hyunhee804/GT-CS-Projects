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
  constructor(dr, dg, db, ar, ag, ab,  sr, sg, sb, pow,  k_refl) {
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

class classCylinder {
  constructor(x, y, z, radius, h, material) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.h = h;
    this.material = material;
    this.position = createVector(x, y, z);
  }
}

class rayClass {
  constructor(pointVector, eVector) {
    this.pointVector = pointVector; // direction
    this.eVector = eVector;  // origin
  }
}

function findIntersection(erObject, cObject) {
  let dx = erObject.pointVector.x;
  let ox = erObject.eVector.x;
  let cx = cObject.x;
  let dz = erObject.pointVector.z;
  let oz = erObject.eVector.z;
  let cz = cObject.z;
  
  let a_tx = sq(dx);
  let b_tx = 2 * dx * ox - 2 * dx * cx;
  let c_tx = sq(ox) - 2 * ox * cx + sq(cx);
  
  let a_tz = sq(dz);
  let b_tz = 2 * dz * oz - 2 * dz * cz;
  let c_tz = sq(oz) - 2 * oz * cz + sq(cz);
  
  let a_term = a_tx + a_tz;
  let b_term = b_tx + b_tz;
  let c_term = c_tx + c_tz - sq(cObject.radius);
  
  // check if b^2-4ac is neg
  if ((sqrt(sq(b_term) - 4 * a_term * c_term)) < 0) {
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
  
  if (t > 0 && (t == t_sub) && (t_sub > 0)) {
    let intersectPoint = p5.Vector.mult(erObject.pointVector, t);
    if (intersectPoint.y >= cObject.y && intersectPoint.y <= (cObject.y + cObject.h)) {
      return t;
    } else {
      let intersectPoint = p5.Vector.mult(erObject.pointVector, t_add);
      if (intersectPoint.y >= cObject.y && intersectPoint.y <= (cObject.y + cObject.h)) {
        return t_add;
      } else {
        return -1;
      }
    }
  } else if (t > 0 && (t == t_add) && (t_add > 0)) {
    let intersectPoint = p5.Vector.mult(erObject.pointVector, t);
    if (intersectPoint.y >= cObject.y && intersectPoint.y <= (cObject.y + cObject.h)) {
      return t;
    } else {
      let intersectPoint = p5.Vector.mult(erObject.pointVector, t_sub);
      if (intersectPoint.y >= cObject.y && intersectPoint.y <= (cObject.y + cObject.h)) {
        return t_sub;
      } else {
        return -1;
      }
    }
  } else {
    return -1;
  }
}
