// Provided code for Project 5

let gTable = [];
let vTable = [];
let oTable = [];
let surface_normal = [];
let random_color_list = [];

let tetra,octa,icosa,star,torus;

let animate_flag = 1;
let normal_flag = 0;
let random_flag = 0;

let time = 0;  // records the passage of time, used to move the objects

// read in the polygon mesh files
function preload() {
  tetra = loadStrings('assets/tetra.txt');
  octa = loadStrings('assets/octa.txt');
  icosa = loadStrings('assets/icosa.txt');
  star = loadStrings('assets/star.txt');
  torus = loadStrings('assets/torus.txt');
}

// called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);
  
  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// handle key press commands
function keyPressed() {
  console.log ("key pressed\n");
  switch(key) {
    case ' ':  animate_flag = 1 - animate_flag; break;
    case '1':  parse_polys(tetra); break;
    case '2':  parse_polys(octa); break;
    case '3':  parse_polys(icosa); break;
    case '4':  parse_polys(star); break;
    case '5':  parse_polys(torus); break;
    case 'd':  create_dual(); break;
    case 'n':  normal_flag = 1 - normal_flag; break;
    case 'r':  random_flag = 1 - random_flag; break;
    case 'q':  debugger; break;
  }
}

// called repeatedly to create new per-frame images
function draw() {
  background(200, 200, 255);  // light blue background
  
  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up
  
  // include a little bit of light even in shadows
  ambientLight(40, 40, 40);
  
  // set the light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // don't draw polygon outlines
  
  fill (255, 255, 255);
  
  push();
  let mesh_axis = createVector (0, 1, 0);
  
  rotate (-time, mesh_axis);
  scale(10);
  
  for (let c = 0; c < vTable.length; c++) {
    let tri = get_corners(c).triangle;
    let c_n = get_corners(c).n;
    let c_n_n = get_corners(c).n_n;
    
    if (random_flag == 1) {
      fill(random_color_list[tri][0], random_color_list[tri][1], random_color_list[tri][2]);
    } else {
      fill(255, 255, 255);
    }
    
    if (normal_flag != 1) {
      beginShape();
      let vertex_normal1 = create_vertexNormal(gTable[vTable[c]]);
      vertexNormal(vertex_normal1.x, vertex_normal1.y, vertex_normal1.z);
      vertex(gTable[vTable[c]].x, gTable[vTable[c]].y, gTable[vTable[c]].z);
      
      let vertex_normal2 = create_vertexNormal(gTable[vTable[c_n]]);
      vertexNormal(vertex_normal2.x, vertex_normal2.y, vertex_normal2.z);
      vertex(gTable[vTable[c_n]].x, gTable[vTable[c_n]].y, gTable[vTable[c_n]].z);
      
      let vertex_normal3 = create_vertexNormal(gTable[vTable[c_n_n]]);
      vertexNormal(vertex_normal3.x, vertex_normal3.y, vertex_normal3.z);
      vertex(gTable[vTable[c_n_n]].x, gTable[vTable[c_n_n]].y, gTable[vTable[c_n_n]].z);
      endShape (CLOSE);
    } else {
      beginShape();
      vertexNormal(surface_normal[tri].x, surface_normal[tri].y, surface_normal[tri].z);
      vertex(gTable[vTable[c]].x, gTable[vTable[c]].y, gTable[vTable[c]].z);
      vertex(gTable[vTable[c_n]].x, gTable[vTable[c_n]].y, gTable[vTable[c_n]].z);
      vertex(gTable[vTable[c_n_n]].x, gTable[vTable[c_n_n]].y, gTable[vTable[c_n_n]].z);
      endShape (CLOSE);
    }
  }
 
  pop();
  
  // maybe update time
  if (animate_flag) {
    time += 0.02;
  }
}

function parse_polys(s)
{
  surface_normal = [];
  gTable = [];
  vTable = [];
  oTable = [];
  random_color_list = [];
  
  console.log ("in read_polys()");
  
  let vertex_count,face_count;
  let tokens = [];

  // go through all the lines in the file and separate the tokens
  for (let i = 0; i < s.length; i++) {
    tokens[i] = s[i].split(" ");
    //console.log (tokens[i]);
  }

  vertex_count = parseInt(tokens[0][1]);
  face_count = parseInt(tokens[1][1]);
  
  //console.log ("vertex count = " + vertex_count);
  //console.log ("face count = " + face_count);
  
  // read in the vertex coordinates
  for (let i = 0; i < vertex_count; i++) {
    let tlist = tokens[i+2];
    let x = parseFloat(tlist[0]);
    let y = parseFloat(tlist[1]);
    let z = parseFloat(tlist[2]);
    // console.log ("xyz: " + x + " " + y + " " + z);
    
    // Geometry Table
    let vector_gTable = createVector(x, y, z);
    gTable.push(vector_gTable);
  }

  // read in the face indices
  for (let i = 0; i < face_count; i++) {
    let tlist = tokens[i + vertex_count + 2];
    let nverts = parseInt(tlist[0]);
    let v1 = parseInt(tlist[1]);
    let v2 = parseInt(tlist[2]);
    let v3 = parseInt(tlist[3]);
    // console.log ("verts: " + v1 + " " + v2 + " " + v3);
    
    // Vertex Table
    vTable.push(v1);
    vTable.push(v2);
    vTable.push(v3);
    
    // Finding Surface Normal 
    let vector1 = createVector(gTable[v1].x, gTable[v1].y, gTable[v1].z);
    let vector2 = createVector(gTable[v2].x, gTable[v2].y, gTable[v2].z);
    let vector3 = createVector(gTable[v3].x, gTable[v3].y, gTable[v3].z);
    
    let side1 = p5.Vector.sub(vector1, vector2);
    let side2 = p5.Vector.sub(vector1, vector3);
    
    let sn = p5.Vector.cross(side1, side2); // surface normal
    sn.normalize();
    sn = p5.Vector.mult(sn, -1);
   
    surface_normal.push(sn);
  }
  
  
  // Opposite Table
  for (let a = 0; a < vTable.length; a++) {
    for (let b = 0; b < vTable.length; b++) {
      
      let a_next_c = get_corners(a).n;
      let b_next_c = get_corners(b).n;
      
      let a_next_n_c = get_corners(a).n_n;
      let b_next_n_c = get_corners(b).n_n;

      if (vTable[a_next_c] == vTable[b_next_n_c] && vTable[a_next_n_c] == vTable[b_next_c]) {
        oTable[a] = b;
        oTable[b] = a;
      }
    }
  }
  
  create_random_color();
 
  console.log ("end of read_polys()");
}

// This function should produce the triangulated dual of your current mesh
function create_dual() {
  let new_vTable = [];
  let new_gTable = [];
  let new_oTable = [];
  
  let centroid_table = [];
  let curr_swing = [];
  let map = new Map();
  
  surface_normal = [];
  
  for (let i = 0; i < gTable.length;i++) {
    centroid_table = [];
    
    for (let c_number = 0; c_number < vTable.length; c_number += 3) {
      if (vTable[c_number] == i) {
        curr_swing = get_swing_table(c_number);
      }
      if (vTable[c_number + 1] == i) {
        curr_swing = get_swing_table(c_number + 1);
      }
      
      if (vTable[c_number + 2] == i) {
        curr_swing = get_swing_table(c_number + 2);
      }
    }
    
   
    for (let j = 0; j < curr_swing.length; j++) {
      // get corner numbers
      let ori_corner = curr_swing[j];
      let ori_corner_next = get_corners(ori_corner).n;
      let ori_corner_next_next = get_corners(ori_corner).n_n;
   
      // get vertices
      let vertex1 = vTable[ori_corner];
      let vertex2 = vTable[ori_corner_next];
      let vertex3 = vTable[ori_corner_next_next];
      
      // create vectors with that vertices
      let vector1 = createVector(gTable[vertex1].x, gTable[vertex1].y, gTable[vertex1].z);
      let vector2 = createVector(gTable[vertex2].x, gTable[vertex2].y, gTable[vertex2].z);
      let vector3 = createVector(gTable[vertex3].x, gTable[vertex3].y, gTable[vertex3].z);
      
      // find 1 centroid of those vectors
      let x_centroid = (vector1.x + vector2.x + vector3.x) / 3;
      let y_centroid = (vector1.y + vector2.y + vector3.y) / 3;
      let z_centroid = (vector1.z + vector2.z + vector3.z) / 3;
      
      let centroid = createVector(x_centroid, y_centroid, z_centroid);
      
      if (!map.has(centroid)) {
        new_gTable.push(centroid);
        map.set(centroid, new_gTable.length - 1);
      }
      
      centroid_table.push(centroid);
    }
   
    
    // find the average for the centroid table
    let avg_cent = 0;
    let sum_centroid = 0;
    
    for (let k = 0; k < centroid_table.length; k++) {
      sum_centroid = p5.Vector.add(centroid_table[k], sum_centroid);
    }
   
    avg_cent = p5.Vector.div(sum_centroid, centroid_table.length);
    
    if (!map.has(avg_cent)) {
        new_gTable.push(avg_cent);
        map.set(avg_cent, new_gTable.length - 1);
     }
    
    for (let index = 0; index < centroid_table.length; index++) {
      let vertex_id_1 = map.get(centroid_table[index % centroid_table.length]);
      let vertex_id_2 = map.get(centroid_table[(index + 1) % centroid_table.length]);
      let avg_vertex_id = map.get(avg_cent);
      
      new_vTable.push(vertex_id_1);
      new_vTable.push(vertex_id_2);
      new_vTable.push(avg_vertex_id);
    }
    
  }
 
  vTable = new_vTable;
  gTable = new_gTable;
  
  // Calculating Surface Normal
  for (let i = 0; i < vTable.length; i += 3) {
    let tri_number = int(i / 3);
    
    let v1 = vTable[i];
    let v2 = vTable[i + 1];
    let v3 = vTable[i + 2];
    
    let vector1 = createVector(gTable[v1].x, gTable[v1].y, gTable[v1].z);
    let vector2 = createVector(gTable[v2].x, gTable[v2].y, gTable[v2].z);
    let vector3 = createVector(gTable[v3].x, gTable[v3].y, gTable[v3].z);
    
    let side1 = p5.Vector.sub(vector2, vector1);
    let side2 = p5.Vector.sub(vector3, vector1);
    
    let sn = p5.Vector.cross(side1, side2); // surface normal
    sn.normalize();
    sn = p5.Vector.mult(sn, -1);
   
    surface_normal.push(sn);
  }
  
   //Finding a new Opposite Table
  for (let a = 0; a < vTable.length; a++) {
    for (let b = 0; b < vTable.length; b++) {
      
      let a_next_c = get_corners(a).n;
      let b_next_c = get_corners(b).n;
      
      let a_next_n_c = get_corners(a).n_n;
      let b_next_n_c = get_corners(b).n_n;

      if (vTable[a_next_c] == vTable[b_next_n_c] && vTable[a_next_n_c] == vTable[b_next_c]) {
        new_oTable[a] = b;
        new_oTable[b] = a;
      }
    }
  }
  
  oTable = new_oTable;
}
