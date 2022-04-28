import BachesDataAccess from "./BachesDataAcces.js";
class TipoObjetoDataStore extends BachesDataAccess{
    constructor() {
        super();
    }

    findRange(_first = 0, _pageSize = 10){
        let promesa = fetch(`${this.BASE_URL}tipoObjeto/range?first=${_first}&pageSize=${_pageSize}`, {method: "GET"});
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
