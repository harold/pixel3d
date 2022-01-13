let h = 128
let w = 2.39*h|0
let colors = ["#d1cb95","#40985e","#1a644e","#04373b"]
let ballColors = ["#f00","#0f0","#00f","#ff0","#f0f","#0ff"]
let g

function setup() {
  createCanvas(windowWidth, windowHeight)
  noSmooth()
  g = createGraphics(w, h, WEBGL)
  g.noSmooth()
  let cam = g.createCamera()
  cam.perspective(PI/6, w/h, 0.1, 999)
  cam.setPosition(0,-h/2,(h / tan(PI/6))/1.33)
  cam.lookAt(0,h*0.025,0)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

if (window.DeviceOrientationEvent) {
  window.addEventListener('orientationchange', function() { windowResized() }, false)
}

function draw() {
  let secs = millis()/1000
  let theta = TWO_PI*secs/32
  g.clear()
  g.push()
  g.strokeWeight(1)
  g.rotateY(theta)
  let r = h*0.5
  for(var j=0; j<4; j++) {
    g.stroke(colors[3-j])
    for(var i=0; i<6; i++) {
      let x1 = cos(TWO_PI*i/6)*r
      let z1 = sin(TWO_PI*i/6)*r
      let x2 = cos(TWO_PI*(i+1)/6)*r
      let z2 = sin(TWO_PI*(i+1)/6)*r
      g.line(x1,0,z1,x2,0,z2)
      let y = h*0.05
      g.line(x1,y,z1,x2,y,z2)
      g.line(x1,0,z1,x1,y,z1)
    }
    r -= h*0.066
  }
  g.pop()
  let sw = windowWidth|0
  let sh = 1/2.39*sw|0
  fill("#0a1a2f")
  rect(0,0,sw,sh)
  image(g, 0, 0, sw, sh, 0, 0, w, h)
}
