<template>
    <cargando v-if="!datosCargados"/>
    <div v-else class="d-flex w-100 flex-column align-items-center">
        <botonesNavegacion />
        <h1>Datos COVID-19 en {{ nombreDelEstado }} del dia {{ fecha }}</h1>
        <div class="w-100 row gap-2 justify-content-center">
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
                :datoPrincipal="datos.hospitalizedCurrently"
                :datoSecundario="datos.hospitalized"
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

            <card
                :titulo="'Tests de anticuerpos realizados'"
                :datoPrincipal="datos.totalTestsPeopleAntibody"
            />

            <card
                :titulo="'Tests de anticuerpos positivos'"
                :datoPrincipal="datos.positiveTestsPeopleAntibody"
            />

            <card
                :titulo="'Tests de anticuerpos negativos'"
                :datoPrincipal="datos.negativeTestsPeopleAntibody"
            />
        </div>
    </div>
</template>
<script>
    import { ApiService } from '../services/apiService';
    import { defineAsyncComponent } from 'vue';
    import { formatearFecha, separarMilesDeUnNumero, devolverDatoValido } from '../helpers/helper.ts';

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
                estadoId: null,
                fechaId: null,
                fecha: null,
                nombreDelEstado: null,
                datos:  [],
                datosCargados: false
            }
        },
        beforeMount() {
            this.estadoId = this.$route.params.estadoId;
            this.fechaId = this.$route.params.fechaId;
            this.fecha = formatearFecha(this.fechaId);

            ApiService.obtenerDatosDeUnEstado(this.estadoId, 'info.json').then(datos => {
                if(datos) {       
                    this.nombreDelEstado = datos.name;
                }else {
                    this.nombreDelEstado = '';
                }
            });

            ApiService.obtenerDatosDeUnaFechaYEstado(this.fechaId, this.estadoId).then(datos => {
                if(datos) {
                    this.datos = datos;

                    Object.keys(this.datos).forEach(clave => {
                        if(typeof this.datos[clave] == 'number'){
                            this.datos[clave] = separarMilesDeUnNumero(this.datos[clave]);
                        }
                    });

                    this.datosCargados = true;
                }else {
                    return this.$router.push({ name: 'sin-datos'});
                }
            })
        }
    }
</script>
<style>
    
</style>