import utils from "./utils";

let nivel       = 1,
    operacion   = "+",
    ope ="",
    respu=0,
    encRespuesta="",
    setActivado = false,
    operadores  = ["/", "*", "-", "+"];

let presionaTecla = opc =>
{
    //Saber si se ha presionado la opción de SET...
    if(opc.toLowerCase() === "set" || setActivado)
    {
        //Saber si se ha presionado "go"...
        if(opc.toLowerCase() !== "go")
        {
            //Imprimir las opciones...
            if(utils.isNumber(opc))
            {
                //Saber si el número está en un nivel de 1 a 5...
                if(Number(opc) >= 1 && Number(opc) <= 5)
                {
                    nivel = Number(opc);
                }
                //console.log("Número");
            }
            else
            {
                for(let i = 0; i < operadores.length; i++)
                {
                    if(opc === operadores[i])
                    {
                        operacion = operadores[i];
                        break;
                    }
                }
            }
            utils.accesoDOM("lcd").innerHTML = `L${nivel}&nbsp;&nbsp;OP&nbsp;${operacion}`;
            setActivado = true;
        }
        else
        {
            setActivado = false;
            valAleatorio();
            utils.accesoDOM("lcd").innerHTML = `${ope} =`;
        }
    }
    else
    {
        if(utils.isNumber(opc))
        {
            //Se debe mostrar una ecuación de forma aleatoria en el LCD...
            //Se debe validar que la respuesta dada por el usuario sea válida...
            //Se debe validar que la operación que se haga es relacionada al valor que está guardada en ecuación...
            //---
            operation(opc);
        }
      }
};

let operation = (opc) =>
{
  if(operacion!=="/"){
  if(respu>=0){
  encRespuesta+=opc;
    if(encRespuesta.length===String(respu).length){
      if(Number(encRespuesta)===respu){
        utils.accesoDOM("lcd").innerHTML ="correcto";
        encRespuesta="";
        console.log(`Número seleccionado: ${opc}, ${encRespuesta}`);
      }else{
        utils.accesoDOM("lcd").innerHTML ="incorrecto";
        encRespuesta="";
      }
    }
  }else{
    encRespuesta+=operacion;
    encRespuesta+=opc;
    if(encRespuesta.length===String(respu).length){
      if(Number(encRespuesta)===respu){
        utils.accesoDOM("lcd").innerHTML ="correcto";
        encRespuesta="";
        console.log(`Número seleccionado: ${opc}, ${encRespuesta}`);
      }else{
        utils.accesoDOM("lcd").innerHTML ="incorrecto";
        encRespuesta="";
      }
    }
  }
  }else{
    let punto;
    let respuNPunto
  //rdondea el valor para que solo tenga 2 decimales
    respu=Math.round(respu * 100) / 100;
    respuNPunto=respu+"";
    punto = String(respuNPunto).indexOf(".");
    respuNPunto=respuNPunto.split("");
    delete respuNPunto[punto];
    respuNPunto=respuNPunto.join("");
    encRespuesta+=opc;
    if(encRespuesta.length===String(respuNPunto).length){
      if(Number(encRespuesta)===Number(respuNPunto)){
        utils.accesoDOM("lcd").innerHTML ="correcto";
        encRespuesta="";
      }else{
        utils.accesoDOM("lcd").innerHTML =`incorrecto`;
        encRespuesta="";
      }
    }
  }

};

let valAleatorio=()=>
{
  let aleatorio = {aleatorio1 : 0, aleatorio2 : 0};
  let maxMin = {max :0, min : 0};
  if(nivel === 1){
    aleatorio.aleatorio1 = Math.floor(Math.random() * nivel*10);
    aleatorio.aleatorio2 = Math.floor(Math.random() * nivel*10);
    ope = (`${aleatorio.aleatorio1} ${operacion} ${aleatorio.aleatorio2}`);
  }else
  {
    maxMin.max=nivel*10;
    maxMin.min=maxMin.max-10;
    aleatorio.aleatorio1 = Math.floor(Math.random()*(maxMin.max-maxMin.min+1)+maxMin.min);
    aleatorio.aleatorio2 = Math.floor(Math.random() *(maxMin.max-maxMin.min+1)+maxMin.min);
    ope = (`${aleatorio.aleatorio1} ${operacion} ${aleatorio.aleatorio2}`);
  }
  respu = eval(ope);
  console.log(respu);
};

let crearBotones = () =>
{
    let posicion = {
                        left : 66,
                        bottom : 221
                   };

    let opciones     = ["set", "0", "go"],
        inciaNumero = 7;
    for(let i = 0; i < 4; i++)
    {
        for(let c = 0; c < 4; c++)
        {
            let data = c <= 2 ?
                       (inciaNumero > 0 ? (inciaNumero + c) : opciones[c])
                       : operadores[i];
            let style = `left: ${posicion.left + (c * 53)}px;
                         bottom: ${posicion.bottom - (i * 62)}px;`;
            let elementoDIV = `<div class = "tecla" style = "${style}" data = ${data} id = "${i}_${c}"></div>`;
            utils.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            utils.accesoDOM(`${i}_${c}`).addEventListener('click', event =>
            {
                let valor = utils.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor)
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();
