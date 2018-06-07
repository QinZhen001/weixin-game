//游戏开始的入口

import {DataStore} from './js/base/DataStore.js'
import {Director} from './js/Director.js'
import {ResourceLoader} from './js/base/ResourceLoader.js'
import {BackGround} from './js/runtime/BackGround.js'
import {Land} from './js/runtime/Land.js'

export class Main {
    constructor() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext('2d')
        this.dataStore = DataStore.getInstance()
        this.director = Director.getInstance()
        const loader = ResourceLoader.create()
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas
        this.dataStore.ctx = this.ctx
        this.dataStore.res = map
        this.init()
    }

    init() {
        this.director.isGameOver = false
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)

        //创建铅笔要在游戏逻辑运行之前
        this.director.createPencil()
        this.director.run();
    }
}