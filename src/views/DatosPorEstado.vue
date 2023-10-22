<template>
    <cargando v-if="!datosDeGraficosCargados || !datosDeCardsCargados"/>
    <div v-else class="d-flex w-100 flex-column align-items-center">
        <botonesNavegacion />
        <h1>Datos COVID-19 en {{ nombreDelEstado }}</h1>
        <div class="w-100 d-flex justify-content-center mb-4">
            <div class="form-group col-3">
                <label for="select-escoger-fecha">Buscar datos por fecha</label>
                <div class="d-flex flex-row gap-2">
                    <select class="form-control" name="select-escoger-fecha" id="select-escoger-fecha" v-model="fechaEscogidaId">
                        <option value=null selected>Escoge una fecha</option>
                        <option v-for="fecha in fechas" :key="fecha.id" :value="fecha.id">{{ fecha.fecha }}</option>
                    </select>
                    <button class="btn btn-primary" type="button" :disabled="!fechaEscogidaId" @click="seleccionarFecha">Seleccionar</button>
                </div>
            </div> 
        </div>

        <div class="d-flex w-100 flex-column align-items-center mb-4">
            <h5>Datos diarios</h5>
            <div class="grafico-container d-flex w-100 flex-column gap-4">
                <div id="carousel-graficas-datos-diarios" class="carousel slide" data-bs-ride="carousel">    
                    <div class="d-flex">
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <div class="carousel-inner">
                            <div class="carousel-item" v-for="(dato, index) in datosDiarios" :class="{active : index == 'positivos'}">
                                <grafico :datos="dato" :labelsInferiores="fechasFormateadas" />
                            </div>
                        </div>

                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="carousel-indicators w-100 position-relative m-0">
                        <button type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide-to="3" aria-label="Slide 3"></button>
                      </div>
                  </div>
            </div>
        </div>

        <div class="d-flex w-100 flex-column align-items-center mb-4">
            <h5>Datos acumulados</h5>
            <div class="grafico-container d-flex w-100 flex-column gap-4">
                <div id="carousel-graficas-datos-acumulados" class="carousel slide" data-bs-ride="carousel">    
                    <div class="d-flex">
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <div class="carousel-inner">
                            <div class="carousel-item" v-for="(dato, index) in datosAcumulados" :class="{active : index == 'positivos'}">
                                <grafico :datos="dato" :labelsInferiores="fechasFormateadas" />
                            </div>
                        </div>

                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="carousel-indicators w-100 position-relative m-0">
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="3" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="4" aria-label="Slide 4"></button>
                      </div>
                  </div>
            </div>
        </div>

        <div class="w-100 row gap-2 justify-content-center">
            <card
                :titulo="'Tests realizados'"
                :datoPrincipal="datosDelEstado.totalTestResults"
            />
            <card
                :titulo="'Positivos'"
                :datoPrincipal="datosDelEstado.positive"
            />
            <card
                :titulo="'Negativos'"
                :datoPrincipal="datosDelEstado.negative"
            />
            <card
                :titulo="'Hospitalizados'"
                :datoPrincipal="datosDelEstado.hospitalizedCurrently"
            />
            <card
                :titulo="'Hospitalizados en UCI'"
                :datoPrincipal="datosDelEstado.inIcuCumulative"
            />
            <card
                :titulo="'Hospitalizados con respirador'"
                :datoPrincipal="datosDelEstado.onVentilatorCumulative"
            />
            <card
                :titulo="'Fallecidos'"
                :datoPrincipal="datosDelEstado.death"
            />
            <card
                :titulo="'Recuperados'"
                :datoPrincipal="datosDelEstado.recovered"
            />
            <card
                :titulo="'Tests de anticuerpos realizados'"
                :datoPrincipal="datosDelEstado.totalTestsPeopleAntibody"
            />
            <card
                :titulo="'Tests de anticuerpos positivos'"
                :datoPrincipal="datosDelEstado.positiveTestsPeopleAntibody"
            />
            <card
                :titulo="'Tests de anticuerpos negativos'"
                :datoPrincipal="datosDelEstado.negativeTestsPeopleAntibody"
            />
        </div>
    </div>
</template>
<script>
    import { ApiService } from '../services/apiService';
    import { defineAsyncComponent, watch } from 'vue';
    import { formatearFecha, separarMilesDeUnNumero, devolverDatoValido } from '../helpers/helper.ts';

    import cargando from '../components/cargando.vue';
    import botonesNavegacion from '../components/botonesNavegacion.vue';
    const card = defineAsyncComponent(() =>
        import('../components/card.vue')
    )
    const grafico = defineAsyncComponent(() =>
        import('../components/grafico.vue')
    )

    export default {
        components: {
            grafico,
            cargando,
            card,
            botonesNavegacion
        },

        data() {
                return {
                    id: null,
                    fechaEscogidaId: null,
                    datosDelEstado: [],
                    fechas: [],
                    fechasFormateadas: [],
                    datosDiarios: {
                        positivos: {
                            label: "Casos Positivos",
                            color: "#EB5353",
                            datos: []
                        },
                        negativos: {
                            label: "Casos Negativos",
                            color: "#A951DE",
                            datos: []
                        },
                        hospitalizados: {
                            label: "Hospitalizados",
                            color: "#9BD0F5",
                            datos: []
                        },
                        
                        fallecidos: {
                            label: "Fallecidos",
                            color: "#5D5D5D",
                            datos: []
                        }
                    },
                    datosAcumulados: {
                        positivos: {
                            label: "Casos Positivos",
                            color: "#EB5353",
                            datos: []
                        },
                        negativos: {
                            label: "Casos Negativos",
                            color: "#A951DE",
                            datos: []
                        },
                        hospitalizados: {
                            label: "Hospitalizados",
                            color: "#9BD0F5",
                            datos: []
                        },
                        recuperados: {
                            label: "Recuperados",
                            color: "#73DE5D",
                            datos: []
                        },
                        fallecidos: {
                            label: "Fallecidos",
                            color: "#5D5D5D",
                            datos: []
                        }
                    },
                    datosDeGraficosCargados: false,
                    datosDeCardsCargados: false,
                }
            },
        beforeMount() {
            this.id = this.$route.params.id;
            ApiService.obtenerDatosDeUnEstado(this.id, 'current.json').then(datos => {
                if(datos) {
                    this.datosDelEstado = datos;

                    Object.keys(this.datosDelEstado).forEach(clave => {
                        if(typeof this.datosDelEstado[clave] == 'number'){
                            this.datosDelEstado[clave] = separarMilesDeUnNumero(this.datosDelEstado[clave]);
                        }
                    });

                    this.datosDeCardsCargados = true;
                }else{
                    return this.$router.push({ name: 'sin-datos'});
                }
            });

            ApiService.obtenerDatosDeUnEstado(this.id, 'info.json').then(datos => {
                if(datos) {       
                    this.nombreDelEstado = datos.name;
                }else {
                    this.nombreDelEstado = '';
                }
            });

            ApiService.obtenerDatosDeUnEstado(this.id, 'daily.json').then(datos => {
                if(datos) {
                    const datosDelEstadoPorDia = datos.reverse();

                    datosDelEstadoPorDia.forEach(dato => {
                        let nuevaFecha = {
                            id: dato.date,
                            fecha: formatearFecha(dato.date)
                        }
                        this.fechas.push(nuevaFecha);
                        this.fechasFormateadas.push(formatearFecha(dato.date));
                        this.datosDiarios.positivos.datos.push(devolverDatoValido(dato.positiveIncrease));
                        this.datosDiarios.negativos.datos.push(devolverDatoValido(dato.negativeIncrease));
                        this.datosDiarios.hospitalizados.datos.push(devolverDatoValido(dato.hospitalizedIncrease));
                        this.datosDiarios.fallecidos.datos.push(devolverDatoValido(dato.deathIncrease));
                        this.datosAcumulados.positivos.datos.push(devolverDatoValido(dato.positive));
                        this.datosAcumulados.negativos.datos.push(devolverDatoValido(dato.negative));
                        this.datosAcumulados.hospitalizados.datos.push(devolverDatoValido(dato.hospitalized));
                        this.datosAcumulados.recuperados.datos.push(devolverDatoValido(dato.recovered));
                        this.datosAcumulados.fallecidos.datos.push(devolverDatoValido(dato.death));
                    })
                    
                    this.datosDeGraficosCargados = true;
                }else {
                    return this.$router.push({ name: 'sin-datos'});
                }
            });
        },
        methods: {
            seleccionarFecha() {
                return this.$router.push({ name: 'datos-por-fecha-estado', params: { fechaId: this.fechaEscogidaId, estadoId: this.id } });
            }
        },
        watch: {
            fechaEscogidaId: function(nuevoValor) {
                if(nuevoValor == 'null'){
                    this.fechaEscogidaId = null;
                }
            }
        }
    }
</script>
<style>
    
</style>