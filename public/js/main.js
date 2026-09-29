// FRONT-END (CLIENT) JAVASCRIPT HERE


import { Howl } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm';
import Matter from 'https://cdn.jsdelivr.net/npm/matter-js@0.20.0/+esm'

let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

let engine
let render
let ground
let runner


const message = function(what) {
  const json = { message: what}

  fetch( '/debug', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify( json )
  })
}

// PIANO ID = 0
// NOTE IDs = (C2 = 0, C#2 = 1, D2 = 2, C3 = 12, C4 = 24)
// SOUND FORMATTING IS assets/sounds/InstrumentID_NoteID.wav, so Piano C3 is assets/sounds/0_12.wav
const playNote = function(intrumentID, noteID, volume) {
  let sound = new Howl({
    src: ['assets/sounds/' + intrumentID + '_' + noteID + '.wav'],
    autoplay: true,
    volume: volume,
  });
}


const makePhysics = function() {
  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine
  });
  
  // boxA = Bodies.rectangle(400, 200, 80, 80);
  // boxB = Bodies.rectangle(450, 50, 80, 80);
  addBlock(400, 200, 80, 80)
  addBlock(450, 50, 80, 80)
  ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // adds everything to the world
  Composite.add(engine.world, [ground]);
  
  Render.run(render);
  runner = Runner.create();
  Runner.run(runner, engine);

  addBlock(500, 300, 60, 60)
}

const addBlock = function(x, y, width, height) {
  let block = Bodies.rectangle(x, y, width, height)
  Composite.add(engine.world, [block]);
}


// loops before every browser repaint
const loop = function() {
  console.log("start")
  // temporal recursion, call tthe function in the future
  window.requestAnimationFrame( draw )
}

window.onload = function() {
  console.log("Started")
  makePhysics()

  playNote(0, 0, 1)


}
