export default class FormCreate extends HTMLElement {
    constructor() {
      super();
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
      event.preventDefault();
      const name = document.getElementById("nombreC");
      const observacion = document.getElementById("observacionC");
      const fecha = document.getElementById("fechaC").value+extra;
      if (!name.value || !observacion.value) return;
  
      const submitEvent = new CustomEvent('form-submitted-create', {
        detail: {
          fechaCreacion:fecha,
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
      <div class="name-section">
        <label for="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="nombreC"
          value="${name}"
          />
          </div>
          <div class="observation-section">
          <label for="observacion">Observacion</label>
          <input
          type="text"
          name="observacion"
          id="observacionC"
          value="${observacion}"
        />
        </div>
        <div class="date-section">
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