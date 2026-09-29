const {Howl, Howler} = require('howler');
// FRONT-END (CLIENT) JAVASCRIPT HERE


message = function(what) {
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


// loops before every browser repaint
loop = function() {
  console.log("start")
  // temporal recursion, call tthe function in the future
  window.requestAnimationFrame( draw )

  
}

window.onload = function() {
  console.log("Started")


}
