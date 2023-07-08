const cart = document.querySelector(".cart-container")
const volverBtn = document.querySelector(".volver-button")
const totales = document.querySelectorAll(".total-precio")

class Financiador {
    constructor(precioAuto, cantidadCuotas){
        this.precioAuto = precioAuto
        this.cantidadCuotas = cantidadCuotas
    }
    calcularCuotas(){
        const interes1 = 1.25
        const interes2 = 1.50
        let precioCuota = 0
        this.cantidadCuotas <= 0 ? precioCuota = 0:
        this.cantidadCuotas < 25 ? precioCuota = (this.precioAuto / this.cantidadCuotas) : 
        this.cantidadCuotas > 24 && this.cantidadCuotas < 37 ? precioCuota = ((this.precioAuto * interes1) / this.cantidadCuotas) : 
                                                                precioCuota = ((this.precioAuto * interes2) / this.cantidadCuotas)
        return precioCuota.toFixed(2)
    }
}

function retornarFilaCarrito(auto){
    return `
    <div class="card-carrito">
    <div class="info-cart">
        <div class="img-nombre">
            <div class="img-card-carrito">
                <img class="imgCarrito" src=".${auto.imagen}" alt="">
            </div>
    
        </div>
    
        <div class="cantidad-precio">
            <div class="name-producto div-card">
                <h3 class="tittle-card-carrito" >Nombre Auto</h3>
                <h3 class="auto-prop">${auto.marca} ${auto.nombre}</h3>
            </div>
            <div class="cantidad div-card">
                <h3 class="tittle-card-carrito" >Cantidad</h3>
                <h3 class="auto-prop">${auto.cantidad}</h3>
            </div>
            <div class="precio div-card">
                <h3 class="tittle-card-carrito" >Monto</h3>
                <h3 class="auto-prop">$ <span class="total-precio">${auto.precio * auto.cantidad}</span></h3>
            </div>
        </div>
    </div>


    <div class="financiador-salir">
        
        <div class="div-card cart-buttons-container">
            <button id="${auto.id}" class="financiador-button cart-buttons">Calcular financiamiento</button>
            <button class="borrar cart-buttons" id="${auto.id}"><h3 class="borrar-h3">❌</h3></button>
        </div>
    </div>

</div>
    `
}

function retornarFormularioFinanciador(auto){
    return `
    <div class="card-carrito">
    <div class="info-cart">
        <div class="img-nombre">
            <div class="img-card-carrito">
                <img class="imgCarrito" src=".${auto.imagen}" alt=""></div>
        </div>
        <div class="nombre-precio">
            <div class="name-producto div-card">
                <h3 class="tittle-card-carrito" >Nombre Auto</h3>
                <h3 class="auto-prop">${auto.marca} ${auto.nombre}</h3>
            </div>
            <div class="precio div-card">
                <h3 class="tittle-card-carrito" >Monto</h3>
                <h3 class="auto-prop">$ ${auto.precio * auto.cantidad}</h3>
            </div>
        </div>    

    </div>
        
        
    <div class="inputs-calcular-container">
        <div class="div-card button-calcular-container">
            <input id="inputCuotas" type="number" name="cantidadCuotas" placeholder="Ingrese la cantidad de cuotas">
            <button type="submit" id="calcular">Calcular</button>
        </div>
        <div class="div-card cuota-calculada">
            <h3 class="tittle-card-carrito">Precio cuota</h3>
            <h3 class="auto-prop">$0</h3>
        </div>
    </div>


</div>
    `
}

function retornarFormularioFinanciadorCalculado(auto, cuota){
    return `
    <div class="card-carrito">
    <div class="info-cart">
        <div class="img-nombre">
            <div class="img-card-carrito">
                <img class="imgCarrito" src=".${auto.imagen}" alt=""></div>
        </div>
        <div class="nombre-precio">
            <div class="name-producto div-card">
                <h3 class="tittle-card-carrito" >Nombre Auto</h3>
                <h3 class="auto-prop">${auto.marca} ${auto.nombre}</h3>
            </div>
            <div class="precio div-card">
                <h3 class="tittle-card-carrito" >Monto</h3>
                <h3 class="auto-prop">$ ${auto.precio * auto.cantidad}</h3>
            </div>
        </div>    

    </div>
        
        
    <div class="inputs-calcular-container">
        <div class="div-card button-calcular-container">
            <input id="inputCuotas" type="number" name="cantidadCuotas" placeholder="Ingrese la cantidad de cuotas">
            <button type="submit" id="calcular">Calcular</button>
        </div>
        <div class="div-card cuota-calculada">
            <h3 class="tittle-card-carrito">Precio cuota</h3>
            <h3 class="auto-prop">$ ${cuota}</h3>
        </div>
    </div>


</div>
    `
}

function retornarFormularioTarjetaCredito(totaal){
    return `
    <div class="formulario-pago">
        <div class="mb-3 campos-pago">
            <div class="mb-3 inputs-tarjeta">
                <label for="exampleFormControlInput1" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nombre Apellido" value="Fulanito Pérez">
            </div>
        </div>

        <div class="mb-3 campos-pago">
            <div class="mb-3 inputs-tarjeta">
                <label for="exampleFormControlInput1" class="form-label">DNI</label>
                <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="3517772227" value ="40198756">
            </div>
        </div>

        <div class="mb-3 campos-pago">
            <div class="mb-3 inputs-tarjeta">
                <label for="exampleFormControlInput1" class="form-label">Número de tarjeta</label>
                <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="" value ="0000111122223333">
            </div>
        </div>

        <div class="mb-3 campos-pago-datos-tarjeta">

            <div class="mb-3 inputs-tarjeta inputs-datos-tarjeta">
                <label for="exampleFormControlInput1" class="form-label">Código de seguridad</label>
                <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="3517772227" value ="123">

            </div>

            <div class="mb-3 inputs-tarjeta inputs-fecha-vencimiento">
                <div class="mb-3 inputs-tarjeta inputs-datos-tarjeta">   
                    <label for="exampleFormControlInput1" class="form-label">MMM</label>
                    <input type="number" class="form-control" id="exampleFormControlInput3" value ="12">
                    
                </div>
                <div class="mb-3 inputs-tarjeta inputs-datos-tarjeta"> 
                    <label for="exampleFormControlInput1" class="form-label">YYY</label>
                    <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="3517772227" value ="28">
                </div> 
            </div>

        </div>


        <div class="mb-3 campos-pago ultimos-campos">
            <div class="mb-3 inputs-tarjeta">
                <label for="exampleFormControlInput1" class="form-label">Cantidad de cuotas</label>
                <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="Escribi las cuotas">
            </div>
            <div class="mb-3 inputs-tarjeta total-tarjeta">
                <h3 class="total-tarjeta-h3">Total: $  </h3>
                <h3 class = "total-tarjeta-h3">${totaal}</h3>
            </div>
        </div>
        <button type="submit" class="btn btn-primary enviar-form" id="confirmar-compra">Confirmar compra</button>
    </div>
    `
}

function retornarCardCarritoVacio(){
    return `<div class="card-error card-error-cart">
                <h2 class="card-error-h2">No hay productos en el carrito por el momento</h2>
            </div>`
}

function retornarCardCompra(){
    return `<div class="card-success">
                <h2>✔</h2>
                <h2>Gracias por tu compra!</h2>
            </div>`
}


function reemplazarHTMLCarrito(funcion){
    cart.innerHTML = ""
    cart.innerHTML += funcion
}

function retornarAutoElegido(e){
    let botonId = parseInt(e.currentTarget.id)
    let autoElegido = carrito.find(auto => auto.id === botonId)
    return autoElegido
}

function retornarValorCuota(input, auto){
    const cantidadCuotas = input.value
    const autoACalcular = new Financiador(auto.precio, cantidadCuotas)
    const valorCuota = autoACalcular.calcularCuotas()
    return valorCuota
}

function activarBotonCalcularCuotas(auto){
    const inputCuotas = document.querySelector("#inputCuotas")
    const calcularBtn = document.querySelector("#calcular")
    calcularBtn.addEventListener("click", ()=>{
        reemplazarHTMLCarrito(retornarFormularioFinanciadorCalculado(auto, retornarValorCuota(inputCuotas, auto)))
        activarBotonCalcularCuotas(auto)
    })
}

function retornarBtnVolverCarrito(){
    return `<a href="carrito.html"><button class="volver-button">Volver al carrito</button></a>`
}

function activarBotonVolverCarrito(elemento){
    elemento.innerHTML=""
    elemento.innerHTML += retornarBtnVolverCarrito()
}

function activarBotonFinanciador(){
    const botonVolverCarrito = document.querySelector(".volver-container")
    const financiadorBtn = document.querySelectorAll(".financiador-button")
    for(let boton of financiadorBtn){
        boton.addEventListener("click", (e)=>{
            reemplazarHTMLCarrito(retornarFormularioFinanciador(retornarAutoElegido(e)))
            activarBotonCalcularCuotas(retornarAutoElegido(e))
            activarBotonVolverCarrito(botonVolverCarrito)
        })
    }
}

function borrarProductoCarrito(e){
    const idBoton = parseInt(e.currentTarget.id)
    const autoBorrar = carrito.findIndex(producto => producto.id === idBoton)
    autoBorrar != -1 && carrito[autoBorrar].cantidad > 1 ? carrito[autoBorrar].cantidad-- : carrito.splice(autoBorrar, 1) 
}

function activarBotonBorrar(){
    const borrarCarrito = document.querySelectorAll(".borrar")
    for(let boton of borrarCarrito){
        boton.addEventListener("click", e => {
            borrarProductoCarrito(e)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            actualizarCarrito()
        })
    }
}

function retornarBotonesCart(){
    return `
    <div class="volver-container">
        <a href="carrito.html"><button class="volver-button">Volver al carrito</button></a>
    </div>
    `
}

function activarBotonCompra(){
    const botonCompra = document.querySelector("#confirmar-compra")
    botonCompra.addEventListener("click", ()=>{
        reemplazarHTMLCarrito(retornarCardCompra())
        localStorage.clear()
        Swal.fire({
            icon: 'success',
            title: '¡Muchas gracias por tu compra!',
            confirmButtonText:
                '<a href="../index.html">Ok</a>'
          });
    })}

function reemplazarHTMLParaFormularioPago(contador){
    const carritoContainer = document.querySelector(".cart-container-container")
    const botonesCart = document.querySelector(".botones-cart")
    const segundoPaso = document.querySelector(".segundo-paso")
    const divisorPasos = document.querySelector(".linea")
    const contenedorCarrito = document.querySelector(".section-cart")

    carritoContainer.innerHTML = ""
    carritoContainer.innerHTML += retornarFormularioTarjetaCredito(contador)
    carritoContainer.classList += " cart-container-formulario"
    botonesCart.innerHTML = ""
    botonesCart.innerHTML += retornarBotonesCart()
    botonesCart.classList += " botones-cart-form"
    segundoPaso.classList += " posicion-carrito"
    divisorPasos.classList += " posicion-carrito"
    contenedorCarrito.classList += " section-cart-form"
}

function activarBotonIrAPagar(){
    const botonIrAPagar = document.querySelector(".comprar-button")

    let contadorTotal = 0
    botonIrAPagar.addEventListener("click", ()=>{
        for(let auto of carrito){
            contadorTotal += auto.precio * auto.cantidad
        }
        reemplazarHTMLParaFormularioPago(contadorTotal)
        activarBotonCompra()
    })
}


function activarScrollNav(){
    const nav = document.querySelector(".nav")
    window.addEventListener("scroll", ()=>{
        nav.classList.toggle("nav-scroll", window.scrollY>0)
    })
}

function actualizarHTMLProductosCarrito(){
    cart.innerHTML = ""
    carrito.forEach(productoCarrito => cart.innerHTML += retornarFilaCarrito(productoCarrito))
}

function actualizarCarrito(){
    if(carrito.length >0) {
        actualizarHTMLProductosCarrito()
        activarBotonBorrar()
        activarBotonIrAPagar()
        activarBotonFinanciador()
    }
    else{
        cart.innerHTML = retornarCardCarritoVacio()
    }
}

activarScrollNav()
actualizarCarrito()




