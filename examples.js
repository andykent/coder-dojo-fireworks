
// 1
fireworks.make().launch()



// 2
fireworks.make({ colour:'red' }).launch()



// 3
fireworks.make({ x:100 }).launch()



// 4 a
fireworks.make({ x:100, height: 400 }).launch()



// 4 b
fireworks.make({ x:300, height: 400, direction: -2 }).launch()
fireworks.make({ x:300, height: 400, direction: 2 }).launch()



// 5
fireworks.make({ colour:'red' }).launch()
fireworks.make({ colour:'blue' }).launch()


// 6
fireworks.make({ colour:'red' }).launch()
fireworks.make({ colour:'blue' }).launch_in(2)



// 7
fireworks.make({ repeat:5 }).launch()



// 8
fireworks.make({ repeat:5, wait:2 }).launch()



// 9
fireworks.make({
  colour:'red',
  x: 150,
  repeat: 5,
  wait: 4
}).launch(1)

fireworks.make({
  colour:'blue',
  x: window.innerWidth - 150,
  repeat: 5,
  wait: 4
}).launch_in(2)



// 10
fireworks.on_click(function(x,y) { fireworks.explode_at({ x:x, y:y }) })
fireworks.on_click(function(x,y) { fireworks.explode_at({ x:x, y:y, type: 'star' }) })
fireworks.on_move(function(x,y) { fireworks.explode_at({ x:x, y:y }, type: 'smallCircle') })
