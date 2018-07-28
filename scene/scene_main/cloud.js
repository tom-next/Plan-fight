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
