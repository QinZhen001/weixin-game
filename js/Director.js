// 导演类，控制游戏逻辑
import {DataStore} from './base/DataStore.js'

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

    createPencil(){
        // const min
    }

    run() {
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();
            this.dataStore.get('land').draw()


            let timer = requestAnimationFrame(() => this.run())
            this.dataStore.put('timer', timer)
        } else {
            console.log('游戏结束')
            cancelAnimationFrame(this.dataStore.get('timer'))
        }
    }
}