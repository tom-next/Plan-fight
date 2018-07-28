var enableDebugMode = function(game, enable) {
    if(!enable) {
        return;
    }
    window.addEventListener("keydown", function(event) {
        var k = event.key
        if(k === "p") {
            // 暂停功能
            paused = !paused
        }else if ("123456789".includes(k)) {
            // 关卡
            blocks = loadLeves(game, Number(k))
        }
    })

    // 控制速度
    document.querySelector("#id-input-speed").addEventListener("input", function(e) {
        window.fps = Number(e.target.value)
    })
}


var __main = function() {
    var images = {
        sky0: "img/bg/sky0.png",
        sky1: "img/bg/sky1.png",
        sky2: "img/bg/sky2.png",
        sky3: "img/bg/sky3.png",
        sky4: "img/bg/sky4.png",
        sky5: "img/bg/sky5.png",
        player: "img/player.png",
        cloud: "img/cloud.png",
        bullet: "img/bullet.png",
        enemy1: "img/enemy1.png",
        enemy2: "img/enemy2.png",
        enemy3: "img/enemy3.png",
        enemy4: "img/enemy4.png",
        bullet: "img/bullet.png",
        fire1: "img/fire1.png",
        fire2: "img/fire2.png",
        enemyParticle: "img/enemyParticle.png",
        enemyfire: "img/6.png",
        particle: "img/particle111.png"
    }
    // 异步记载
    var game = Game.instance(30, images, function(game) {
        var s = SceneStart.new(game)
        // var s = SceneTitle.new(game)
        game.runWithScene(s)
        enableDebugMode(game, true)
    })
}

__main()
