// 敌机
class Enemy extends GuaImage {
    constructor(game, name) {
        let i = randomBetween(1, 4)
        let n = 'enemy' + i
        super(game, n)
        this.setup(n)
    }

    addBullet(b) {
        this.bulletList.push(b)
    }

    setup(name) {
        this.life = 100
        this.type = name
        this.speed = randomBetween(1, 30)
        this.x = randomBetween(0, this.game.canvas.width - 200)
        this.y = -randomBetween(0, 200)
        this.w = 60
        this.h = 60
        this.damageValue = 100
        this.currentBulletTyle = 'enemyfire' // 当前子弹的类型
        this.bulletList = [] // 飞机发射所有的子弹
        this.cooldown = randomBetween(50, 100)  // 子弹的冷却时间
    }

    damage(point) {
        // if(point > this.life){
        //     this.death()
        // }
        this.life -= point
        if(this.life === 0) {
            this.death()
        }
    }

    death() {
        // 还需要移除掉
        this.game.scene.removeEnemy(this)
    }

    fire() {
        // 设置中间位置, 敌机的开火是固定的
        if(this.cooldown === 0) {
            this.cooldown = 50
            var b = EnemyBullet.new(this.game, this.currentBulletTyle)
            var x = this.x + this.w / 2 - b.w / 2
            var y = this.y + this.h
            b.x = x
            b.y = y
            this.scene.addElements(b)
            this.addBullet(b)
        }
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

    debug() {
        this.speed = config.enemy_speed
    }

    update() {
        if(this.life > 0){
            // this.boast()
            if(this.cooldown > 0) {
                this.cooldown--
            }
            this.fire()
            this.y += this.speed
            if(this.y > this.game.canvas.height) {
                this.death()
            }
        }

    }

    spark(another, fireName) {
        let x = this.x - this.w / 2
        let y = this.y
        // 这里可以更改火花的样式
        let ps = ParticleSystems.new(this.game, x, y, fireName)
        this.game.scene.addElements(ps)
        // 2.设置life 为 0
        let d = this.damageValue // 伤害值
        this.damage(d)
        another.damage && another.damage(d)
    }


    boast() {
        // 敌极判断是否和 player碰撞
        let s = this.game.scene.player
        let player = this.game.scene.player
        if(this.life > 0 && this.collide(player, this)){
            this.spark(player, "fire1")
        }
    }



    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}
