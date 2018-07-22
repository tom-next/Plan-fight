class Label {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text) {
        return new this(game, text)
    }

    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
}

class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        // log(game)
        var label = Label.new(game, 'hello')
        this.addElements(label)
        var ps = ParticleSystems.new(game, 100, 200, "fire1")
        this.addElements(ps)
    }
}


class Particles extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }

    setup() {
        this.life = 10
    }

    init(x, y , vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.w = 60
        this.h = 60
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var fac = 0.001
        this.vx += fac * this.vx
        this.vy += fac * this.vy
    }

}


class ParticleSystems {
    constructor(game, x, y, name) {
        this.game = game
        this.setup(x, y, name)
    }

    static new(game, x, y, name) {
        return new this(game, x, y, name)
    }

    setup(x, y, name) {
        this.x = x
        this.y = y
        this.name = name
        this.numberOfParticles = 10
        this.duration = 10
        this.particles = []
    }

    update() {
        this.duration--
        // 添加小火花
        if(this.particles.length < this.numberOfParticles) {
            var p = Particles.new(this.game, this.name)
            // 设置初始化坐标, 这里应该采用实际重力加速度来表示
            var s = 1.5
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles.filter(p => p.life > 0)
    }

    draw() {
        if(this.duration < 0) {
            // TODO: 这是一个临时的方案，应该从 scene 中删掉自己才对
            return;
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}
