// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  vec4 cent = texture2D(my_texture, vertTexCoord.xy);

  // 1/256 = 0.00390625
  float small = 0.00390625;

  vec4 n1 = texture2D(my_texture, vec2(vertTexCoord.x + small, vertTexCoord.y));
  vec4 n2 = texture2D(my_texture, vec2(vertTexCoord.x - small, vertTexCoord.y));
  vec4 n3 = texture2D(my_texture, vec2(vertTexCoord.x, vertTexCoord.y + small));
  vec4 n4 = texture2D(my_texture, vec2(vertTexCoord.x, vertTexCoord.y - small));


  float cent_intensity = cent.r + cent.g + cent.b;
  float n1_intensity = n1.r + n1.g + n1.b;
  float n2_intensity = n2.r + n2.g + n2.b;
  float n3_intensity = n3.r + n3.g + n3.b;
  float n4_intensity = n4.r + n4.g + n4.b;

  float final_intensity = (n1_intensity + n2_intensity + n3_intensity + n4_intensity) - (4 * cent_intensity);

  gl_FragColor = vec4(final_intensity + 0.5, final_intensity + 0.5, final_intensity + 0.5, 1.0);

}
