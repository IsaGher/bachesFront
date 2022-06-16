export default class Table extends HTMLElement {
    constructor() {
      super();
      const table = document.createElement('table');
      table.id = 'table';
      this.appendChild(table);
  
      this.onDelete = this.onDelete.bind(this);
      this.onEdit = this.onEdit.bind(this);
    }
  
    get table() {
      return this.querySelector('#table');
    }
  
    handleUpdateEvent(event) {
      this.updateTable(event.detail);
      this.addButtonListeners();
    }
  
    addButtonListeners() {
      const deleteBtn = this.table.querySelectorAll('.delete-btn');
      const editBtn = this.table.querySelectorAll('.edit-btn');
  
      deleteBtn.forEach(btn => btn.addEventListener('click', this.onDelete));
      editBtn.forEach(btn => btn.addEventListener('click', this.onEdit));
    }
  
    onDelete(e) {
      const id = e.target.getAttribute('data-id');
      const deleteEvent = new CustomEvent('character-deleted', {
        detail: id
      });
      this.dispatchEvent(deleteEvent);
    }
  
    onEdit(e) {
      const id = e.target.getAttribute('data-id');
      const editEvent = new CustomEvent('character-edited', {
        detail: id
      });
      this.dispatchEvent(editEvent);
      document.querySelector("crud-form-create").classList.add('hidden');
      document.querySelector("crud-form").classList.remove('hidden');
    }
  
    updateTable(characters = []) {
      this.table.innerHTML = `
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de Creacion</th>
            <th>Observaciones</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${characters
            .map((character, index) => {
              return `
              <tr>
                <td>${character.nombre}</td>
                <td>${character.fechaCreacion}</td>
                <td>${character.observaciones}</td>
                <td>
                  <button data-id="${character.idRuta}" class="delete-btn" >Borrar</button>
                  <button data-id="${character.idRuta}" class="edit-btn" >Editar</button>
                </td>
            </tr>
            `;
            })
            .join('')}
        </tbody>
      `;
    }
  
    connectedCallback() {
      this.addEventListener('characters-updated', this.handleUpdateEvent);
    }
  }
  
  customElements.define('crud-table', Table);