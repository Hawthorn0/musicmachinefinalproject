const express = require('express'),
      app = express()

app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )
app.use( express.json() )

app.post( '/submit', (req, res) => {
  
})

app.post( '/debug', (req, res) => {
  console.log(req.body.message)
})

app.listen( process.env.PORT || 3000 )