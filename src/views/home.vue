<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">One</p>
                    <p class="subtitle">Subtitle</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">Two</p>
                    <p class="subtitle">Subtitle</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">Three</p>
                    <p class="subtitle">Subtitle</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">Four</p>
                    <p class="subtitle">Subtitle</p>
                </article>
            </div>
        </div>

        <div class="tile is-ancestor">
            <div class="tile is-parent is-6">
                <article class="tile is-child box">
                    <h4 class="title">折线图</h4>
                    <chart :type="'line'" :data="seriesData" :options="options"></chart>
                </article>
            </div>
            <div class="tile is-parent is-6">
                <article class="tile is-child box">
                    <h4 class="title">条状图</h4>
                    <chart :type="'bar'" :data="seriesData" :options="options"></chart>
                </article>
            </div>
        </div>

        <div class="tile is-ancestor">
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                    <h4 class="title">圆饼图1</h4>
                    <div class="content">
                        <chart :type="'doughnut'" :data="pieData" :options="options2"></chart>
                    </div>
                </article>
            </div>
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                    <h4 class="title">圆饼图2</h4>
                    <div class="content">
                        <chart :type="'pie'" :data="pieData" :options="options2"></chart>
                    </div>
                </article>
            </div>
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                    <h4 class="title">圆饼图3</h4>
                    <div class="content">
                        <chart :type="'doughnut'" :data="pieData" :options="options2"></chart>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from 'vue-bulma-chartjs'

    export default {
        components: {
            Chart
        },

        data() {
            return {
                options: {
                    tooltips: {
                        mode: 'label'
                    }
                },
                labels: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
                data: [
                    [65, 59, 90, 81, 56, 55, 40],
                    [28, 48, 40, 19, 88, 27, 45]
                ],
                backgroundColor: [
                    'rgba(31, 200, 219, 1)',
                    'rgba(151, 205, 118, 1)'
                ],
                series: ['Product A', 'Product B'],
                options2: {
                    segmentShowStroke: false
                },
                labels2: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
                data2: [20, 40, 5, 35],
                backgroundColor2: [
                    '#1fc8db',
                    '#fce473',
                    '#42afe3',
                    '#ed6c63',
                    '#97cd76'
                ],
            }
        },
        computed: {
            seriesData() {
                let data = {
                    labels: this.labels
                };
                data.datasets = this.series.map((e, i) => {
                    return {
                        data: this.data[i],
                        label: this.series[i],
                        borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
                        pointBackgroundColor: this.backgroundColor[i],
                        backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
                    }
                });
                return data
            },
            pieData() {
                return {
                    labels: this.labels2,
                    datasets: [{
                        data: this.data2,
                        backgroundColor: this.backgroundColor2
                    }]
                }
            },
        },
        mounted() {
            setInterval(() => {
                this.data.forEach((item, i) => {
                    this.data.splice(i, 1, Math.ceil(Math.random() * 1000))
                })
            }, 1024)
        }
    }
</script>

<style scoped>

</style>