// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  float zx = 3 * (vertTexCoord.x - 0.5);
  float zy = 3 * (vertTexCoord.y - 0.5);

  float n = 3;

  for (int i = 0; i < 20; i++) {
    float ztemp = (pow((zx * zx + zy * zy), n / 2)) * cos(n * atan(zy, zx)) + cx;
    zy = (pow((zx * zx + zy * zy), n / 2)) * sin(n * atan(zy, zx)) + cy;
    zx = ztemp;
  }

  if (zx * zx + zy * zy < 16) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
}