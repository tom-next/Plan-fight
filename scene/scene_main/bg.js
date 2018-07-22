var Bg = function(game, name) {
    var o = game.imageByName(name)
    o.x = 0
    o.y = 0
    o.w = game.canvas.width
    o.h = game.canvas.height
    return o
}
