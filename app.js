//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElement(element, start, target, duration){ //Retornará promesa con elemento
  element.style.right = start; 
  let counter = 0;
  const delta = (target - start)*40/duration; //delta es lo que se debe mover por cuadro
  return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
      const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
          const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
          element.style.top = element.style.bottom;
          element.style.bottom = element.style.left;
          element.style.left= element.style.top;
          element.style.top = element.style.right;
          element.style.top= current;
          element.style.buttom= current;
          
          
          if(current >= target){ // acá indicamos cuando queremos que finalize el moviento que seria al llegar a target
              element.style.right = element.style.bottom;
              element.style.bottom = current;
              
       
          
              clearInterval(loop); // Acá se termina la promesa
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
          }
      }, 40);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
  });                
}

// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

const allLi = document.getElementsByTagName("li")
/*
animateElement(allLi[0], -200, 1800, 2000).then(()=>{ // coordenadas fuera de la pantalla se indican con numeros negativos. Acá se está haciendo uso de la promesa por fuera.
  console.log("Terminó la animación");
}).catch(()=>{
  console.log("Falló la animación");
}); */
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
});

