//La firma es el nombre de la función, los parámetros y lo que retorna.
//Ésta es la función que se usa para que se muevan en el eje X de la página (derecha o izquierda).
function animateElementLeft(element, start, target, duration) { //Retornará promesa con elemento.
  element.style.left = start;
  let counter = 0;
  const delta = (target - start) * 40 / duration; //Delta es lo que se debe mover por cuadro.
  return new Promise((resolve, reject) => { //Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject().
      const loop = setInterval(() => { // Toma una funcion y la repite cada ciertos milisegundos.
          const current = start + counter++ * delta; //Acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo.
          element.style.left = current;
          if (start > target && current <= target) { //Acá indicamos cuando queremos que finalize el moviento que seria al llegar a target.
              element.style.left = current;
              clearInterval(loop); //Acá se termina la promesa.
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve.
          } else if (start < target && current >= target) {
              element.style.left = current;
              clearInterval(loop); //Acá se termina la promesa.
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve.
          }
      }, 40);//40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion. Frames per second.
  });
}

//Ésta es la función que se usa para que se muevan en el eje Y de la página (arriba o abajo).
function animateElementTop(element, start, target, duration) { 
  element.style.top = start;
  let counter = 0;
  const delta = (target - start) * 40 / duration; 
  return new Promise((resolve, reject) => { 
      const loop = setInterval(() => { 
          const current = start + counter++ * delta; 
          element.style.top = current;
          if (start > target && current <= target) { 
              element.style.top = current;
              clearInterval(loop); 
              resolve();
          } else if (start < target && current >= target) {
              element.style.top = current;
              clearInterval(loop); 
              resolve();
          }
      }, 40);
  });
}
// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise
/*
const allLi = document.getElementsByTagName("li")
/*
animateElement(allLi[0], -200, 1800, 2000).then(()=>{ // coordenadas fuera de la pantalla se indican con numeros negativos. Acá se está haciendo uso de la promesa por fuera.
  console.log("Terminó la animación");
}).catch(()=>{
  console.log("Falló la animación");
}); 
Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
  [
      animateElement(allLi[1],-200, 500, 8000),
      animateElement(allLi[0], -200, 500, 2000)
  ]
).then((results)=>{
  console.log("Todas las animaciones terminaron");
  return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
      [
          animateElement(allLi[1], 600, -500, 8000),
          animateElement(allLi[0], 600, -500, 2000)
      ]
  )
})
.then(()=>{
  console.log("Terminaron las animaciones de vuelta");
}).catch(()=>{
  console.log("Falló la animación");
});*/

//Secuencial.
const allLi = document.getElementsByTagName("li");
Promise.all( //Esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuando terminan todas las promesas.
    [
        animateElementLeft(allLi[0], -200, 865, 8000),
        animateElementLeft(allLi[1], -200, 865, 6000)
    ]
).then((results) => {
    console.log("Todas las animaciones llegaron a la derecha.");
    return Promise.all( 
        [
            animateElementTop(allLi[0], 0, 380, 6000),
            animateElementTop(allLi[1], 150, 530, 4000)
        ]
    )
}).then((results) => {
    console.log("Todas las animaciones llegaron abajo.");
    return Promise.all (
        [
            animateElementLeft(allLi[0], 1265, 0, 4000),
            animateElementLeft(allLi[1], 1265, 0, 2000)
        ]        
    )
}).then((results) => {
    console.log("Todas las animaciones llegaron a la izquierda.");
    return Promise.all( 
        [
            animateElementTop(allLi[0], 380, 0, 1000),
            animateElementTop(allLi[1], 530, 150, 2000)
        ]
    )
}).then((results) => {
    console.log("Todas las animaciones llegaron arriba.");
    return Promise.all (
        [
            animateElementLeft(allLi[0], 0, -200, 1000),
            animateElementLeft(allLi[1], 0, -200, 1000)
        ]        
    )
}).then((results) => {
       
}).catch(() => {
    console.log("Falló la animación");
});