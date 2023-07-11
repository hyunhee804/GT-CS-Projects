// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  vec2 big_center = vec2(0.5, 0.5);
  float big_distance = distance(big_center, vertTexCoord.xy);
  float big_radius = 0.5;

  float dist = 0.37;
  float angle = 3.14;
  float small_radius = 0.08;

  if (big_distance < big_radius) {
    gl_FragColor = vec4(0.0, 1.0, 2.0, 1.0);

    for (float i = 0.0; i < 37.0; i++) {
      vec2 small_center = vec2(dist * cos(angle) + big_center.x, dist * sin(angle) + big_center.y);
      float spiralDistFromCenter = distance(small_center, vertTexCoord.xy);

      if (spiralDistFromCenter < small_radius) {
        gl_FragColor = vec4(0.0, 1.0, 2.0, 0.0);
      }

      dist -= 0.0115;
      small_radius -= 0.0025;
      angle += 0.5;
    }
  } else {
    gl_FragColor = vec4(0.0, 1.0, 2.0, 0.0);
  }
}