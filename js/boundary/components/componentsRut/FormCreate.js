import RutaDataStore from '../../../control/RutaDataStore.js';

let ruta = new RutaDataStore();
let datos = await ruta.findAll();

export default class FormCreate extends HTMLElement {
    constructor() {
      super();
      this._dato = datos;
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
      let tam = this._dato.length;  
      let extra = "T06:00:00Z[UTC]";
      event.preventDefault();
      const name = document.getElementById("nombreC");
      const observacion = document.getElementById("observacionC");
      const fecha = document.getElementById("fechaC").value+extra;
      const iD = this._dato[tam-1].idRuta+1;
      if (!name.value || !observacion.value) return;
  
      const submitEvent = new CustomEvent('form-submitted-create', {
        detail: {
          fechaCreacion:fecha,
          idRuta:iD,
          nombre: name.value,
          observaciones: observacion.value
        }
      });
      this.dispatchEvent(submitEvent);
      name.value = '';
      observacion.value = '';
    }
  
    formTemplate(name = '', observacion = '', date = '') {
      return `
      <div class="form-create">
      <h4>Crear dato nuevo</h4>
      <div class="form">
      <div>
        <label for="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="nombreC"
          value="${name}"
          /></div>
          <div>
          <label for="observacion">Observacion</label>
          <input
          type="text"
          name="observacion"
          id="observacionC"
          value="${observacion}"
        /></div>
        <div>
        <label for="fecha">Fecha de creacion</label>
          <input
          type="date"
          name="fecha"
          id="fechaC"
          value="${date}"
        />
        </div>
        <input id="submit" type="submit" value="Crear" />
        </div>
        </div>
      `;
    }
  }
  
  customElements.define('crud-form-create', FormCreate);