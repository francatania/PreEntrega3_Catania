
const cart = document.querySelector(".cart-container")
const total = document.querySelector(".total")


function retornarFilaCarrito(auto){
    return `<div class="card-carrito">
                <div class="img-card-carrito">
                <img class="imgCarrito" src="${auto.imagen}" alt=""></div>
                <div class="name-producto div-card">
                    <h3 class="tittle-card" >Nombre Auto</h3>
                    <h3 class="auto-prop">${auto.marca} ${auto.nombre}</h3>
                </div>
                <div class="cantidad div-card">
                    <h3 class="tittle-card" >Cantidad</h3>
                    <h3 class="auto-prop"></h3>
                </div>
                <div class="precio div-card">
                    <h3 class="tittle-card" >Monto</h3>
                    <h3 class="auto-prop">${auto.precio}</h3>
                </div>
                <div class="borrar div-card">
                <button><h3>❌</h3></button>
                </div>
            </div>`
}



function retornarTotal(){
    let totalPrecio = 0
    carrito.forEach(auto => {totalPrecio += auto.precio})
    console.log(totalPrecio)
    return totalPrecio
}

function actualizarCarrito(){
    if(carrito.length >0) {
        cart.innerHTML = ""
        carrito.forEach(productoCarrito =>{
            cart.innerHTML += retornarFilaCarrito(productoCarrito)
        })
        // total.textContent = retornarTotal()
        activarBotonBorrar()
    }
}


function activarBotonBorrar(){
    const borrarCarrito = document.querySelectorAll(".borrar")
    for(let boton of borrarCarrito){
        boton.addEventListener("click", e => {
            const autoBorrar = carrito.findIndex(producto => producto.id === parseInt(e.target.id))
            carrito.splice(autoBorrar, 1)
            console.table(carrito)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            cart.innerHTML = ""
            carrito.forEach(productoCarrito =>{
                cart.innerHTML += retornarFilaCarrito(productoCarrito)
            })
            activarBotonBorrar()
        })
    }
}

actualizarCarrito()




