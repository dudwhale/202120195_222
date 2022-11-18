let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composites = Matter.Composites,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create engine
let engine = Engine.create(),
  world = engine.world;

// create renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
  },
});

Render.run(render);

// create runner
let runner = Runner.create();
Runner.run(runner, engine);

// add bodies
let ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
  rockOptions = { density: 0.004 },
  rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
  anchor = { x: 170, y: 450 },
  elastic = Constraint.create({
    pointA: anchor,
    bodyB: rock,
    stiffness: 0.05,
  });

let pyramid = Composites.pyramid(350, 300, 11, 10, 0, 0, function (x, y) {
  return Bodies.rectangle(x, y, 40, 40);
});

let ground2 = Bodies.rectangle(600, 250, 400, 10, { isStatic: true });

let pyramid2 = Composites.pyramid(480, 0, 9, 10, 0, 0, function (x, y) {
  return Bodies.rectangle(x, y, 30, 30);
});

World.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic]);

Events.on(engine, "afterUpdate", function () {
  if (
    mouseConstraint.mouse.button === -1 &&
    (rock.position.x > 190 || rock.position.y < 430)
  ) {
    rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
    World.add(engine.world, rock);
    elastic.bodyB = rock;
  }
});

// add mouse control
let mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
