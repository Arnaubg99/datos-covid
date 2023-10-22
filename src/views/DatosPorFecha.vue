<template>
    <cargando v-if="!datosCargados"/>
    <div v-else>
        <botonesNavegacion />
        <h1 class="text-center mb-4">Datos COVID-19 en Estados Unidos de la fecha {{ datos.date }}</h1>
        <div class="row gap-2 justify-content-center">
            <card
                :titulo="'Tests realizados'"
                :datoPrincipal="datos.totalTestResultsIncrease"
                :datoSecundario="datos.totalTestResults"
            />

            <card
                :titulo="'Positivos'"
                :datoPrincipal="datos.positiveIncrease"
                :datoSecundario="datos.positive"
            />

            <card
                :titulo="'Negativos'"
                :datoPrincipal="datos.negativeIncrease"
                :datoSecundario="datos.negative"
            />

            <card
                :titulo="'Hospitalizados'"
                :datoPrincipal="datos.hospitalizedIncrease"
                :datoSecundario="datos.hospitalizedCurrently"
            />

            <card
                :titulo="'Hospitalizados en UCI'"
                :datoPrincipal="datos.inIcuCurrently"
                :datoSecundario="datos.inIcuCumulative"
            />

            <card
                :titulo="'Hospitalizados con respirador'"
                :datoPrincipal="datos.onVentilatorCurrently"
                :datoSecundario="datos.onVentilatorCumulative"
            />

            <card
                :titulo="'Fallecidos'"
                :datoPrincipal="datos.deathIncrease"
                :datoSecundario="datos.death"
            />

            <card
                :titulo="'Recuperados'"
                :datoPrincipal="datos.recovered"
            />

        </div>
    </div>
</template>
<script>
    import { ApiService } from '../services/apiService';
    import { defineAsyncComponent } from 'vue';
    import { formatearFecha, separarMilesDeUnNumero } from '../helpers/helper.ts';

    import cargando from '../components/cargando.vue';
    import botonesNavegacion from '../components/botonesNavegacion.vue';
    const card = defineAsyncComponent(() =>
        import('../components/card.vue')
    )

    export default {
        components: {
            card,
            cargando,
            botonesNavegacion
        },
        data() {
            return {
                id: null,
                datos:  [],
                datosCargados: false
            }
        },
        beforeMount() {
            this.id = this.$route.params.id;
            ApiService.obtenerDatosDeUnaFecha(this.id).then(datos => {
                if(datos){
                    this.datos = datos;
                    this.datos.date = formatearFecha(this.datos.date);

                    Object.keys(this.datos).forEach(clave => {
                        if(typeof this.datos[clave] == 'number'){
                            this.datos[clave] = separarMilesDeUnNumero(this.datos[clave]);
                        }
                    });
                    
                    this.datosCargados = true;
                }else {
                    return this.$router.push({ name: 'sin-datos'});
                }
            });
        }
    }
</script>
<style>
    
</style>