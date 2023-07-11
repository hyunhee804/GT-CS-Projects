function create_vertexNormal (vertex_point) {
  let corners_vertex = [];
  let face_count_list = [];
 
  let sum_sn_x = 0;
  let sum_sn_y = 0;
  let sum_sn_z = 0;

  for (let i = 0; i < vTable.length; i++) {
    if (vertex_point == gTable[vTable[i]]) {
      corners_vertex[i] = i;
      
      let face_number = int(corners_vertex[i] / 3);
      face_count_list.push(face_number);
      
      sum_sn_x += surface_normal[face_number].x;
      sum_sn_y += surface_normal[face_number].y;
      sum_sn_z += surface_normal[face_number].z;
    }
  }
  
  let vector_vertex_normal = createVector(sum_sn_x, sum_sn_y, sum_sn_z);
  
  let curr = face_count_list[0];
  let face_count = 1;
  
  for (let i = 0; i < face_count_list.length; i++) {
    let prev = curr;
    curr = face_count_list[i];
    
    if (prev != curr) {
      face_count++;
    }
  }
  
  let vertex_normal = p5.Vector.div(vector_vertex_normal, face_count);
  vertex_normal.normalize();
  
  return vertex_normal;
}


function get_corners (c) {
  let triangle = int(c / 3);
  let n = 3 * triangle + (c + 1) % 3;
  let n_n = 3 * triangle + (c + 2) % 3;
  
  return {triangle, n, n_n};
}



function create_random_color () {
  random_color_list = [];
  for (let i = 0; i < vTable.length; i++) {
    let random_color = [random(255), random(255), random(255)];
    random_color_list.push(random_color);
  }
}



function find_swing (corner) {
  let next_corner = get_corners(corner).n;
  let opp_next_corner = oTable[next_corner];
  let swing = get_corners(opp_next_corner).n;

  return swing;
}

function get_swing_table (corner) {
  // initialize the swing_table
  let swing_list = [];
  
  // first, insert the original corner
  swing_list.push(corner);
  
  // find the first swing corner of that original corner
  let curr_corner = find_swing(corner);
  
  // using while loop, find all the swing corners 
  while (curr_corner != corner) {
   swing_list.push(curr_corner);
   curr_corner = find_swing(curr_corner);
  }
  
  // return the swing table 
  return swing_list;
}
