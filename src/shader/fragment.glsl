precision mediump float;
varying vec2 vTexCoord;

void main() {
  gl_FragColor = vec4(vTexCoord, 0, 1);
}
