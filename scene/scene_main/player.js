// 逻辑上来看不应该继承 guaimage, 但是目前先这样做了
class Player extends GuaImage {
    constructor(game, name) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.w = 70
        this.h = 70
        this.coolDown = 0
        this.currentBulletTyle = 'bullet' // 当前子弹的类型
        this.bulletList = [] // 飞机发射所有的子弹
    }

    update() {
        if(this.coolDown > 0) {
            this.coolDown--
        }
    }

    debug() {
        this.speed = config.player_speed
    }

    moveLeft() {
        if(this.x < 0) {
          this.x = 0
        }else {
          this.x -= this.speed
        }
    }

    moveRight() {
        var w = this.game.canvas.clientWidth - this.game.scene.player.w
        if(this.x > w) {
          this.x = w
        }else {
          this.x += this.speed
        }
    }

    moveUp() {
        let h = this.game.scene.player.h
        if(this.y === h) {
          this.y = h
        }else {
          this.y -= this.speed
        }
    }

    moveDown() {
        var w = this.game.canvas.clientHeight - this.game.scene.player.h
        if(this.y > w) {
          this.y = w
        }else {
          this.y += this.speed
        }
    }

    addBullet(b) {
        this.bulletList.push(b)
    }

    equalProps(a, b) {
        return a.w === b.w && a.x === b.x && a.y === b.y && a.h === b.h
    }

    removeBullet(bullet) {
        let type = bullet.type
        let i = 0
        if(type) {
            this.bulletList.forEach((item, index) => {
                if(item.type === bullet.type && this.equalProps(item, bullet)) {
                    i = index
                }
            })
        }
        this.bulletList.splice(i , 1)
    }

    clearBullet() {
        this.bulletList = []
    }


    damage() {

    }

    fire() {
        // 设置中间位置
        if( this.coolDown === 0) {
            this.coolDown = config.fire_cooldown
            var b = Bullet.new(this.game, this.currentBulletTyle)
            var x = this.x + this.w / 2 - b.w / 2
            var y = this.y
            b.x = x
            b.y = y
            // b.w = 70
            // b.h = 80
            this.scene.addElements(b)
            this.addBullet(b)
        }
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}
