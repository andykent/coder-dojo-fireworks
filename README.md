coder-dojo-fireworks
====================

Bonfire Night session for Coder Dojo London

Getting Started
---------------

Visit http://jsbin.com/asoqad/1/edit and start playing.


DSL
---

    // launch a firework
    fireworks.make().launch()

    // set some options
    fireworks.make({ colour:'red' }).launch()

    // delay a launch
    fireworks.make().launch_in(2)

    // launch every 2 seconds 3 times in a row starting in 3 seconds
    fireworks.make({repeat: 3, wait: 2}).launch_in(3)


Tasks
-----

- can you make a red firework?
- can you make a firework go from bottom left to top/bottom right?
- can you make 2 go at once?
- loop for fireworks
- fireworks at different times
 
Firework Display

background image, skyline

writing your name
draw on canvas, follow mouse, sparkler

Click events to trigger stuff

stars


Thanks
------

This project makes heavy use of the creative.js Fireworks library by Paul Lewis. Thanks for making it awesome.
You can find the full repo and write up at:

https://github.com/paullewis/
http://creativejs.com/tutorials/creating-fireworks/
