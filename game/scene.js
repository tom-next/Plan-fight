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

    equalProps(a, b) {
        return a.w === b.w && a.x === b.x && a.y === b.y && a.h === b.h
    }

    removeElements(img) {
        let type = img.type
        let i = 0
        if(type) {
            this.elements.forEach((item, index) => {
                if(item.type === img.type && this.equalProps(item, img)) {
                    i = index
                }
            })
        }
        this.elements.splice(i , 1)
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.draw()
            // this.game.drawImage(e)
        }
    }
}
