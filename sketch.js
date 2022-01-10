let colors = ["#d1cb95","#40985e","#1a644e","#1a644e"]
let ballColors = ["#f00","#0f0","#00f","#ff0","#f0f","#0ff"]
let randomBallColor = () => ballColors[Math.random()*6|0]
let lastBallColorTime = 0
let ballColor = randomBallColor()
let particles = []

function setup() {
  let h = 450
  let w = 2.39*h|0
  createCanvas(w, h, WEBGL)
  noStroke()
//  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 5000)
}

function draw() {
  let s = millis()/1000
  let theta = 2*Math.PI*s/64

  let pixel = (x,y,z,c) => {
    push()
    if(random()<0.001) c = randomBallColor()
    fill(c)
    translate(x,y,z)
    rotateY(theta)
    plane(4,4)
    pop()
  }

  if(s > lastBallColorTime + .1) {
    lastBallColorTime = s
    ballColor = randomBallColor()
  }

  let ball = (x,y,z) => {
    push()
    fill(ballColor)
    translate(x,y,z)
    sphere(4,6,6)
    pop()
  }

  let addParticle = (x,y,z) => {
    let v = createVector(random()-0.5, random()-0.5, random()-0.5)
    particles.push({x: x, y: y, z: z, v: v, t: s})
  }

  let zoom = 500
  let camZ = zoom*Math.cos(theta)
  let camX = zoom*Math.sin(theta)
  camera(camX, 0, camZ, 0, 0, 0, 0, 1, 0)
  background("#0a1a2f")
  let b1x = 350 * Math.cos(2*Math.PI*s/17)
  let b1y = 100 * Math.cos(2*Math.PI*s/3)
  let b1z = 100 * Math.sin(2*Math.PI*s/3)
  ball(b1x,b1y,b1z)
  addParticle(b1x,b1y,b1z)
  addParticle(b1x,b1y,b1z)

  let b2x = 350 * Math.cos(2*Math.PI*s/17)
  let b2y = 100 * Math.cos(Math.PI+2*Math.PI*s/3)
  let b2z = 100 * Math.sin(Math.PI+2*Math.PI*s/3)
  ball(b2x,b2y,b2z)
  addParticle(b2x,b2y,b2z)
  addParticle(b2x,b2y,b2z)

  let newParticles = []
  for(var i=0; i<particles.length; i++) {
    let p = particles[i]
    let age = (s-p.t)/3
    if(age<4) {
      let c = colors[age|0]
      p.x = p.x+p.v.x*0.2
      p.y = p.y+p.v.y*0.2
      p.z = p.z+p.v.z*0.2
      pixel(p.x, p.y, p.z, c)
      newParticles.push(p)
    }
  }
  particles=newParticles
}
