let Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

let engine;
let world;
let particles = [];
let plinkos = [];
let bounds = [];
let cols = 13;
let rows = 10;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;

  function collision(event) {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA == "particle" && labelB == "plinko") {
      }
      if (labelA == "plinko" && labelB == "particle") {
      }
    }
  }

  Events.on(engine, "collisionStart", collision);

  newParticle();
  let spacing = width / cols;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols + 1; i++) {
      let x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      let y = spacing + j * spacing;
      let p = new Plinko(x, y, 15, 15);
      plinkos.push(p);
    }
  }

  let b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);

  for (let i = 0; i < cols + 2; i++) {
    let x = i * spacing;
    let h = 100;
    let w = 7;
    let y = height - h / 2;
    let b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
}

function newParticle() {
  let p = new Particle(300, 0, 10);
  particles.push(p);
}

function draw() {
  background(0, 0, 0);
  if (frameCount % 20 == 0) {
    newParticle();
  }
  Engine.update(engine, 1000 / 30);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (let i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
}
