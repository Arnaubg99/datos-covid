<template>
        <Bar :data="data" :options="options" />
</template>
<script>
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from 'chart.js'

    import { Bar } from 'vue-chartjs'

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

    export default {
        props: {
            datos: {
                type: Object,
                deafult: () => []
            },

            labelsInferiores: {
                type: Array,
                deafult: () => []
            },
        },

        components: {
            Bar
        },

        data() {
            return {
                data: {
                    labels: this.labelsInferiores,
                    datasets: [{
                        label: this.datos.label,
                        data: this.datos.datos,
                        backgroundColor: this.datos.color
                    }]
                },
                options: {
                    responsive: true
                }
            };
        },


    }
</script>
<style>

</style>