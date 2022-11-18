let Engine = Matter.Engine,
  Composites = Matter.Composites,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Vertices = Matter.Vertices,
  Bodies = Matter.Bodies;

// create engine
let engine;

// add mouse control
let mouse;

let arrow = Vertices.fromPath("40 0 40 30 100 30 100 70 40 70 40 100 0 50"),
  plus = Vertices.fromPath(
    "37 0 63 0 63 37 100 37 100 63 63 63 63 100 37 100 37 63 0 63 0 37 0 63 0 37 37 37"
  ),
  star = Vertices.fromPath(
    "50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38"
  ),
  horseShoe = Vertices.fromPath(
    "35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7"
  );
let concaves = [arrow, plus, star, horseShoe];

let canvas;

let matterObjs = [];
let colors = ["#FAF4C0", "#FFA7A7", "#B2CCFF", "#D1B2FF", "#F361A6"];

function createWalls(thickness) {
  let walls = [
    new Rect(width * 0.1, 0, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new Rect(width * 0.5, height, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new Rect(width, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new Rect(0, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
  ];
  walls.forEach((wall) => matterObjs.push(wall));
}

function setup() {
  let dom = document.getElementById("sketch");
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
  canvas.parent("sketch");
  engine = Engine.create();
  world = engine.world;

  Composites.stack(50, 50, 6, 10, 10, 10, function (x, y) {
    let idx = Math.floor(random(concaves.length));
    let newObj = new FromConcaveBody(
      Bodies.fromVertices(x, y, concaves[idx], null, true)
    ).setFillColor(colors[Math.floor(random(colors.length))]);
    matterObjs.push(newObj);
    return newObj.getBody();
  });

  createWalls(50);

  console.log(matterObjs);

  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.5,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(world, mouseConstraint);
}

function draw() {
  background(235);
  Engine.update(engine);
  matterObjs.forEach((obj) => {
    obj.render();
  });
}
