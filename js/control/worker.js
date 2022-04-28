let i=0;
function contador(){
    i++;
    postMessage(i);
    setTimeout("contador()",500);
}
contador();

onmessage = function(e){
    i = e.data;
}