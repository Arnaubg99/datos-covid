<template>
    <div class="fondo">
        <h1 class="titulo">404</h1>
        <h3 class="texto">No se han encontrado datos</h3>
        <button class="btn btn-success" type="button" @click="irAlInicio">Ir al inicio</button>
    </div>
</template>
<script>
export default {
    methods: {
        irAlInicio() {
            return this.$router.push({ name: 'home' });
        }
    }
}
</script>
<style>
    .fondo {
        position: fixed;
        left: 0;
        right: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--color-background);
    }

    .titulo {
        font-size: 100px;
    }

    .texto {
        font-size: 30px;
    }

</style>