class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        // timer
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext("2d")

        // events
        var self = this
        window.addEventListener("keydown", function(event) {
            self.keydowns[event.key] = true
        })

        window.addEventListener("keyup", function(event) {
            self.keydowns[event.key] = false
        })

        this._init()
    }
    static instance(...arg) {
        this.i = this.i || new this(...arg)
        return this.i
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    // drawImage
    drawImage(img) {
        if(img.w){
            this.context.drawImage(img.texture, img.x, img.y, img.w, img.h)
        } else {
            this.context.drawImage(img.texture, img.x, img.y)
        }
    }

    runloop() {
        // update
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 被按下
                g.actions[key]()
            }
        }
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }

    _init() {
        var g = this
        var loads = []
        var names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            let n = names[i]
            let path = this.images[n]

            let img = new Image()
            img.src = path

            img.onload = function() {
                // 加载完成之后，启动游戏
                g.images[n] = img
                loads.push(1)
                if( loads.length === names.length) {
                    g.run()
                }
            }
        }
    }

    textureByName(name) {
        var g = this
        // log('image by name', g.images)
        var img = g.images[name]

        return img
    }

    replaceScene(scene) {
        this.scene = scene
    }

    update() {
        this.scene && this.scene.update()
    }

    draw() {
        this.scene && this.scene.draw()
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        setTimeout(function() {
            g.runloop()
        }, 1000 / fps)
    }

    run() {
        this.runCallback(this)
    }
}
