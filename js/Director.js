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
        console.log('createPencil')
        const minTop = DataStore.getInstance().canvas.height / 8
        const maxTop = DataStore.getInstance().canvas.height / 2
        const top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }

    run() {
        this.check()
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();


            const pencils = this.dataStore.get('pencils')
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift()
                pencils.shift()
            }

            //先判断铅笔情况，再绘制铅笔
            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2
                && pencils.length === 2) {
                this.createPencil()
            }

            pencils.map(item => item.draw())


            this.dataStore.get('land').draw()
            this.dataStore.get('birds').draw()

            let timer = requestAnimationFrame(() => this.run())
            this.dataStore.put('timer', timer)
        } else {
            console.log('游戏结束')
            cancelAnimationFrame(this.dataStore.get('timer'))
        }
    }


    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('birds')
        const land = this.dataStore.get('land')
        const pencils = this.dataStore.get('pencils')
        const score = this.dataStore.get('score')

        // 小鸟边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        }

        //地板撞击的判断
        if (birdsBorder.bottom >= land.y) {
            console.log('撞击地板啦');
            this.isGameOver = true;
            return
        }

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i]
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            }

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                console.log('birdsBorder',birdsBorder)
                console.log('pencilBorder',pencilBorder)
                this.isGameOver = true;
                return;
            }
        }

    }


    static isStrike(bird, pencil) {
        let result = true
        //以下是安全情况 也就是未撞击
        if (bird.right <= pencil.left ||
            bird.left >= pencil.right ||
            bird.top >= pencil.bottom ||
            bird.bottom <= pencil.top
        ) {
            result = false
        }

        return result
    }
}