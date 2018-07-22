const config = {
    player_speed: 10,
    cloud_speed: 1,
    bullet_speed: 3,
    fire_cooldown: 9,
    enemy_speed: 4,
}

class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }

    static new(game, name) {
        return new this(game, name)
    }

    update() {

    }

    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    collide(o, ball) {
        var a = o
        var b = ball
        var aInb = this.aInb
        if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

    draw() {
        this.game.drawImage(this)
    }
}

// 逻辑上来看不应该继承 guaimage, 但是目前先这样做了
class Player extends GuaImage {
    constructor(game, name) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.coolDown = 0
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
        if(this.y < 0) {
          this.y = 0
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

    fire() {
        // 设置中间位置
        if( this.coolDown === 0) {
            this.coolDown = config.fire_cooldown
            var b = Bullet.new(this.game, "bullet")
            var x = this.x + this.w / 2 - b.w / 2
            var y = this.y
            b.x = x
            b.y = y
            this.scene.addElements(b)
        }
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}

// 敌机
class Enemy extends GuaImage {
    constructor(game, name) {
        let i = randomBetween(1, 4)
        let n = 'enemy' + i
        super(game, n)
        this.setup()
    }

    damage(point) {
        this.life -= point
    }

    setup() {
        this.life = 100
        this.speed = 4
        this.x = randomBetween(0, this.game.canvas.width - 200)
        this.y = -randomBetween(0, 200)
    }

    debug() {
        this.speed = config.enemy_speed
    }

    update() {
        this.y += this.speed
        if(this.y > this.game.canvas.height) {
            this.setup()
        }
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}

// 云
class Cloud extends GuaImage {
    constructor(game, name) {
        super(game, 'cloud')
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, this.game.canvas.width - 200)
        this.y = -this.h
    }

    debug() {
        this.speed = config.cloud_speed
    }

    update() {
        this.y += this.speed
        if(this.y > this.game.canvas.height) {
            this.setup()
        }
    }
}

// 玩家子弹
class Bullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }

    setup() {
        this.life = 100
        this.speed = 3
    }

    debug() {
        this.speed = config.bullet_speed
    }

    damage(point) {
        this.life -= point
    }

    boast() {
        let enemies = this.game.scene.enemies
        enemies.forEach((item) => {
            if(item.life > 0 && this.collide(item, this)){
                // 相撞
                // 1.添加火花效果
                let x = this.x - this.w / 2
                let y = this.y
                let ps = ParticleSystems.new(this.game, x, y, "fire1")
                this.game.scene.addElements(ps)
                // 2.设置life 为 0
                this.damage(100)
                item.damage(100)
            }
        })
    }

    death() {
        this.life = 0
    }

    update() {
        if(this.life > 0) {
            // 拿到所有的敌机, 判断相撞
            this.boast()
        }
        if(this.y === 0) {
            this.death()
        }
        this.y -= this.speed
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}

// 敌机子弹
class EnemyBullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }

    setup() {
        this.life = 100
        this.speed = 5
    }

    debug() {
        this.speed = config.bullet_speed
    }

    damage(point) {
        this.life -= point
    }

    boast() {

    }

    death() {
        this.life = 0
    }

    update() {
        if(this.life > 0) {
            // 拿到所有的敌机, 判断相撞
            this.boast()
        }
        if(this.y === 0) {
            this.death()
        }
        this.y -= this.speed
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}
