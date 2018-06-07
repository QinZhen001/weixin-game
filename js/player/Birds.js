// 小鸟类
// 循环渲染三只小鸟
import {Sprite} from '../base/Sprite.js'
import {DataStore} from '../base/DataStore.js'

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds')
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height)

        //小鸟的状态用一个数组去存储
        //小鸟的宽是34 高24 上下边距10 小鸟的左右9
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ]
        this.clippingY = [10, 10, 10]
        this.clippingWidth = [34, 34, 34]
        this.clippingHeight = [24, 24, 24]
        const birdX = DataStore.getInstance().canvas.width / 4
        const birdY = DataStore.getInstance().canvas.height / 2
        this.birdsX = [birdX, birdX, birdX]
        this.birdsY = [birdY, birdY, birdY]
        const birdWidth = 34
        const birdHeight = 24
        this.birdsWidth = [birdWidth, birdWidth, birdWidth]
        this.birdHeight = [birdHeight, birdHeight, birdHeight]
        this.y = [birdY, birdY, birdY]
        this.index = 0
        this.count = 0
        this.time = 0
    }


}