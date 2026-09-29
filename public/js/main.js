// FRONT-END (CLIENT) JAVASCRIPT HERE


message = function(what) {
  const json = { message: what}

  fetch( '/debug', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify( json )
  })
}

window.onload = function() {
  console.log("Started")


}
