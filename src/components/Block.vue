<template>
    <div class="block"></div>
</template>

<script>
export default {
    name: 'block',
    mounted() {
        // console.log()
        // console.log('snake is here', this.snake)
        // if(this.snake != 'no') console.log('snake is here', this.snake)
    }
}
</script>

<style scoped>
.block {
    background: #FFF;
}
[block-state="snake"] {
    background: #378;
}
[block-state="food"] {
    background: #9B3;
}
</style>
