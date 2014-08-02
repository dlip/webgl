var util = require('./helper/util');
var vs = require('./shader/vertex.c');
var fs = require('./shader/fragment.c');

window.onerror = function(message, url, linenumber) {
  alert('JavaScript error: ' + message + ' on line ' + linenumber + ' for ' + url);
}

window.onload = function(){
  var c = document.getElementById('c');
  var gl = c.getContext("webgl") || c.getContext("experimental-webgl");

  gl.clearColor(0,0,0.8,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  var vertexPosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
  var vertices = [-0.5, -0.5, 0.5, -0.5, 0, 0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  var program = util.createProgram(gl, vs(), fs());
  gl.useProgram(program);
  program.vertexPosAttrib = gl.getAttribLocation(program, 'pos');
  gl.enableVertexAttribArray(program.vertexPosArray);
  gl.vertexAttribPointer(program.vertexPosAttrib, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
