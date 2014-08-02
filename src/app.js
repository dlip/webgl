var util = require('./helper/util');

window.onload = function(){
  var c = document.getElementById('c');
  var gl = c.getContext("webgl") || c.getContext("experimental-webgl");

  gl.clearColor(0,0,0.8,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  var vertexPosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
  var vertices = [-0.5, -0.5, 0.5, -0.5, 0, 0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  var vs = 'attribute vec2 pos;' +
    'void main() { gl_Position = vec4(pos, 0, 1); }';
  var fs = 'precision mediump float;' +
    'void main() { gl_FragColor = vec4(0, 0.8, 0, 1); }';
  var program = util.createProgram(gl, vs, fs);
  gl.useProgram(program);
  program.vertexPosAttrib = gl.getAttribLocation(program, 'pos');
  gl.enableVertexAttribArray(program.vertexPosArray);
  gl.vertexAttribPointer(program.vertexPosAttrib, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
