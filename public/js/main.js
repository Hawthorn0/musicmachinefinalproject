// FRONT-END (CLIENT) JAVASCRIPT HERE


import { Howl } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm';
import Matter from 'https://cdn.jsdelivr.net/npm/matter-js@0.20.0/+esm'

let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Events = Matter.Events;

let engine
let render
let runner


const message = function (what) {
  const json = { message: what }

  fetch('/debug', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json)
  })
}

// PIANO ID = 0
// NOTE IDs = (C2 = 0, C#2 = 1, D2 = 2, C3 = 12, C4 = 24)
// SOUND FORMATTING IS assets/sounds/InstrumentID_NoteID.wav, so Piano C3 is assets/sounds/0_12.wav
const playNote = function (intrumentID_noteID, volume) {
  let sound = new Howl({
    src: ['assets/sounds/' + intrumentID_noteID + '.wav'],
    autoplay: true,
    volume: volume,
  });
}


const makePhysics = function () {
  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine,

  });

  // boxA = Bodies.rectangle(400, 200, 80, 80);
  // boxB = Bodies.rectangle(450, 50, 80, 80);
  addBlock(400, 500, 80, 80, "0_0")
  addBlock(450, 450, 80, 80, "0_2")
  addBlock(200, 500, 80, 80, "0_1")
  addKillBox(400, 610, 810, 60)

  Render.run(render);
  runner = Runner.create();
  Runner.run(runner, engine);

  addEntity(500, 300, 30)

  //https://github.com/liabru/matter-js/blob/master/examples/events.js

  Events.on(engine, 'collisionStart', function (event) {
    let pairs = event.pairs;


    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      if (pair.bodyA.label == "kill" && pair.bodyB.label != "kill") {
        Composite.remove(engine.world, pair.bodyB);
      } else if (pair.bodyA.label != "kill" && pair.bodyB.label == "kill") {
        Composite.remove(engine.world, pair.bodyA);
      } else if (pair.bodyA.label != "entity" || pair.bodyB.label == "entity") {
        playNote(pair.bodyA.label, 1)
      } else if (pair.bodyA.label == "entity" || pair.bodyB.label != "entity") {
        playNote(pair.bodyB.label, 1)
      }
    }
  });

  let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  Composite.add(engine.world, mouseConstraint);

  render.mouse = mouse;

  Events.on(mouseConstraint, 'mousedown', function (event) {
    let mousePosition = event.mouse.position;
    console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
  });

  Events.on(mouseConstraint, 'mouseup', function (event) {
    let mousePosition = event.mouse.position;
    console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);
  });

  Events.on(mouseConstraint, 'startdrag', function (event) {
    console.log('startdrag', event);
  });

  Events.on(mouseConstraint, 'enddrag', function (event) {
    console.log('enddrag', event);
  });
}

const addEntity = function (x, y, radius) {
  let block = Bodies.circle(x, y, radius, { label: "entity" })
  Composite.add(engine.world, [block]);
}

const addBlock = function (x, y, width, height, tag) {
  let block = Bodies.rectangle(x, y, width, height, { label: tag, isStatic: true })
  block.collisionFilter = { category: 1, mask: 1, group: 0 };
  Composite.add(engine.world, [block]);
}

const addKillBox = function (x, y, width, height) {
  let block = Bodies.rectangle(x, y, width, height, { label: "kill", isStatic: true })
  Composite.add(engine.world, [block]);
}


// loops before every browser repaint
const loop = function () {
  console.log("start")
  // temporal recursion, call tthe function in the future
  window.requestAnimationFrame(draw)
}

window.onload = function () {
  console.log("Started")
  makePhysics()

}
