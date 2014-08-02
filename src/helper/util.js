createShader = function(gl, str, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, str);
  gl.compileShader(shader);
  return shader;
}

exports.createProgram = function(gl, vstr, fstr) {
  var program = gl.createProgram();
  var vshader = createShader(gl, vstr, gl.VERTEX_SHADER);
  var fshader = createShader(gl, fstr, gl.FRAGMENT_SHADER);
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  return program;
}
