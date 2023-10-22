<template>
    <div class="position-absolute top-0 start-0 m-1 d-flex gap-2">
        <button class="btn btn-primary" type="button" @click="volverAtras">Volver atrás</button>
        <button class="btn btn-success" type="button" @click="irAlInicio">Ir al inicio</button>
    </div>
</template>
<script>
export default {
    methods: {
        volverAtras() {
            return this.$router.go(-1);
        },
        irAlInicio() {
            return this.$router.push({ name: 'home' });
        }
    }
}
</script>
<style>
    
</style>