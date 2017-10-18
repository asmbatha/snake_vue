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
body {
    display: flex;
    justify-content: center;
    height: 100vh;
}
#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
