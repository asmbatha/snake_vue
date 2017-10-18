<template>
    <div id="board" :style="{'grid-template-columns': `repeat(${gridSize}, ${blockSize})`,'grid-template-rows': `repeat(${gridSize}, ${blockSize})`}">
        <block v-for="(block , i) in blocks" :key="i" :block-state="block.state"></block>
    </div>
</template>

<script>
import Block from './Block.vue'

export default {
    name: 'board',
    components: {
        Block
    },
    data() {
        return {
            grid: [],
            gridSize: 10,
            blockSize: "20px",
            snake: [],
            mouth: null,
            food: null,
            direction: "right",
            nextDirection: "right",
            speed: 150,
            timeout: false,
        }
    },
    mounted: function() {
        this.generateGrids()

        document.addEventListener('keydown', (e) => {
            let Key = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40
            };
            var keycode = e.keyCode || e.which; // also for cross-browser compatible

            if(!this.timeout) this.play();

            switch (keycode) {
                case Key.LEFT:
                    if (this.direction != 'right') this.nextDirection = "left";
                    break;
                case Key.UP:
                    if (this.direction != 'down') this.nextDirection = "up";
                    break;
                case Key.RIGHT:
                    if (this.direction != 'left') this.nextDirection = "right";
                    break;
                case Key.DOWN:
                    if (this.direction != 'up') this.nextDirection = "down";
                    break;
            }
        });

    },
    methods: {
        generateGrids: function() {
            for (var i = 0; i < Math.pow(this.gridSize, 2); i++) {
                this.grid.push({ state: 'none' })
            }
        },
        setFood() {
            let i, free = false;
            while (!free) {
                i = Math.floor(Math.random() * this.grid.length)
                if (this.grid[i].state == 'none') free = !free;
            }
            this.food = i;
            this.blockState(i, 'food')
        },
        blockState(block, state) {
            if(block != null){
                this.grid[block].state = state
            }
        },
        init() {
            this.snake.map( i => this.blockState(i, 'none'))

            let i = Math.floor(this.grid.length / 2)
            this.snake = [i]
            this.mouth = i
            this.blockState(i, 'snake')

            this.blockState(this.food, 'none')
            this.setFood()

            this.direction = "right"
            this.nextDirection = "right"
        },
        play() {
            this.init();
            this.timeout = setInterval(this.processFrame, this.speed);
        },
        stop() {
            clearInterval(this.timeout)
            this.timeout = false;
            alert('Game Over')
        },
        processFrame() {
            let n = this.nextBlock()

            if (this.grid.length == (this.snake.length + 1)) this.stop();

            if (this.grid[n].state != 'food') this.blockState(this.snake.shift(), 'none')
            else this.setFood()

            if (this.grid[n].state == 'snake') this.stop();

            this.snake.push(n)
            this.mouth = n
            this.blockState(n, 'snake')

            this.direction = this.nextDirection
            // let busy = true;
            // while (this.nextDirection.length || busy) {
            //     let nd = this.nextDirection.shift()
            //     if(this.validDirection(nd)) this.direction = nd
            // }
        },
        validDirection(dir) {
            let match = {
                right: 1,
                down: 2,
                up: 3,
                left: 4
            }
            
            return Boolean(((match[this.direction] + match[dir]) != 5 ) && ((match[this.direction] - match[dir]) != 0 ));
        },
        nextBlock() {
            let next;
            switch (this.direction) {
                case 'right':
                    if ((this.mouth + 1) % this.gridSize == 0) next = this.mouth - (this.gridSize - 1)
                    else next = this.mouth + 1
                    break;
                case 'left':
                    if (this.mouth == 0 || this.mouth % this.gridSize == 0) next = this.mouth + this.gridSize - 1
                    else next = this.mouth - 1
                    break;
                case 'up':
                    if ((this.mouth + 1) <= this.gridSize) next = this.mouth + (this.gridSize * (this.gridSize - 1))
                    else next = this.mouth - this.gridSize
                    break;
                case 'down':
                    if ((this.mouth + 1) > (this.gridSize * (this.gridSize - 1))) next = this.mouth - (this.gridSize * (this.gridSize - 1))
                    else next = this.mouth + this.gridSize
                    break;
            }
            if (next < 0) next = 0
            return next;
        }
    },
    computed: {
        blocks: function() {
            return this.grid
        }
    }
}
</script>

<style scoped>
#board {
    display: grid;
    grid-gap: 1px;
}
</style>
