
// 敌机子弹
class EnemyBullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup(name)
    }

    setup(name) {
        this.life = 100
        this.speed = 6
        this.type = name
        this.damageValue = 100
        // this.w = 10
        // this.h = 10
    }

    // debug() {
    //     this.speed = config.enemy_bullet_speed
    // }
    //
    damage(point) {
        this.life -= point
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
        // 判断自己和玩家发射的子弹碰撞
        let bulletList = this.game.scene.player.bulletList
        bulletList.forEach((item) => {
            if(item.life > 0 && this.collide(item, this)){
                this.spark(item, "enemyParticle")
            }
        })
        // 以及自己和玩家碰撞
        let player = this.game.scene.player
        if(this.life > 0 && this.collide(player, this)){
            this.spark(player, "enemyParticle")
        }
    }

    death() {
        this.life = 0
        this.game.scene.removeElements(this)
        // todo 要清除掉这个在敌机中的子弹
        // this.game.scene.player.removeBullet(this)
    }

    update() {
        if(this.life > 0) {
            this.boast()
            if(this.y > this.game.canvas.height) {
                this.death()
            }
            this.y += this.speed
        }    
    }

    draw() {
        if(this.life === 0) {
            return;
        }
        super.draw()
    }
}
