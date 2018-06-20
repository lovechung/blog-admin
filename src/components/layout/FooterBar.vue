<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    @2018 iishoni - vue admin
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    @import '~bulma/sass/utilities/_all';

    .footer {
        margin-left: 90px;

        @include mobile() {
            margin-left: 0;
        }
    }
</style>