
// 玩家子弹
class Bullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup(name)
    }

    setup(name) {
        this.life = 100
        this.speed = 100
        this.type = name
    }

    debug() {
        this.speed = config.bullet_speed
    }

    damage(point) {
        if(this.life === 0) {
            this.death()
            // return;
        }
        this.life -= point
    }

    boast() {
        let enemies = this.game.scene.enemies
        enemies.forEach((item) => {
            if(item.life > 0 && this.collide(item, this) && this.life > 0){
                // 相撞
                // 1.添加火花效果
                let x = this.x - this.w / 2
                let y = this.y
                let ps = ParticleSystems.new(this.game, x, y, "wsparticle_smoke03")
                this.game.scene.addElements(ps)
                // 2.设置life 为 0
                let d = 100 // 伤害值
                this.damage(d)
                item.damage(d)
            }
        })
    }

    death() {
        // 应该从所有的场景中删掉这个
        // 并且在飞机所发射的所有的子弹数组中删除自己
        log("死亡")
        this.game.scene.removeElements(this)
        this.game.scene.player.removeBullet(this)
    }

    update() {
        if(this.life > 0) {
            // 拿到所有的敌机, 判断相撞
            this.boast()
            if(this.y < 0) {
                this.death()
            }else {
                this.y -= this.speed
            }
        }
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}
