//铅笔的基类
import {Sprite} from '../base/Sprite.js'
import {DataStore} from '../base/DataStore.js'
import {Director} from  '../Director.js'

export class Pencil extends Sprite {
    constructor(image, top) {
        super(image,
            0, 0,
            image.width,
            image.height,
            //在右侧看不见的位置
            DataStore.getInstance().canvas.width + 10, 0,
            image.width, image.height)
        this.top = top
        this.moveSpeed = Director.getInstance().moveSpeed
    }

    draw() {
        this.x = this.x - this.moveSpeed
        super.draw()
    }
}