var SceneEnd = function(game) {
    var s = {
        game: game
    }

    s.update = function() {

    }

    s.draw = function() {
        game.context.fillText("Game Over, 按 r 返回开始页面", game.canvas.width / 2 - 20, game.canvas.height / 2)

    }
    game.registerAction('r', function() {
        var s = SceneStart.new(game)
        game.replaceScene(s)
    })
    return s
}
