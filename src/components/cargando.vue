<template>
    <div class="cargando-fondo">
        <div class="cargando-logo"></div>
        <p class="cargando-text">Cargando información....</p>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .cargando-fondo{
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

    .cargando-logo{
        border: 4px solid rgba(40, 40, 40, 0.3);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border-left-color: transparent;
        margin-bottom: 15px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin{
        0%{
          transform: rotate(0deg);
        }100%{
          transform: rotate(360deg);
        }
      }
</style>