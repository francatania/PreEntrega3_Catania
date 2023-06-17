function recuperarLS(){
    return JSON.parse(localStorage.getItem("miCarrito")) || []
}

const carrito = recuperarLS()