export function formatearFecha(fecha: number) {
        if(fecha) {
                let str = fecha.toString();
        
                let dia = str.substr(6,2);
                let mes = str.substr(4,2);
                let año = str.substr(0,4);
        
                let fecha_formateada = `${dia}-${mes}-${año}`;
                return fecha_formateada;
        }else {
                return '0';
        }
}

export function separarMilesDeUnNumero(numero: number) {
        if(numero) {
                return numero.toLocaleString('de-DE');
        }else {
                 return '0';
        }
}

export function devolverDatoValido(valorRecibido: number) {
        if(valorRecibido) {
            let valor = valorRecibido > 0 ? valorRecibido : 0;
            return valor;
        }else {
            return 0;
        }
    }
