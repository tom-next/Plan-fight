class SceneStart extends Scene {
    constructor(game) {
        super(game)
        this.setup()
        this.setUpInputs()
    }

    setUpInputs() {
        let self = this
        this.game.registerAction('a', function() {
            self.player.moveLeft()
        })
        this.game.registerAction('d', function() {
            self.player.moveRight()
        })
        this.game.registerAction('w', function() {
            self.player.moveUp()
        })
        this.game.registerAction('s', function() {
            self.player.moveDown()
        })
        this.game.registerAction('f', function() {
            self.player.fire()
        })
    }

    setup() {
        // 敌机数量
        this.enemyNum = 10
        this.enemies = []
        this.bg = GuaImage.new(this.game, "sky")

        this.player = Player.new(this.game)
        this.cloud = Cloud.new(this.game)

        this.player.x = 100
        this.player.y = 200

        this.addElements(this.bg)
        this.addElements(this.cloud)
        this.addElements(this.player)

        // var ps = ParticleSystems.new(this.game, 100, 200, "fire1")
        // this.addElements(ps)

        this.addEnemy()
    }

    addEnemy() {
        let arr = []
        for (var i = 0; i < this.enemyNum; i++) {
            var e = new Enemy(this.game)
            arr.push(e)
            this.addElements(e)
        }
        this.enemies = arr
    }

    update() {
        super.update()
    }
}
