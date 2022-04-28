import TipoObjetoDataStore from "../../js/control/TipoObjetoDataStore.js";
describe("TipoObjetoDataStore", function(){
    var cut;
    it("Deberia instanciarse", function(){
        cut = new TipoObjetoDataStore();
        assert.isDefined(cut,"El objeto no esta instanciado");
    });
    it("Deberia buscar primeros 10", function(){
        cut.findRange(0,10).then(function(respuesta){
            assert.equal(respuesta.status,200);
        });
    });
    it("Deberia contar", function(){
        cut.contar().then(function(respuesta){
            assert.equal(respuesta.status,200);
        });
    });
});