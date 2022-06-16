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
      const activo = document.getElementById("activoC");
      const fecha = document.getElementById("fechaC").value+extra;
      if (!activo.value) return;
  
      const submitEvent = new CustomEvent('form-submitted-create', {
        detail: {
          activo: activo.value,
          fechaCreacion:fecha
        }
      });
      this.dispatchEvent(submitEvent);
    }
  
    formTemplate(activo = '', date = '') {
        return `
        <div class="form-create">
        <h4>Crear dato nuevo</h4>
        <div class="form">
        <div>
          <label for="activo">Activo</label>
          <input
            type="number"
            name="activo"
            id="activoC"
            min="0"
            max="1"
            value="${activo}"
            /></div>
            <div>
          <label for="fecha">Fecha de creacion</label>
            <input
            type="date"
            name="fecha"
            id="fechaC"
            value="${date}"
          /></div>
          <input id="submit" type="submit" value="Crear" />
          </div>
          </div>
        `;
      }
  }
  
  customElements.define('crud-form-create', FormCreate);