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
  cam.setPosition(0,-(2*h/3),(h / tan(PI/6))/1.33)
  cam.lookAt(0,h*0.025,0)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

if (window.DeviceOrientationEvent) {
  window.addEventListener('orientationchange', function() { windowResized() }, false)
}

function hexes(theta) {
  g.push()
  g.strokeWeight(1)
  g.rotateY(theta)
  let r = h*0.5
  for(var j=0; j<4; j++) {
    if(random() < 0.0025) {
      g.stroke(random(ballColors))
    } else {
      g.stroke(colors[3-j])
    }
    for(var i=0; i<6; i++) {
      let x1 = cos(TWO_PI*i/6)*r
      let z1 = sin(TWO_PI*i/6)*r
      let x2 = cos(TWO_PI*(i+1)/6)*r
      let z2 = sin(TWO_PI*(i+1)/6)*r
      let y = h*0.06
      g.line(x1,0,z1,x2,0,z2)
      g.line(x1,y,z1,x2,y,z2)
      g.line(x1,0,z1,x1,y,z1)
    }
    r -= h*0.06
  }
  g.pop()
}

let ps = []
let particlesPerSecond = 250
let maxAge = 4
function particles(secs, theta) {
  let newParticleCount = ((deltaTime/1000)*particlesPerSecond)|0
  if(newParticleCount > 10) newParticleCount = 10
  for(var i=0; i<newParticleCount; i++) {
    let x = (2*random()-1)/3
    let z = (2*random()-1)/3
    let v = createVector(x,-1,z)
    ps.push({t: secs, v:v, p:createVector(x*h/20,0,z*h/20)})
  }
  g.push()
  g.rotateY(theta)
  g.strokeWeight(0.5)
  ps2 = []
  for(var i=0; i<ps.length; i++) {
    let p = ps[i]
    let age = (secs-p.t)/maxAge
    if(age < 1) {
      if(random() < 0.0075) {
        g.stroke(random(ballColors))
      } else {
        g.stroke(colors[age*colors.length|0])
      }
      g.point(p.p)
      p.v.add(0,0.014,0)
      p.p.add(p.v)
      if(p.p.y > 0) {
        p.p.y = 0
        p.v.y *= -0.2
      }
      ps2.push(p)
    }
  }
  ps = ps2
  g.pop()
}

function draw() {
  let secs = millis()/1000
  let theta = TWO_PI*secs/16
  g.clear()
  hexes(theta)
  particles(secs, theta)
  let sw = windowWidth|0
  let sh = 1/2.39*sw|0
  fill("#0a1a2f")
  rect(0,0,sw,sh)
  image(g, 0, 0, sw, sh, 0, 0, w, h)
}
