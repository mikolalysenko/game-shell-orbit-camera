"use strict"

var shell = require("gl-now")()
var createMesh = require("gl-mesh")
var simple3DShader = require("simple-3d-shader")
var attachCamera = require("../camera.js")
var glm = require("gl-matrix")
var mat4 = glm.mat4

var shader, mesh
var camera = attachCamera(shell)

camera.lookAt([0, 3, 20], [0, 3, 0], [0, 1, 0])

shell.on("gl-init", function() {
  shader = simple3DShader(shell.gl)
  mesh = createMesh(shell.gl, require("bunny"))
})

shell.on("gl-render", function(t) {
  //Bind shader
  shader.bind()

  //Set camera parameters
  var scratch = mat4.create()
  shader.uniforms.model = scratch
  shader.uniforms.projection = mat4.perspective(scratch, Math.PI/4.0, shell.width/shell.height, 0.1, 1000.0)
  shader.uniforms.view = camera.view(scratch)
  
  //Draw object
  mesh.bind(shader)
  mesh.draw()
  mesh.unbind()
})
