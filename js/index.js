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

const autos = [{ id: 1327, marca: "Peugeot", nombre: "208", precio: 7500000, stock: 13, imagen: "./assets/img/208.jpg" },
{ id: 1328, marca: "Peugeot", nombre: "308", precio: 9500000, stock: 10, imagen: "./assets/img/308.jpg"},
{ id: 1329, marca: "FIAT", nombre: "Cronos", precio: 5500000, stock: 24, imagen:"./assets/img/cronos.jpg" },
{ id: 1330, marca: "FIAT", nombre: "Argo", precio: 6200000, stock: 17, imagen: "./assets/img/argo.jpg" },
{ id: 1331, marca: "VW", nombre: "Gol Trend", precio: 700000, stock: 11, imagen: "./assets/img/gol.jpg" },
{ id: 1332, marca: "Toyota", nombre: "Corolla", precio: 9500000, stock: 12, imagen: "./assets/img/corolla.jpg" },
{ id: 1333, marca: "VW", nombre: "Golf", precio: 8300000, stock: 15, imagen: "./assets/img/golf.jpg" },
{ id: 1334, marca: "VW", nombre: "Fox", precio: 4300000, stock: 20, imagen: "./assets/img/fox.jpg"},
{ id: 1335, marca: "FIAT", nombre: "Mobi", precio: 5300000, stock: 28, imagen: "./assets/img/mobi.jpg"}]



const autosContainer = document.querySelector(".autos-container")

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
            carrito.push(autoElegido)
            console.log(carrito)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
        })
    }
}