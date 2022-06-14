import TipoObjetoDataStore from '../../../control/TipoObjetoDataStore.js';

export default class App extends HTMLElement {
    constructor() {
      super();
      this.tObjeto = new TipoObjetoDataStore();
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

    get template() {
      return `
        <h4>Modificacion de datos</h4>
        <crud-form></crud-form>
        <h4>Listado</h4>
        <crud-table></crud-table>
        <h4>Crear dato nuevo</h4>
        <crud-form-create></crud-form-create>
      `;
    }
  
    get style() {
      return `
        .App {
          max-width: 800px;
          margin: 0 auto;
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
      this.tObjeto.modificar(event.detail);
      setTimeout(()=>{
        location.reload();
      },1000);
    }
  
    handleDelete(event) {
      this.removeCharacter(event.detail);
    }
  
    removeCharacter(id) {
      let iD = Number(id);
      this.tObjeto.eliminar(iD);
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
      this.tObjeto.crear(data);
      setTimeout(()=>{
        location.reload();
      },1000);
    }
  
    editCharacter(id) {
        let iD = Number(id);
        let valor = this._data.find(char => char.idTipoObjeto === iD);
      const editCharacterEvent = new CustomEvent('edit-character', {
        detail: valor
      });
      this.form.dispatchEvent(editCharacterEvent);
    }
  
    connectedCallback() {
      this.form.addEventListener('form-submitted', this.handleSubmit);
      this.table.addEventListener('character-deleted', this.handleDelete);
      this.table.addEventListener('character-edited', this.handleEdit);
      this.formCreate.addEventListener('form-submitted-create', this.handleSubmitCreate);
    }
  }
  
  customElements.define('crud-app', App);