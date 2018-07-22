class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.enableDebugModel = true
    }

    setup() {
        this.elements = []
    }

    static new(game) {
        return new this(game)
    }

    update() {
        if(this.enableDebugModel) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update && e.update()
        }
    }

    addElements(img) {
        img.scene = this
        this.elements.push(img)
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.draw()
            // this.game.drawImage(e)
        }
    }
}
