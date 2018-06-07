// 导演类，控制游戏逻辑
import {DataStore} from './base/DataStore.js'
import {UpPencil} from './runtime/UpPencil.js'
import {DownPencil} from './runtime/DownPencil.js'

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance
    }

    constructor() {
        this.dataStore = DataStore.getInstance()
        this.moveSpeed = 2
    }

    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8
        const maxTop = DataStore.getInstance().canvas.height / 2
        const top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }

    run() {
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();
            this.dataStore.get('land').draw()

            const pencils = this.dataStore.get('pencils')
            if (pencils[0].x + pencils.width <= 0 && pencils.length === 4) {
                pencils.shift()
                pencils.shift()
            }

            //先判断铅笔情况，再绘制铅笔
            if (pencils[0].x <= (DataStore.getInstance().canvas.width) / 2 && pencils.length === 2) {
                this.createPencil()
            }

            pencils.map(item => item.draw())
            console.log(pencils.length)


            let timer = requestAnimationFrame(() => this.run())
            this.dataStore.put('timer', timer)
        } else {
            console.log('游戏结束')
            cancelAnimationFrame(this.dataStore.get('timer'))
        }
    }
}