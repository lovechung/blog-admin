<template>
    <div id="app">
        <router-view class="animated"/>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">

    .animated {
        animation-duration: .377s;
    }

    #html {
        background-color: whitesmoke;
        font: 14px/20px "Lato", Arial, sans-serif;
    }

    #nprogress {
        $color: #9966FF;

        .bar {
            background: $color;
        }

        .peg {
            box-shadow: 0 0 10px $color, 0 0 5px $color;
        }
    }

</style>
