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
        this.enemyNum = 5
        this.enemies = []
        this.bg = GuaImage.new(this.game, "sky3")

        this.player = Player.new(this.game)
        this.cloud = Cloud.new(this.game)

        this.player.x = 100
        this.player.y = 200

        this.addElements(this.bg)
        this.addElements(this.player)
        this.addElements(this.cloud)
        
        this.addEnemy(this.enemyNum)
    }

    addEnemy(number) {
        let arr = []
        for (var i = 0; i < number; i++) {
            var e = new Enemy(this.game)
            arr.push(e)
            this.addElements(e)
        }
        this.enemies = arr
    }

    equalProps(a, b) {
        return a.w === b.w && a.x === b.x && a.y === b.y && a.h === b.h
    }

    removeEnemy(enemy) {
        let i = 0
        this.enemies.forEach((item, index) => {
            if(item.type === enemy.type && this.equalProps(enemy, item)){
                // 找到了
                i = index
            }
        })
        this.game.scene.removeElements(enemy)
        this.enemies.splice(i , 1)
    }

    checkEnemy() {
        if(this.enemies.length === 0) {
            // 自动生成敌机, 这里还需要修改目前先随机生成敌机
            const n = randomBetween(1, 6)
            this.addEnemy(n)
        }
    }


    update() {
        // 实时判断场景中敌机的数量
        this.checkEnemy()
        super.update()
    }
}
