function recuperarLS(){
    return JSON.parse(localStorage.getItem("miCarrito")) || []
}

const carrito = recuperarLS()
const URL = "js/datos.json"


const autos = []


