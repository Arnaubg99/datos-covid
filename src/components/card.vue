<template>
    <div class="card col-lg-3 col-md-6 col-sm-12 text-center blur-in-expand">
        <div class="card-header bg-white">
            <h6 class="text-nowrap card-titulo">{{ titulo }}</h6>
        </div>
        <div class="card-body">
            <p class="card-dato-principal">{{ datoPrincipal ??  '-' }}</p>
            <p class="card-dato-secundario" v-if="datoSecundario"><b>{{ datoSecundario }}</b> caso/s en hasta la fecha</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            titulo: {
                type: String,
                deafult: () => ''
            },
            datoPrincipal: {
                type: String,
                deafult: () => '-'
            },
            datoSecundario: {
                type: String,
                deafult: () => ''
            },
        },

    }
</script>
<style>
    .card-titulo {
        font-weight: bold;
    }
    .card-dato-principal {
        font-weight: 100;
        font-size: 40px;
    }

    .card-dato-principal::after {
        content: url('/src/assets/down_green.svg');
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }

    .blur-in-expand{
        animation:blur-in-expand 0.5s linear both;
    }

     @keyframes blur-in-expand {
        0% {
            transform:scale(0);
            filter:blur(12px);
            opacity:0
        }
        100% {
            transform:scale(1);
            filter:blur(0);
            opacity:1
        }
    }
</style>