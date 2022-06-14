import ObjetoDataStorage from '../../../control/ObjetoDataStore.js'
import EstadoDataStorage from '../../../control/EstadoDataStore.js'
let objeto = new ObjetoDataStorage();
let datosObjeto = await objeto.findAll();
let estado = new EstadoDataStorage();
let datosEstado = await estado.findAll();

export default class Form extends HTMLElement {
    constructor() {
      super();
      this._datosObjeto = datosObjeto;
      this._datosEstado = datosEstado;
      const form = document.createElement('form');
      form.id = 'submitForm';
      form.innerHTML = this.formTemplate();
      this.appendChild(form);
    }
  
    connectedCallback() {
      this.addEventListener('submit', this.onSubmit);
      this.addEventListener('edit-character', this.onEdit);
    }
  
    get form() {
      return this.querySelector('#submitForm');
    }
  
    onSubmit(event) {
        let extra = "T06:00:00Z[UTC]";
        const nombreEstado = this.querySelector('#nombreEstado');
        let estado = [];
        this._datosEstado.forEach(element => {
            if(element.idEstado == Number(nombreEstado.value)){
                estado = element;
            }
        });
        const nombreObjeto = this.querySelector('#nombreObjeto');
        let objeto = [];
        this._datosObjeto.forEach(element => {
            if(element.idObjeto == Number(nombreObjeto.value)){
                objeto = element;
            }
        });
      event.preventDefault();
      const id = this.querySelector('#id');
      const actual = this.querySelector('#actual');
      const observacion = this.querySelector('#observacion');
      const fecha = document.getElementById("fecha").value+extra;
      let act = new Boolean()
      if(actual.value === 'false'){
        act = false;
      }else if(actual.value === 'true'){
        act = true;
      }else{
        return
      }
      if (!observacion.value) return;
  
      const submitEvent = new CustomEvent('form-submitted', {
        detail: {
          actual: act,
          fechaAlcanzado: fecha,
          idEstado: estado,
          idObjeto: objeto,
          idObjetoEstado: Number(id.value),
          observaciones: observacion.value
        }
      });
      this.dispatchEvent(submitEvent);
      id.value = '';
      actual.value = '';
      observacion.value = '';
    }
  
    onEdit(event) {
      let fecha = "";
        for (let index = 0; index < 10; index++) {
            fecha = fecha+event.detail.fechaAlcanzado.charAt(index);
        }
      this.form.innerHTML = this.formTemplate(
        event.detail.idObjetoEstado,
        event.detail.actual,
        fecha,
        event.detail.observaciones
      );
      const nombreEstado = this.querySelector('#nombreEstado');
      nombreEstado.value = event.detail.idEstado.idEstado;
      const nombreObjeto = this.querySelector('#nombreObjeto');
      nombreObjeto.value = event.detail.idObjeto.idObjeto;
    }
  
    formTemplate(id = '', actual = '', date = '' ,observacion = '') {
      return `
        <input
          type="text"
          name="id"
          id="id"
          value="${id}"
          style="display: none"
        />
        <label for="actual">Actual</label>
        <input
          type="text"
          name="actual"
          id="actual"
          value="${actual}"
          />
          <label for="fecha">Fecha Alcanzado</label>
          <input
          type="date"
          name="fecha"
          id="fecha"
          value="${date}"
        />
          <label for="observacion">Observacion</label>
          <input
          type="text"
          name="observacion"
          id="observacion"
          value="${observacion}"
        />
        <label for="nombreEstado">Nombre Estado:</label>
            <select name="nombreEstado" id="nombreEstado">
            ${
                this._datosEstado.map((char, index) =>{
                    return `
                    <option value="${char.idEstado}">${char.nombre}</option>
                    `;
                }).join('')
            }
            </select>
        <label for="nombreObjeto">Nombre Objeto:</label>
            <select name="nombreObjeto" id="nombreObjeto">
            ${
                this._datosObjeto.map((char, index) =>{
                    return `
                    <option value="${char.idObjeto}">${char.nombre}</option>
                    `;
                }).join('')
            }
            </select>
        <input id="submit" type="submit" value="Modificar" />
      `;
    }
  }
  
  customElements.define('crud-form', Form);