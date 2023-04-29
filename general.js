function limpiar_contenido(elemento){
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}