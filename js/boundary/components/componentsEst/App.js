import EstadoDataStore from '../../../control/EstadoDataStore.js';

export default class App extends HTMLElement {
    constructor() {
      super();
      this.estado = new EstadoDataStore();
      this.characters = [];
      this._data = [];
      this.ver = [];
  
      /**
       * These methods are used as callbacks for event handlers on child elements,
       * the this would be the child element instead of the Custom Element.
       */
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
  
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
        <crud-form></crud-form>
        <crud-table></crud-table>
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
      setTimeout(()=>{
        location.reload();
      },1000);
    }
  
    handleEdit(event) {
      this.editCharacter(event.detail);
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
      this.form.addEventListener('form-submitted', this.handleSubmit);
      this.table.addEventListener('character-deleted', this.handleDelete);
      this.table.addEventListener('character-edited', this.handleEdit);
    }
  }
  
  customElements.define('crud-app', App);