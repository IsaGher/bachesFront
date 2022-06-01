import BachesDataAccess from "./BachesDataAcces.js";
class TipoObjetoDataStore extends BachesDataAccess{
    constructor() {
        super();
    }

    findRange(_first = 0, _pageSize = 10){
        let promesa = fetch(`${this.BASE_URL}tipoObjeto?first=${_first}&pageSize=${_pageSize}`, {method: "GET"});
        promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.error(err));
        return promesa;
    }

    findById(_id){
        let promesa = fetch(`${this.BASE_URL}tipoObjeto/${_id}`,{method: "GET"});
        promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.log(err));
        return promesa;
    }

    async contar(){
        let promesa = fetch(this.BASE_URL+"tipoObjeto/contar",
            {method:"GET"}
        );
        await promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.error(err));
        console.log("Entro a contar");
    }
}
export default TipoObjetoDataStore;
console.log("antes de contar");
let t = new TipoObjetoDataStore();
t.contar();
console.log("despues de contar");
