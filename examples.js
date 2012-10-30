canvas


// 1
fireworks.launch()


// 2
fireworks.launch({ colour: 'red' })


// 3
fireworks.launch({ speed: 50 })


// 4
fireworks.launch({ angle: 180 })


// 5
fireworks.launch({ x: 50 })


// 6
function launchMyRocket(x) {
 fireworks.launch({x:x})
}

[20,30,40].each(lauchMyRocket)


// 7
fireworks.launchIn(1, {})
fireworks.launchEvery(1, {})


// 8
fireworks.setBackground('http://blah.com')


// DISPLAY!


// 9
function launchHere(x,y) {
  fireworks.launch({ x: x, y: y})
}

fireworks.onClick(launchHere)


// 10
function drawHere(x,y) {
  fireworks.spark({ x: x, y: y})
}

fireworks.onMove(drawHere)


// 11
function drawHere(x,y) {
  fireworks.spark({ x: x, y: y, colour: '#ff0000'})
}

fireworks.onMove(drawHere)
