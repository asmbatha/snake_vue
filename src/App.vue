<template>
    <div id="app">
        <board></board>
    </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
    name: 'app',
    components: {
        Board
    }
}
</script>
<style>
html, body {
    margin: 0;
    padding: 0;
    background: #CCC;
}
</style>
