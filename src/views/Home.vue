<template>
    <cargando v-if="!datosDeGraficosCargados || !datosDeCardsCargados"/>
    <div v-else class="d-flex w-100 flex-column align-items-center">
        <h1>Datos COVID-19 en Estados Unidos</h1>
        <div class="w-100 d-flex justify-content-center gap-4 mb-4">
            <div class="form-group col-3">
                <label for="select-escoger-fecha">Buscar datos por fecha</label>
                <div class="d-flex flex-row gap-2">
                    <select class="form-control" name="select-escoger-fecha" id="select-escoger-fecha" v-model="fechaEscogidaId">
                        <option value=null selected>Escoge una fecha</option>
                        <option v-for="fecha in fechas" :key="fecha.id" :value="fecha.id">{{ fecha.fecha }}</option>
                    </select>
                </div>
            </div> 
            <div class="form-group col-3">
                <label for="select-escoger-estado">Buscar datos por estado</label>
                <div class="d-flex flex-row gap-2">
                    <select class="form-control" name="select-escoger-estado" id="select-escoger-estado" v-model="estadoEscogidoId">
                        <option value=null selected>Escoge una estado</option>
                        <option v-for="estado in estados" :key="estado.index" :value="estado.state">{{ estado.name }}</option>
                    </select>
                    <button class="btn btn-primary" type="button" :disabled="!estadoEscogidoId && !fechaEscogidaId" @click="abrirDatosSeleccionados">Seleccionar</button>
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
                        <button type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide-to="4" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-diarios" data-bs-slide-to="5" aria-label="Slide 3"></button>
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
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="4" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carousel-graficas-datos-acumulados" data-bs-slide-to="5" aria-label="Slide 3"></button>
                      </div>
                  </div>
            </div>
        </div>

        <div class="w-100 row gap-2 justify-content-center">
            <card
                :titulo="'Tests realizados'"
                :datoPrincipal="datosUS.totalTestResults"
            />

            <card
                :titulo="'Positivos'"
                :datoPrincipal="datosUS.positive"
            />

            <card
                :titulo="'Negativos'"
                :datoPrincipal="datosUS.negative"
            />

            <card
                :titulo="'Hospitalizados'"
                :datoPrincipal="datosUS.hospitalizedCurrently"
            />

            <card
                :titulo="'Hospitalizados en UCI'"
                :datoPrincipal="datosUS.inIcuCumulative"
            />

            <card
                :titulo="'Hospitalizados con respirador'"
                :datoPrincipal="datosUS.onVentilatorCumulative"
            />

            <card
                :titulo="'Fallecidos'"
                :datoPrincipal="datosUS.death"
            />

            <card
                :titulo="'Recuperados'"
                :datoPrincipal="datosUS.recovered"
            />

            <card
                :titulo="'Tests de anticuerpos realizados'"
                :datoPrincipal="datosUS.totalTestsPeopleAntibody"
            />

            <card
                :titulo="'Tests de anticuerpos positivos'"
                :datoPrincipal="datosUS.positiveTestsPeopleAntibody"
            />

            <card
                :titulo="'Tests de anticuerpos negativos'"
                :datoPrincipal="datosUS.negativeTestsPeopleAntibody"
            />
        </div>
    </div>
</template>
<script>
    import { ApiService } from '../services/apiService';
    import { defineAsyncComponent, watch } from 'vue';
    import { formatearFecha, separarMilesDeUnNumero, devolverDatoValido } from '../helpers/helper.ts';
    
    import cargando from '../components/cargando.vue';
    const card = defineAsyncComponent(() =>
        import('../components/card.vue')
    );
    const grafico = defineAsyncComponent(() =>
        import('../components/grafico.vue')
    );

    export default {
        components: {
            grafico,
            cargando,
            card
        },

        data() {
            
            return {
                estados: [],
                datosUS:  [],
                fechas: [],
                fechasFormateadas: [],
                datosDeCardsCargados: false,
                datosDeGraficosCargados: false,
                fechaEscogidaId: null,
                estadoEscogidoId: null,
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
                    hospitalizadosUCI: {
                        label: "Hospitalizados en UCI",
                        color: "#9BD0F5",
                        datos: []
                    },
                    hospitalizadosConRespirador: {
                        label: "Hospitalizados con respirador",
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
                    hospitalizadosUCI: {
                        label: "Hospitalizados en UCI",
                        color: "#9BD0F5",
                        datos: []
                    },
                    hospitalizadosConRespirador: {
                        label: "Hospitalizados con respirador",
                        color: "#9BD0F5",
                        datos: []
                    },
                    fallecidos: {
                        label: "Fallecidos",
                        color: "#5D5D5D",
                        datos: []
                    }
                },
            };
        },

        beforeMount() {
            ApiService.obtenerDatos('/v1/states/info.json').then(datos => {
                this.estados =  datos.map(obj => {
                    obj.state = obj.state.toLowerCase();
                    return obj;
                });
            });

            ApiService.obtenerDatos('/v1/us/current.json').then(datos => {
                if(datos) {
                    this.datosUS = datos[0];

                    Object.keys(this.datosUS).forEach(clave => {
                        if(typeof this.datosUS[clave] == 'number'){
                            this.datosUS[clave] = separarMilesDeUnNumero(this.datosUS[clave]);
                        }
                    });
                    this.datosDeCardsCargados = true;
                }else{
                    return this.$router.push({ name: 'sin-datos'});
                }
            });

            ApiService.obtenerDatos('/v1/us/daily.json').then(datos => {
                if(datos) {
                    const datosDelPais = datos.reverse();
    
                    datosDelPais.forEach(dato => {
                        this.fechasFormateadas.push(formatearFecha(dato.date));
                        let nuevaFecha = {
                            id: dato.date,
                            fecha: formatearFecha(dato.date)
                        }
                        this.fechas.push(nuevaFecha);
                        this.datosDiarios.positivos.datos.push(devolverDatoValido(dato.positiveIncrease));
                        this.datosDiarios.negativos.datos.push(devolverDatoValido(dato.negativeIncrease));
                        this.datosDiarios.hospitalizados.datos.push(devolverDatoValido(dato.hospitalizedIncrease));
                        this.datosDiarios.hospitalizadosUCI.datos.push(devolverDatoValido(dato.inIcuCurrently));
                        this.datosDiarios.hospitalizadosConRespirador.datos.push(devolverDatoValido(dato.onVentilatorCurrently));
                        this.datosDiarios.fallecidos.datos.push(devolverDatoValido(dato.deathIncrease));
                        this.datosAcumulados.positivos.datos.push(devolverDatoValido(dato.positive));
                        this.datosAcumulados.negativos.datos.push(devolverDatoValido(dato.negative));
                        this.datosAcumulados.hospitalizados.datos.push(devolverDatoValido(dato.hospitalizedCumulative));
                        this.datosAcumulados.hospitalizadosUCI.datos.push(devolverDatoValido(dato.inIcuCumulative));
                        this.datosAcumulados.hospitalizadosConRespirador.datos.push(devolverDatoValido(dato.onVentilatorCumulative));
                        this.datosAcumulados.fallecidos.datos.push(devolverDatoValido(dato.death));
                    })
    
                    this.datosDeGraficosCargados = true;
                }else {
                    return this.$router.push({ name: 'sin-datos'});
                }
            })
        },
            
        methods: {
            abrirDatosSeleccionados() {
                if(this.fechaEscogidaId && this.estadoEscogidoId) {
                    return this.$router.push({ name: 'datos-por-fecha-estado', params: { fechaId: this.fechaEscogidaId, estadoId: this.estadoEscogidoId } });
                }
                if(this.fechaEscogidaId) {
                    return this.$router.push({ name: 'datos-por-fecha', params: { id: this.fechaEscogidaId } });
                }
                if(this.estadoEscogidoId) {
                    return this.$router.push({ name: 'datos-por-estado', params: { id: this.estadoEscogidoId } });
                }
            },
        },
        watch: {
            fechaEscogidaId: function(nuevoValor) {
                if(nuevoValor == 'null'){
                    this.fechaEscogidaId = null;
                }
            },

            estadoEscogidoId: function(nuevoValor) {
                if(nuevoValor == 'null'){
                    this.estadoEscogidoId = null;
                }
            }
        }
    };
</script>
<style>
    .grafico-container {
        overflow-x: hidden;
    }
</style>