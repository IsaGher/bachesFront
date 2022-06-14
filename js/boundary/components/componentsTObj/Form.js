export default class Form extends HTMLElement {
    constructor() {
      super();
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
      event.preventDefault();
      const id = this.querySelector('#id');
      const activo = this.querySelector('#activo');
      const fecha = document.getElementById("fecha").value+extra;
      if (!activo.value) return;
  
      const submitEvent = new CustomEvent('form-submitted', {
        detail: {
          activo: activo.value,
          fechaCreacion:fecha,
          idTipoObjeto: id.value
        }
      });
      this.dispatchEvent(submitEvent);
      id.value = '';
      activo.value = '';
    }
  
    onEdit(event) {
      let fecha = "";
        for (let index = 0; index < 10; index++) {
            fecha = fecha+event.detail.fechaCreacion.charAt(index);
        }
      this.form.innerHTML = this.formTemplate(
        event.detail.idTipoObjeto,
        event.detail.activo,
        fecha
      );
    }
  
    formTemplate(id = '', activo = '', date = '') {
      return `
        <input
          type="text"
          name="id"
          id="id"
          value="${id}"
          style="display: none"
        />
        <label for="activo">Activo</label>
        <input
          type="number"
          name="activo"
          id="activo"
          min="0"
          max="1"
          value="${activo}"
          />
        <label for="fecha">Fecha de creacion</label>
          <input
          type="date"
          name="fecha"
          id="fecha"
          value="${date}"
        />
        <input id="submit" type="submit" value="Modificar" />
      `;
    }
  }
  
  customElements.define('crud-form', Form);