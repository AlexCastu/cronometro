window.addEventListener('load', () => {
  let indexSesion;
  let sesion = [];
  if (localStorage.getItem('Sesiones')) {
    sesion = JSON.parse(localStorage.Sesiones);
    indexSesion = sesion.length;
  } else {
    indexSesion = 0;
  }
  /////////////////////////////////////////////////////////////////////////////
  ////////////////  Declaracion de variables de ambito Global ////////////////

  let sec = document.getElementById('segundos');
  let min = document.getElementById('mins');
  let hor = document.getElementById('horas');
  let nS = document.getElementById('milisegundos');
  let segundos = 0;
  let minutos = 0;
  let horas = 0;
  let ns = 0;
  let setContador;
  let contador10;
  let vuelta = [];

  const botonIniciar = document.getElementById('iniciarContador');
  const botonPausar = document.getElementById('pausarContador');
  const botonContinuar = document.getElementById('reanudarContador');
  const botonReset = document.getElementById('reset');
  const botonGuardar = document.getElementById('guardarVuelta');
  const botonContar = document.getElementById('contar');
  const botonVerSesiones = document.getElementById('verSesiones');
  const botonEliminarSesion = document.getElementsByClassName('botonEliminar');
  const botonEliminarLocalStorage = document.getElementById('eliminarTodasLasSesiones');
  /////////////////////////////////////////////////////////////////////////////
  ///////////////////  Deshabilitar botones no necesarios  ///////////////////

  botonContinuar.disabled = true;
  botonPausar.disabled = true;
  botonReset.disabled = true;
  botonGuardar.disabled = true;

  /////////////////////////////////////////////////////////////////////////////
  //////////////////  Captura de los eventos de los botones //////////////////

  botonIniciar.addEventListener('click', () => {
    inicioContador();
  });

  botonPausar.addEventListener('click', () => {
    clearInterval(setContador);
    botonContinuar.disabled = false;
  });

  botonContinuar.addEventListener('click', () => {
    inicioContador();
    botonContinuar.disabled = true;
  });

  botonReset.addEventListener('click', () => {
    reiniciarContador();
    botonContar.disabled = false;

    clearTimeout(contador10);
  });

  botonGuardar.addEventListener('click', () => {
    guardarVueltaEnLocalStorage();
  });

  botonContar.addEventListener('click', () => {
    contarA10();
  });

  botonVerSesiones.addEventListener('click', () => {
    verTodasLasSesiones();
  });

  botonEliminarLocalStorage.addEventListener('click', () => {
    localStorage.clear();
    verTodasLasSesiones();
  });
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////  Funcion contador setInterval  //////////////////////

  const inicioContador = () => {
    botonIniciar.disabled = true;
    botonPausar.disabled = false;
    botonReset.disabled = false;
    botonGuardar.disabled = false;
    botonContar.disabled = true;
    contador();
  };

  const reiniciarContador = () => {
    clearInterval(setContador);
    segundos = 0;
    minutos = 0;
    horas = 0;
    ns = 0;
    sec.innerHTML = '00';
    min.innerHTML = '00';
    hor.innerHTML = '00';
    nS.innerHTML = '00';
    botonIniciar.disabled = false;
    botonContinuar.disabled = true;
    botonPausar.disabled = true;
    botonGuardar.disabled = true;
    if (document.getElementById('seccionMostrar')) document.getElementById('seccionMostrar').remove();
  };
  const contador = () => {
    setContador = setInterval(() => {
      ns++;
      if (ns > 9) {
        ns = 0;
        segundos++;
        if (segundos > 59) {
          segundos = 0;
          minutos++;
          if (minutos > 59) {
            minutos = 0;
            horas++;
          }
        }
      }
      nS.innerHTML = ns < 10 ? '0' + ns : ns;
      sec.innerHTML = segundos < 10 ? '0' + segundos : segundos;
      min.innerHTML = minutos < 10 ? '0' + minutos : minutos;
      hor.innerHTML = horas < 10 ? '0' + horas : horas;
    }, 100);
  };

  const guardarVueltaEnLocalStorage = () => {
    vuelta.push({ h: horas, m: minutos, s: segundos, ns: ns });
    sesion[indexSesion] = vuelta;
    localStorage.setItem(`Sesiones`, JSON.stringify(sesion));
    mostrarResultado();
  };

  let mostrarResultado = () => {
    let mostrarVueltas = 1;
    if (document.getElementById('seccionMostrar')) document.getElementById('seccionMostrar').remove();
    let seccion = document.createElement('div');
    let titulo = document.createElement('h2');
    let textoTitulo = document.createTextNode('Sesion Actual');
    titulo.appendChild(textoTitulo);
    titulo.setAttribute('id', 'tituloVueltas');
    seccion.setAttribute('id', 'seccionMostrar');
    let ultimaSesion = JSON.parse(localStorage.Sesiones);
    ultimaSesion[indexSesion].forEach((elemento) => {
      let parrafo1 = document.createElement('p');
      let parrafo2 = document.createElement('p');
      let container = document.createElement('div');
      let textovueltas = document.createTextNode(`Vuelta ${mostrarVueltas}:`);
      let texto = document.createTextNode(`${elemento.h}h ${elemento.m}m  ${elemento.s}s  ${elemento.ns}ms`);
      parrafo2.appendChild(texto);
      parrafo1.appendChild(textovueltas);
      container.append(parrafo1, parrafo2);
      seccion.appendChild(container);
      seccion.appendChild(titulo);
      mostrarVueltas++;
    });
    document.getElementById('sesionActual').appendChild(seccion);
  };

  const verTodasLasSesiones = () => {
    if (document.getElementById('contenedorNoSesiones')) document.getElementById('contenedorNoSesiones').remove();

    if (document.getElementById('contenedorSesiones')) document.getElementById('contenedorSesiones').remove();
    if (localStorage.getItem('Sesiones')) {
      if (JSON.parse(localStorage.Sesiones).length > 0) {
        let contenedorMostrarDatos = document.createElement('div');
        let tituloSecciones = document.createElement('h2');
        let textoTituloSesiones = document.createTextNode('Sesiones anteriores');
        tituloSecciones.appendChild(textoTituloSesiones);
        tituloSecciones.id = 'tituloSesiones';
        contenedorMostrarDatos.appendChild(tituloSecciones);
        contenedorMostrarDatos.setAttribute('id', 'contenedorSesiones');
        [...JSON.parse(localStorage.Sesiones)].forEach((elemento, index) => {
          let contenedorSecciones = document.createElement('div');
          let contenedorTitulo = document.createElement('div');
          let botonEliminar = document.createElement('img');
          let titulo = document.createElement('h2');
          let textoTitulo = document.createTextNode(`Sesion ${index + 1}`);
          contenedorSecciones.setAttribute('id', index);
          contenedorSecciones.setAttribute('class', 'sesiones');
          contenedorTitulo.setAttribute('class', 'contenedorTitulo');
          botonEliminar.setAttribute('src', './iconos/borrar.png');
          botonEliminar.setAttribute('class', 'botonEliminar');
          titulo.appendChild(textoTitulo);
          titulo.setAttribute('class', 'tituloSecciones');
          contenedorTitulo.append(titulo, botonEliminar);
          contenedorSecciones.appendChild(contenedorTitulo);
          [...elemento].forEach((elemento, index) => {
            let parrafo1 = document.createElement('p');
            let parrafo2 = document.createElement('p');
            let contendorP = document.createElement('div');
            let textovueltas = document.createTextNode(`Vuelta ${index + 1}:`);
            let texto = document.createTextNode(`${elemento.h}h ${elemento.m}m  ${elemento.s}s  ${elemento.ns}ms`);
            contendorP.setAttribute('class', 'vueltas');
            parrafo2.appendChild(texto);
            parrafo1.appendChild(textovueltas);
            contendorP.append(parrafo1, parrafo2);
            contenedorSecciones.append(contendorP);
            contenedorMostrarDatos.appendChild(contenedorSecciones);
          });
        });
        document.getElementById('sesionesAnteriores').appendChild(contenedorMostrarDatos);
      } else {
        sinSesiones();
      }
    } else {
      sinSesiones();
    }
    eliminarSesiones();
  };

  const sinSesiones = () => {
    if (document.getElementById('contenedorNoSesiones')) document.getElementById('contenedorNoSesiones').remove();
    let contenedor = document.createElement('div');
    contenedor.id = 'contenedorNoSesiones';
    let parrafo = document.createElement('p');
    let texto = document.createTextNode('No se ha encontrado ninguna sesion anterior.');
    contenedor.appendChild(parrafo.appendChild(texto));
    document.getElementById('sesionesAnteriores').appendChild(contenedor);
  };

  const contarA10 = () => {
    botonContar.disabled = true;
    botonPausar.disabled = true;
    botonIniciar.disabled = true;
    botonGuardar.disabled = false;
    botonContinuar.disabled = true;
    contador();
    contador10 = setTimeout(() => {
      clearInterval(setContador);
      botonContinuar.disabled = true;
      botonIniciar.disabled = false;
      botonContar.disabled = false;
    }, 10000);
  };

  const eliminarSesiones = () => {
    [...botonEliminarSesion].forEach((elemento) => {
      elemento.addEventListener('click', () => {
        if (JSON.parse(localStorage.Sesiones)) {
          let indexaEliminar = elemento.parentElement.parentElement.id;
          let sesion = JSON.parse(localStorage.Sesiones);
          sesion.splice(indexaEliminar, 1);
          if (sesion.length === 0) vuelta = [];
          localStorage.setItem(`Sesiones`, JSON.stringify(sesion));
          if (localStorage.getItem('Sesiones')) {
            sesion = JSON.parse(localStorage.Sesiones);
            indexSesion = sesion.length;
          } else {
            indexSesion = 0;
          }
          verTodasLasSesiones();
        }
      });
    });
  };
});
