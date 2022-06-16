import TipoObjetoDataStorage from '../../../control/TipoObjetoDataStore.js'
let tipoObjeto = new TipoObjetoDataStorage();
let datos = await tipoObjeto.findAll();

export default class Form extends HTMLElement {
    constructor() {
      super();
      this._datos = datos;
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
        const activo = this.querySelector('#activo');
        let tipo = [];
        this._datos.forEach(element => {
            if(element.idTipoObjeto == Number(activo.value)){
                tipo = element;
            }
        });
      event.preventDefault();
      const id = this.querySelector('#id');
      const name = this.querySelector('#name');
      const observacion = this.querySelector('#observacion');
      const latitud = this.querySelector('#latitud');
      const longitud = this.querySelector('#longitud');
      if (!name.value || !observacion.value) return;
  
      const submitEvent = new CustomEvent('form-submitted', {
        detail: {
          idObjeto: Number(id.value),
          idTipoObjeto: tipo,
          latitud: Number(latitud.value),
          longitud: Number(longitud.value),
          nombre: name.value,
          observaciones: observacion.value
        }
      });
      this.dispatchEvent(submitEvent);
      id.value = '';
      name.value = '';
      observacion.value = '';
      latitud.value = '';
      longitud.value = '';
    }
  
    onEdit(event) {
      this.form.innerHTML = this.formTemplate(
        event.detail.idObjeto,
        event.detail.nombre,
        event.detail.observaciones,
        event.detail.latitud,
        event.detail.longitud
      );
      const activo = this.querySelector('#activo');
      activo.value = event.detail.idTipoObjeto.idTipoObjeto;
    }
  
    formTemplate(id = '', name = '', observacion = '', latitud = '', longitud = '') {
      return `
      <h4>Modificacion de datos</h4>
      <div class="form">
      <div class="name-section">
        <input
          type="text"
          name="id"
          id="id"
          value="${id}"
          style="display: none"
        />
        <label for="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          value="${name}"
          />
          </div>
          <div class="observation-section">
          <label for="observacion">Observacion</label>
          <input
          type="text"
          name="observacion"
          id="observacion"
          value="${observacion}"
        />
        </div>
        <div class="latitud-section">
        <label for="latitud">Latitud</label>
          <input
          type="text"
          name="latitud"
          id="latitud"
          value="${latitud}"
        />
        </div>
        <div class="longitud-section">
        <label for="longitud">Longitud</label>
          <input
          type="text"
          name="longitud"
          id="longitud"
          value="${longitud}"
        />
        </div>
        <div class="activo-section">
        <label for="activo">Tipo Objeto:</label>
            <select name="activo" id="activo">
            ${
                this._datos.map((char, index) =>{
                    return `
                    <option value="${char.idTipoObjeto}">${char.activo}</option>
                    `;
                }).join('')
            }
            </select>
            </div>
        <input id="submit" type="submit" value="Modificar" />
        </div>
      `;
    }
  }
  
  customElements.define('crud-form', Form);