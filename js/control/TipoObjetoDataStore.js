import BachesDataAccess from "./BachesDataAcces.js";
class TipoObjetoDataStore extends BachesDataAccess{
    constructor() {
        super();
    }

    findRange(_first = 0, _pageSize = 10){
        return new Promise((resolve, reject)=>{
            fetch(`${this.BASE_URL}tipoObjeto?first=${_first}&pageSize=${_pageSize}`, {method: "GET"}).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Datos no obtenidos, estado: "+response.status);
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    findAll(){
        return new Promise((resolve, reject)=>{
            fetch(`${this.BASE_URL}tipoObjeto/All`, {method: "GET"}).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Datos no obtenidos, estado: "+response.status);
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    findById(_id){
        return new Promise((resolve, reject)=>{
            fetch(`${this.BASE_URL}tipoObjeto/${_id}`,{method: "GET"}).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Dato no obtenido, estado: "+response.status);
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    async contar(){
        return new Promise((resolve, reject)=>{
            fetch(this.BASE_URL+"tipoObjeto/contar", {method:"GET"}).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Dato no obtenido");
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    crear(data){
        return new Promise((resolve, reject)=>{
            fetch(this.BASE_URL+"tipoObjeto", {
                method:"POST",
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Dato no obtenido");
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    modificar(data){
        return new Promise((resolve, reject)=>{
            fetch(this.BASE_URL+"tipoObjeto", {
                method:"PUT",
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Dato no obtenido");
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    eliminar(_id){
        return new Promise((resolve, reject)=>{
            fetch(`${this.BASE_URL}tipoObjeto/${_id}`,{method: "DELETE"}).then(response=>{
                response.json();
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }

    findByObjeto(_first = 0, _pageSize = 10, _idTObjeto){
        return new Promise((resolve, reject)=>{
            fetch(`${this.BASE_URL}tipoObjeto/${_idTObjeto}/objeto?first=${_first}&pageSize=${_pageSize}`, {method: "GET"}).then(response=>{
                if(response.ok){
                    return response.json();
                }
                reject("Datos no obtenidos, estado: "+response.status);
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }
}
export default TipoObjetoDataStore;