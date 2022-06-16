export default class Form extends HTMLElement {
  constructor() {
    super();
    const form = document.createElement("form");
    form.id = "submitForm";
    form.innerHTML = this.formTemplate();
    this.appendChild(form);
  }

  connectedCallback() {
    this.addEventListener("submit", this.onSubmit);
    this.addEventListener("edit-character", this.onEdit);
  }

  get form() {
    return this.querySelector("#submitForm");
  }

  onSubmit(event) {
    let extra = "T06:00:00Z[UTC]";
    event.preventDefault();
    const id = this.querySelector("#id");
    const name = this.querySelector("#name");
    const observacion = this.querySelector("#observacion");
    const fecha = document.getElementById("fecha").value + extra;
    if (!name.value || !observacion.value) return;

    const submitEvent = new CustomEvent("form-submitted", {
      detail: {
        fechaCreacion: fecha,
        idEstado: id.value,
        nombre: name.value,
        observaciones: observacion.value,
      },
    });
    this.dispatchEvent(submitEvent);
    id.value = "";
    name.value = "";
    observacion.value = "";
  }

  onEdit(event) {
    let fecha = "";
    for (let index = 0; index < 10; index++) {
      fecha = fecha + event.detail.fechaCreacion.charAt(index);
    }
    this.form.innerHTML = this.formTemplate(
      event.detail.idEstado,
      event.detail.nombre,
      event.detail.observaciones,
      fecha
    );
  }

  formTemplate(id = "", name = "", observacion = "", date = "") {
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
        <div class="date-section">
        <label for="fecha">Fecha de creacion</label>
          <input
          type="date"
          name="fecha"
          id="fecha"
          value="${date}"
        />
        </div>
        <input id="submit" type="submit" value="Enviar" />
        </div>
      `;
  }
}

customElements.define("crud-form", Form);
