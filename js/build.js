(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nivel = 1,
    operacion = "+",
    ope = "",
    respu = 0,
    encRespuesta = "",
    setActivado = false,
    operadores = ["/", "*", "-", "+"];

var presionaTecla = function presionaTecla(opc) {
  //Saber si se ha presionado la opción de SET...
  if (opc.toLowerCase() === "set" || setActivado) {
    //Saber si se ha presionado "go"...
    if (opc.toLowerCase() !== "go") {
      //Imprimir las opciones...
      if (_utils2.default.isNumber(opc)) {
        //Saber si el número está en un nivel de 1 a 5...
        if (Number(opc) >= 1 && Number(opc) <= 5) {
          nivel = Number(opc);
        }
        //console.log("Número");
      } else {
          for (var i = 0; i < operadores.length; i++) {
            if (opc === operadores[i]) {
              operacion = operadores[i];
              break;
            }
          }
        }
      _utils2.default.accesoDOM("lcd").innerHTML = "L" + nivel + "&nbsp;&nbsp;OP&nbsp;" + operacion;
      setActivado = true;
    } else {
      setActivado = false;
      valAleatorio();
      _utils2.default.accesoDOM("lcd").innerHTML = ope + " =";
    }
  } else {
    if (_utils2.default.isNumber(opc)) {
      //Se debe mostrar una ecuación de forma aleatoria en el LCD...
      //Se debe validar que la respuesta dada por el usuario sea válida...
      //Se debe validar que la operación que se haga es relacionada al valor que está guardada en ecuación...
      //---
      operation(opc);
    }
  }
};

var operation = function operation(opc) {
  if (operacion !== "/") {
    if (respu >= 0) {
      encRespuesta += opc;
      if (encRespuesta.length === String(respu).length) {
        if (Number(encRespuesta) === respu) {
          _utils2.default.accesoDOM("lcd").innerHTML = "correcto";
          encRespuesta = "";
          console.log("Número seleccionado: " + opc + ", " + encRespuesta);
        } else {
          _utils2.default.accesoDOM("lcd").innerHTML = "incorrecto";
          encRespuesta = "";
        }
      }
    } else {
      encRespuesta += operacion;
      encRespuesta += opc;
      if (encRespuesta.length === String(respu).length) {
        if (Number(encRespuesta) === respu) {
          _utils2.default.accesoDOM("lcd").innerHTML = "correcto";
          encRespuesta = "";
          console.log("Número seleccionado: " + opc + ", " + encRespuesta);
        } else {
          _utils2.default.accesoDOM("lcd").innerHTML = "incorrecto";
          encRespuesta = "";
        }
      }
    }
  } else {
    var punto = void 0;
    var respuNPunto = void 0;
    //rdondea el valor para que solo tenga 2 decimales
    respu = Math.round(respu * 100) / 100;
    respuNPunto = respu + "";
    punto = String(respuNPunto).indexOf(".");
    respuNPunto = respuNPunto.split("");
    delete respuNPunto[punto];
    respuNPunto = respuNPunto.join("");
    encRespuesta += opc;
    if (encRespuesta.length === String(respuNPunto).length) {
      if (Number(encRespuesta) === Number(respuNPunto)) {
        _utils2.default.accesoDOM("lcd").innerHTML = "correcto";
        encRespuesta = "";
      } else {
        _utils2.default.accesoDOM("lcd").innerHTML = "incorrecto";
        encRespuesta = "";
      }
    }
  }
};

var valAleatorio = function valAleatorio() {
  var aleatorio = { aleatorio1: 0, aleatorio2: 0 };
  var maxMin = { max: 0, min: 0 };
  if (nivel === 1) {
    aleatorio.aleatorio1 = Math.floor(Math.random() * nivel * 10);
    aleatorio.aleatorio2 = Math.floor(Math.random() * nivel * 10);
    ope = aleatorio.aleatorio1 + " " + operacion + " " + aleatorio.aleatorio2;
  } else {
    maxMin.max = nivel * 10;
    maxMin.min = maxMin.max - 10;
    aleatorio.aleatorio1 = Math.floor(Math.random() * (maxMin.max - maxMin.min + 1) + maxMin.min);
    aleatorio.aleatorio2 = Math.floor(Math.random() * (maxMin.max - maxMin.min + 1) + maxMin.min);
    ope = aleatorio.aleatorio1 + " " + operacion + " " + aleatorio.aleatorio2;
  }
  respu = eval(ope);
  console.log(respu);
};

var crearBotones = function crearBotones() {
  var posicion = {
    left: 66,
    bottom: 221
  };

  var opciones = ["set", "0", "go"],
      inciaNumero = 7;
  for (var i = 0; i < 4; i++) {
    for (var c = 0; c < 4; c++) {
      var data = c <= 2 ? inciaNumero > 0 ? inciaNumero + c : opciones[c] : operadores[i];
      var style = "left: " + (posicion.left + c * 53) + "px;\n                         bottom: " + (posicion.bottom - i * 62) + "px;";
      var elementoDIV = "<div class = \"tecla\" style = \"" + style + "\" data = " + data + " id = \"" + i + "_" + c + "\"></div>";
      _utils2.default.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
      _utils2.default.accesoDOM(i + "_" + c).addEventListener('click', function (event) {
        var valor = _utils2.default.accesoDOM(event.target.id).getAttribute("data");
        presionaTecla(valor);
      });
    }
    inciaNumero -= 3;
  }
};
crearBotones();

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

var accesoDOM = function accesoDOM(param) {
  return document.getElementById(param);
};
var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports = { accesoDOM: accesoDOM, isNumber: isNumber };

},{}]},{},[1]);
