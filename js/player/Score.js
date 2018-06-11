//计时器类

import {DataStore} from '../base/DataStore.js'

export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx
        this.scoreNumber = 0
        //因为canvas刷新很快，所以需要一个变量控制加分，只加一次
        this.canScore = true
    }

    draw() {
        this.ctx.font = '32px Arial'
        this.ctx.fillStyle = '#fff'
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width / 18,
            DataStore.getInstance().canvas.height / 18,
            1000
        )
    }
}