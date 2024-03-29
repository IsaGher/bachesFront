import TipoObjetoDataStorage from "../../../control/TipoObjetoDataStore.js";
let tipoObjeto = new TipoObjetoDataStorage();
let datos = await tipoObjeto.findAll();

export default class FormCreate extends HTMLElement {
  constructor() {
    super();
    this._datos = datos;
    const form = document.createElement("form");
    form.id = "submitFormCreate";
    form.innerHTML = this.formTemplate();
    this.appendChild(form);
  }

  connectedCallback() {
    this.addEventListener("submit", this.onSubmit);
  }

  get form() {
    return this.querySelector("#submitFormCreate");
  }

  onSubmit(event) {
    const activo = document.getElementById("activoC");
    let tipo = [];
    this._datos.forEach((element) => {
      if (element.idTipoObjeto == Number(activo.value)) {
        tipo = element;
      }
    });
    event.preventDefault();
    const name = document.getElementById("nombreC");
    const observacion = document.getElementById("observacionC");
    const latitud = document.getElementById("latitudC");
    const longitud = document.getElementById("longitudC");
    if (!name.value || !observacion.value) return;

    const submitEvent = new CustomEvent("form-submitted-create", {
      detail: {
        idTipoObjeto: tipo,
        latitud: Number(latitud.value),
        longitud: Number(longitud.value),
        nombre: name.value,
        observaciones: observacion.value,
      },
    });
    this.dispatchEvent(submitEvent);
    name.value = "";
    observacion.value = "";
    latitud.value = "";
    longitud.value = "";
  }

  formTemplate(name = "", observacion = "", latitud = "", longitud = "") {
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
        /></div>
        <div class="latitud-section">
        <label for="latitud">Latitud</label>
          <input
          type="text"
          name="latitud"
          id="latitudC"
          value="${latitud}"
        /></div>
        <div class="longitud-section">
        <label for="longitud">Longitud</label>
          <input
          type="text"
          name="longitud"
          id="longitudC"
          value="${longitud}"
        /></div>
        <div class="activo-section">
        <label for="activo">Tipo Objeto:</label>
            <select name="activo" id="activoC">
            ${this._datos
              .map((char, index) => {
                return `
                    <option value="${char.idTipoObjeto}">${char.activo}</option>
                    `;
              })
              .join("")}
            </select>
            </div>
        <input id="submit" type="submit" value="Crear" />
        </div>
      `;
  }
}

customElements.define("crud-form-create", FormCreate);
