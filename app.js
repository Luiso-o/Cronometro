const cronometro = document.getElementById('cronometro');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');

let [horas,minutos,segundos] = [0, 0, 0];

let intervaloDeTiempo;
let estadoCronometro = 'pausado';

function actualizarCronometro(){
    segundos++;
    if(segundos/60 === 1){
        segundos = 0;
        minutos++;

        if(minutos/60 === 1){
            minutos = 0;
            horas++;
        }
    }

   const segundosConFormato = asignarFormato(segundos);
   const minutosConFormato = asignarFormato(minutos);
   const horasConFormato = asignarFormato(horas);

   cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

function asignarFormato(unidadDeTiempo){
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

function actualizarBotones(estado){
    if(estado === 'pausado'){
        botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
        botonInicioPausa.classList.remove('pausar');
        botonInicioPausa.classList.add('iniciar');
    }else{
        botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
        botonInicioPausa.classList.remove('iniciar');
        botonInicioPausa.classList.add('pausar');
    }
}

botonInicioPausa.addEventListener('click', function(){
    if(estadoCronometro === 'pausado'){
        intervaloDeTiempo = window.setInterval(actualizarCronometro,1000);
        estadoCronometro = 'andando';
    }else{
        window.clearInterval(intervaloDeTiempo);
        estadoCronometro = 'pausado';
    }

    actualizarBotones(estadoCronometro);
});

botonReiniciar.addEventListener('click', function(){
    window.clearInterval(intervaloDeTiempo);
    [horas, minutos, segundos] = [0, 0, 0];
    cronometro.innerText = '00:00:00';
    estadoCronometro = 'pausado';

    actualizarBotones(estadoCronometro);
});