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
