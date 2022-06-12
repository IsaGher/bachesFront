import BachesDataAccess from "./BachesDataAcces.js";
class ObjetoDataStore extends BachesDataAccess{
    constructor() {
        super();
    }

    findRange(_first = 0, _pageSize = 10){
        return new Promise((resolve, reject)=>{
            fetch(`${this.BASE_URL}objeto?first=${_first}&pageSize=${_pageSize}`, {method: "GET"}).then(response=>{
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
            fetch(`${this.BASE_URL}objeto/All`, {method: "GET"}).then(response=>{
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
            fetch(`${this.BASE_URL}objeto/${_id}`,{method: "GET"}).then(response=>{
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
            fetch(this.BASE_URL+"objeto/contar", {method:"GET"}).then(response=>{
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
            fetch(this.BASE_URL+"objeto", {
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
            fetch(this.BASE_URL+"objeto", {
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
            fetch(`${this.BASE_URL}objeto/${_id}`,{method: "DELETE"}).then(response=>{
                response.json();
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }
}
export default ObjetoDataStore;
