
const cart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const volverBtn = document.querySelector(".volver-button")

class Financiador {
    constructor(precioAuto, cantidadCuotas){
        this.precioAuto = precioAuto
        this.cantidadCuotas = cantidadCuotas
    }
    calcularCuotas(){
        const interes1 = 1.25
        const interes2 = 1.50
        let precioCuota = 0
        this.cantidadCuotas < 25 ? precioCuota = (this.precioAuto / this.cantidadCuotas) : 
        this.cantidadCuotas > 24 && this.cantidadCuotas < 37 ? precioCuota = ((this.precioAuto * interes1) / this.cantidadCuotas) : 
                                                                precioCuota = ((this.precioAuto * interes2) / this.cantidadCuotas)
        return precioCuota.toFixed(2)
    }
}


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
                    <h3 class="auto-prop">${auto.cantidad}</h3>
                </div>
                <div class="precio div-card">
                    <h3 class="tittle-card" >Monto</h3>
                    <h3 class="auto-prop">$ ${auto.precio * auto.cantidad}</h3>
                </div>
                <div class="div-card card-buttons">
                    <button id="${auto.id}" class="financiador-button">Calcular financiamiento</button>
                    <button class="borrar" id="${auto.id}"><h3>❌</h3></button>
                </div>
            </div>`
}

function retornarFormularioFinanciador(auto){
    return `<div class="card-carrito">
                <div class="img-card-carrito">
                <img class="imgCarrito" src="${auto.imagen}" alt=""></div>
                <div class="name-producto div-card">
                    <h3 class="tittle-card" >Nombre Auto</h3>
                    <h3 class="auto-prop">${auto.marca} ${auto.nombre}</h3>
                </div>
                <div class="precio div-card">
                    <h3 class="tittle-card" >Monto</h3>
                    <h3 class="auto-prop">$ ${auto.precio * auto.cantidad}</h3>
                </div>
                <div class="div-card">
                    <input id="inputCuotas" type="number" name="cantidadCuotas" placeholder="Ingrese la cantidad de cuotas">
                    <button type="submit" id="calcular">Calcular</button>
                </div>
                <div class="div-card cuota-calculada">
                    <h3 class="tittle-card">Precio cuota</h3>
                    <h3>$0</h3>
                </div>
            </div>`
}

function retornarFormularioFinanciadorCalculado(auto, cuota){
    return `<div class="card-carrito">
                <div class="img-card-carrito">
                <img class="imgCarrito" src="${auto.imagen}" alt=""></div>
                <div class="name-producto div-card">
                    <h3 class="tittle-card" >Nombre Auto</h3>
                    <h3 class="auto-prop">${auto.marca} ${auto.nombre}</h3>
                </div>
                <div class="precio div-card">
                    <h3 class="tittle-card" >Monto</h3>
                    <h3 class="auto-prop">$ ${auto.precio * auto.cantidad}</h3>
                </div>
                <div class="div-card">
                    <input id="inputCuotas" type="number" name="cantidadCuotas" placeholder="Ingrese la cantidad de cuotas">
                    <button type="submit" id="calcular">Calcular</button>
                </div>
                <div class="div-card cuota-calculada">
                    <h3 class="tittle-card">Precio cuota</h3>
                    <h3>$ ${cuota}</h3>
                </div>
            </div>`
}


function activarBotonFinanciador(){
    const financiadorBtn = document.querySelectorAll(".financiador-button")
    for(let boton of financiadorBtn){
        boton.addEventListener("click", (e)=>{
            let botonId = parseInt(e.currentTarget.id)
            let autoFinanciado = carrito.find(auto => auto.id === botonId)
            cart.innerHTML = ""
            cart.innerHTML += retornarFormularioFinanciador(autoFinanciado)
            activarBotonCalcularCuotas(autoFinanciado)
        })
    }
}

function activarBotonCalcularCuotas(auto){
    const inputCuotas = document.querySelector("#inputCuotas")
    const calcularBtn = document.querySelector("#calcular")
    calcularBtn.addEventListener("click", ()=>{
        const cantidadCuotas = inputCuotas.value
        const autoACalcular = new Financiador(auto.precio, cantidadCuotas)
        const valorCuota = autoACalcular.calcularCuotas()
        cart.innerHTML = ""
        cart.innerHTML += retornarFormularioFinanciadorCalculado(auto, valorCuota)
        activarBotonCalcularCuotas(auto)
    })

}

function retornarCardCarritoVacio(){
    return `<div class="card-error">
                <h2>🔍</h2>
                <h2>No hay productos en el carrito por el momento</h2>
            </div>`
}

function retornarCardCompra(){
    return `<div class="card-success">
                <h2>✔</h2>
                <h2>Gracias por tu compra!</h2>
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
        activarBotonBorrar()
        activarBotonCompra()
        activarBotonFinanciador()
    }
    else{
        cart.innerHTML = retornarCardCarritoVacio()
    }
}

function activarBotonBorrar(){
    const borrarCarrito = document.querySelectorAll(".borrar")
    for(let boton of borrarCarrito){
        boton.addEventListener("click", e => {
            const idBoton = parseInt(e.currentTarget.id)
            console.log(idBoton)
            const autoBorrar = carrito.findIndex(producto => producto.id === idBoton)
            if(autoBorrar != -1){
                if(carrito[autoBorrar].cantidad > 1){
                    carrito[autoBorrar].cantidad--
                }
                else{
                    carrito.splice(autoBorrar, 1)
                }
            }
            console.table(carrito)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            actualizarCarrito()
        })
    }
}

function activarBotonCompra(){
    const botonCompra = document.querySelector(".comprar-button")
    botonCompra.addEventListener("click", ()=>{
        cart.innerHTML = ""
        cart.innerHTML += retornarCardCompra()
        localStorage.clear()
    })
}


actualizarCarrito()




