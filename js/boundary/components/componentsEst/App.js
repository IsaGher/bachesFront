import EstadoDataStore from '../../../control/EstadoDataStore.js';

export default class App extends HTMLElement {
    constructor() {
      super();
      this.estado = new EstadoDataStore();
      this._data = [];
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
  
      const style = document.createElement('style');
      style.innerHTML = this.style;
      this.appendChild(style);
  
      const div = document.createElement('div');
      div.setAttribute('class', 'App');
      div.innerHTML = this.template;
      this.appendChild(div);
    }

    addButtonListeners() {
      const newBtn = document.querySelectorAll('.new-btn');
      newBtn.forEach(btn => btn.addEventListener('click', this.onNew));
    }

    onNew(e) {
    console.log("hello there");
   // document.querySelector("crud-form-create").style.display = "none"; 
   document.querySelector("crud-form-create").classList.remove('hidden');
   document.querySelector("crud-form").classList.add('hidden');
    }

    get template() {
      return `
      <div class="head-button">
      <button class="new-btn" >Nuevo</button></div>
        <crud-form-create></crud-form-create>
        <crud-form></crud-form>
        <div class="table-container">
        <crud-table></crud-table>
        </div>
        
      `;
    }
  
    get style() {
      return `
        .App {
          
        }
      `;
    }
  
    get form() {
      return this.querySelector('crud-form');
    }
  
    get table() {
      return this.querySelector('crud-table');
    }

    get formCreate() {
      return this.querySelector('crud-form-create');
    }

    set data(newVal) {
        this._data = newVal;
        this.updateTable(this._data);
    }

    updateTable(characters = []) {
      const updateEvent = new CustomEvent('characters-updated', {
        detail: characters
      });
      this.table.dispatchEvent(updateEvent);
    }
  
    handleSubmit(event) {
      this.estado.modificar(event.detail);
      alert("Datos Actualizados");
      setTimeout(()=>{
        location.reload();
      },1000);
    }
  
    handleDelete(event) {
      this.removeCharacter(event.detail);
    }
  
    removeCharacter(id) {
      let iD = Number(id);
      this.estado.eliminar(iD);
      alert("Dato Eliminado");
      setTimeout(()=>{
        location.reload();
      },1000);
    }
  
    handleEdit(event) {
      this.editCharacter(event.detail);
    }

    handleSubmitCreate(event){
      this.newCharacter(event.detail);
    }

    newCharacter(data){
      this.estado.crear(data);
      alert("Nuevo dato agregado");
      setTimeout(()=>{
        location.reload();
      },1000);
    }
  
    editCharacter(id) {
        let iD = Number(id);
        let valor = this._data.find(char => char.idEstado === iD);
      const editCharacterEvent = new CustomEvent('edit-character', {
        detail: valor
      });
      this.form.dispatchEvent(editCharacterEvent);
    }
  
    connectedCallback() {
      document.querySelector("crud-form-create").classList.add('hidden');
      document.querySelector("crud-form").classList.add('hidden');
      this.addButtonListeners();
      this.form.addEventListener('form-submitted', this.handleSubmit);
      this.table.addEventListener('character-deleted', this.handleDelete);
      this.table.addEventListener('character-edited', this.handleEdit);
      this.formCreate.addEventListener('form-submitted-create', this.handleSubmitCreate);
    }
  }
  
  customElements.define('crud-app', App);