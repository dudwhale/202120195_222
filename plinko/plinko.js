function Plinko(x, y, w, h) {
  let options = {
    restitution: 2,
    friction: 0,
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.body.label = "plinko";
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

Plinko.prototype.show = function () {
  noStroke();
  fill(255);
  let pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rect(0, 0, this.w, this.h);
  pop();
};
