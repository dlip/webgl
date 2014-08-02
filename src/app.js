var util = require('./helper/util');
var vs = require('./shader/vertex.glsl');
var fs = require('./shader/fragment.glsl');

window.onerror = function(message, url, linenumber) {
  console.error('JavaScript error: ' + message + ' on line ' + linenumber + ' for ' + url);
}

window.onload = function(){
  var c = document.getElementById('c');
  var gl = c.getContext("webgl") || c.getContext("experimental-webgl");

  gl.clearColor(0,0,0.8,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  var vertexPosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
  var vertices = [-1, -1, 1,   -1, -1, 1,   1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  vertexPosBuffer.itemSize = 2;
  vertexPosBuffer.numItems = 4;

  var program = util.createProgram(gl, vs(), fs());
  gl.useProgram(program);
  program.vertexPosAttrib = gl.getAttribLocation(program, 'aVertexPosition');
  gl.enableVertexAttribArray(program.vertexPosArray);
  gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
}
