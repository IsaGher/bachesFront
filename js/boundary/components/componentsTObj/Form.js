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
      let act = new Boolean()
      if(activo.value === "false"){
        act = false;
      }else if(activo.value === "true"){
        act = true;
      }else{
        return
      }
      if (!activo.value) return;
  
      const submitEvent = new CustomEvent('form-submitted', {
        detail: {
          activo: act,
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
        fecha
      );
      const activo = this.querySelector('#activo');
      if(event.detail.activo){
        activo.value = "true";
      }else{
        activo.value = "false";
      }

    }
  
    formTemplate(id = '', date = '') {
      return `
      <h4>Modificacion de datos</h4>
      <div class="form">
      
        <input
          type="text"
          name="id"
          id="id"
          value="${id}"
          style="display: none"
        />
        <div>
        <label for="activo">Activo</label>
            <select name="activo" id="activo">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
        </div>
          <div>
        <label for="fecha">Fecha de creacion</label>
          <input
          type="date"
          name="fecha"
          id="fecha"
          value="${date}"
        /></div>
        <input id="submit" type="submit" value="Modificar" />
        </div>`;
    }
  }
  
  customElements.define('crud-form', Form);