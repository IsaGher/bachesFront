import ObjetoDataStorage from '../../../control/ObjetoDataStore.js'
import EstadoDataStorage from '../../../control/EstadoDataStore.js'
let objeto = new ObjetoDataStorage();
let datosObjeto = await objeto.findAll();
let estado = new EstadoDataStorage();
let datosEstado = await estado.findAll();

export default class FormCreate extends HTMLElement {
    constructor() {
      super();
      this._datosObjeto = datosObjeto;
      this._datosEstado = datosEstado;
      const form = document.createElement('form');
      form.id = 'submitFormCreate';
      form.innerHTML = this.formTemplate();
      this.appendChild(form);
    }
  
    connectedCallback() {
      this.addEventListener('submit', this.onSubmit);
    }
  
    get form() {
      return this.querySelector('#submitFormCreate');
    }
  
    onSubmit(event) {
        let extra = "T06:00:00Z[UTC]";
        const nombreEstado = document.getElementById("nombreEstadoC");
        let estado = [];
        this._datosEstado.forEach(element => {
            if(element.idEstado == Number(nombreEstado.value)){
                estado = element;
            }
        });
        const nombreObjeto = document.getElementById("nombreObjetoC");
        let objeto = [];
        this._datosObjeto.forEach(element => {
            if(element.idObjeto == Number(nombreObjeto.value)){
                objeto = element;
            }
        });
      event.preventDefault();
      const id = 1;
      const actual = document.getElementById("actualC");
      const observacion = document.getElementById("observacionC");
      const fecha = document.getElementById("fechaC").value+extra;
      let act = new Boolean()
      if(actual.value === 'false'){
        act = false;
      }else if(actual.value === 'true'){
        act = true;
      }else{
        return
      }
      if (!observacion.value) return;
      const submitEvent = new CustomEvent('form-submitted-create', {
        detail: {
          actual: act,
          fechaAlcanzado: fecha,
          idEstado: estado,
          idObjeto: objeto,
          idObjetoEstado: id,
          observaciones: observacion.value
        }
      });
      this.dispatchEvent(submitEvent);
      actual.value = '';
      observacion.value = '';
    }
  
    formTemplate(actual = '', date = '', observacion = '') {
      return `
        <label for="actual">Actual</label>
        <input
          type="text"
          name="actual"
          id="actualC"
          value="${actual}"
          />
          <label for="fecha">Fecha Alcanzado</label>
          <input
          type="date"
          name="fecha"
          id="fechaC"
          value="${date}"
        />
          <label for="observacion">Observacion</label>
          <input
          type="text"
          name="observacion"
          id="observacionC"
          value="${observacion}"
        />
        <label for="nombreEstado">Nombre Estado:</label>
            <select name="nombreEstado" id="nombreEstadoC">
            ${
                this._datosEstado.map((char, index) =>{
                    return `
                    <option value="${char.idEstado}">${char.nombre}</option>
                    `;
                }).join('')
            }
            </select>
        <label for="nombreObjeto">Nombre Objeto:</label>
            <select name="nombreObjeto" id="nombreObjetoC">
            ${
                this._datosObjeto.map((char, index) =>{
                    return `
                    <option value="${char.idObjeto}">${char.nombre}</option>
                    `;
                }).join('')
            }
            </select>
        <input id="submit" type="submit" value="Crear" />
      `;
    }
  }
  
  customElements.define('crud-form-create', FormCreate);