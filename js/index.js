let username = ""
let password = ""
let usuarioLogueado = false

class Autos {
    constructor(id, marca, nombre, precio, stock, imagen) {
        this.id = id
        this.marca = marca
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }
}

const autosContainer = document.querySelector(".autos-container")
const numeroCart = document.querySelector(".carrito")

function retornarCard(auto){
    return `<div class="card">
                <div class="img-card">
                    <img src="${auto.imagen}" alt="">
                </div>
                <h2 class="titulo-card" id="titulo-card">${auto.marca + " " + auto.nombre}</h2>
                <h2 class="precio-card" id ="precio-card">$ ${auto.precio}</h2>
                <div class ="button-container">
                    <button type="button" class ="button-add" id="${auto.id}">Agregar al Carrito</button>
                </div>
            </div>`
}

function retornarError(){
    return `<div class="card-error">
                <h2>🔍</h2>
                <h2>Houston, tenemos un problema.</h2>
                <h3>No encontramos productos para mostrar.</h3>
                <h4>Intenta de nuevo en unos instantes...</h4>
            </div>`
}


function agregarProducto(){
    autosContainer.innerHTML = ""
    autos.length > 0 ? autos.forEach((auto) => autosContainer.innerHTML += retornarCard(auto)) : autosContainer.innerHTML += retornarError()
    
    activarBotones()
}

agregarProducto()

function activarBotones(){
    const buttons = document.querySelectorAll(".button-add")
    for(let button of buttons){
        button.addEventListener("click", e =>{
            const autoElegido = autos.find(auto => auto.id === parseInt(e.target.id))
            if(carrito.some(auto=> auto.id === parseInt(e.target.id))){
                const index = carrito.findIndex(auto => auto.id === parseInt(e.target.id))
                carrito[index].cantidad++
            }
            else{
                autoElegido.cantidad = 1
                carrito.push(autoElegido)
            }
            console.log(carrito)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
        })
    }
}
