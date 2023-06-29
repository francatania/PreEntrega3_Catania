
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
    return `<div class="card-error card-error-autosContainer">
                <h2>🔍</h2>
                <h2>No encontramos productos para mostrar.</h2>
                <h4>Intenta de nuevo más tarde.</h4>
            </div>`
}

function retornarNumeroCarrito(numeroCarrito){
    return `<a href="carrito.html"><i class="fa-solid fa-cart-shopping"></i><span> (${numeroCarrito})</span></a>`
}

function hacerNumeroCarritoDinamico(carrito){
    const numCarrito = document.querySelector("#numeroCarrito")
    let contador = 0
    for (item of carrito){
        contador += item.cantidad
    }
    numCarrito.innerHTML = ""
    numCarrito.innerHTML += retornarNumeroCarrito(contador)
}

function aumentarCantidadAuto(id){
    const index = carrito.findIndex(auto => auto.id === id)
    carrito[index].cantidad++
}

function agregarPrimerUnidadDeAuto(auto){
    auto.cantidad = 1
    carrito.push(auto)
}


function avisarProductoAgregadoCarrito(elemento){
    // elemento.textContent = "Agregado ✔"
    // setTimeout(()=>{
    //     elemento.textContent = "Agregar al carrito"
    // }, 2000)
    Toastify({
        text: "Agregado al carrito!",
        duration: 1000,
        // destination: ,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#21C063",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function activarSliderPrecios(){
    const inputPrecioMin = document.querySelector(".input-min")
    const inputPrecioMax = document.querySelector(".input-max")
    const sliderMin = document.querySelector(".range-min")
    const sliderMax = document.querySelector(".range-max")

    sliderMin.addEventListener("input", ()=>{
        inputPrecioMin.value = sliderMin.value
    })

    sliderMax.addEventListener("input", ()=>{
        inputPrecioMax.value = sliderMax.value
    })
}

function activarBotones(){
    const buttons = document.querySelectorAll(".button-add")
    for(let button of buttons){
        button.addEventListener("click", e =>{
            let idBoton = parseInt(e.target.id)
            let autoElegido = autos.find(auto => auto.id === idBoton)
            carrito.some(auto=> auto.id === idBoton) ? aumentarCantidadAuto(idBoton) : agregarPrimerUnidadDeAuto(autoElegido)
            hacerNumeroCarritoDinamico(carrito)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            avisarProductoAgregadoCarrito(button)
        })
    }
}

function agregarProducto(){
    autosContainer.innerHTML = ""
    autos.length > 0 ? autos.forEach((auto) => autosContainer.innerHTML += retornarCard(auto)) : autosContainer.innerHTML += retornarError()
    activarBotones()
    hacerNumeroCarritoDinamico(carrito)
    activarSliderPrecios()
}

agregarProducto()

