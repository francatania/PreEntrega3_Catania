
const autosContainer = document.querySelector(".autos-container")
const numeroCart = document.querySelector(".carrito")
const barraBuscadora = document.querySelector(".buscador-filtro")

function retornarCard(auto){
    return `<div class="card">
                <div class="img-card">
                    <img src="${auto.imagen}" alt="">
                </div>
                <div class="title-card">
                    <h2 class="titulo-card" id="titulo-card">${auto.marca + " " + auto.nombre}</h2>
                    <h2 class="precio-card" id ="precio-card">$ ${auto.precio}</h2>
                </div>
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

function retornarErrorFiltro(){
    return `<div class="card-error card-error-autosContainer">
                <h2>🔍</h2>
                <h2>No encontramos productos para mostrar.</h2>
                <h4>Intenta otro filtro.</h4>
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


function avisarProductoAgregadoCarrito(){
    Toastify({
        text: "Agregado al carrito!",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "#21C063",
        }
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

function mostrarProductos(){
    autosContainer.innerHTML = ""
    autos.length > 0 ? autos.forEach((auto) => autosContainer.innerHTML += retornarCard(auto)) : autosContainer.innerHTML += retornarError()
}

function mostrarProductosFiltrados(array){
    autosContainer.innerHTML = ""
    array.length > 0 ? array.forEach(auto => autosContainer.innerHTML += retornarCard(auto)) : autosContainer.innerHTML += retornarErrorFiltro()
}

function activarFiltros(){
    const botonBuscar = document.querySelector(".submit-filtro")
    const barraBuscadora = document.querySelector(".buscador-filtro")
    const precioMin = document.querySelector(".input-min")
    const precioMax = document.querySelector(".input-max")
    const limpiarFiltros = document.querySelector(".limpiar-filtro")
    const sliderMin = document.querySelector(".range-min")
    const sliderMax = document.querySelector(".range-max")


    botonBuscar.addEventListener("click", ()=>{
        const autosFiltrados = autos.filter(auto => {
            if(barraBuscadora.value === ""){
                return auto.precio >= parseInt(precioMin.value) && auto.precio <= parseInt(precioMax.value)
            }
            else{
                return (auto.nombre.toLowerCase() == barraBuscadora.value.toLowerCase() || auto.marca.toLowerCase() == barraBuscadora.value.toLowerCase()) && (auto.precio >= parseInt(precioMin.value) && auto.precio <= parseInt(precioMax.value))
            }
        })
        mostrarProductosFiltrados(autosFiltrados)
    })

    limpiarFiltros.addEventListener("click", ()=>{
        mostrarProductos()
        sliderMin.value = 2000000
        sliderMax.value = 7000000 // agregar los input
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

function activarScrollNav(){
    const nav = document.querySelector(".nav-container")
    window.addEventListener("scroll", ()=>{
        nav.classList.toggle("nav-scroll", window.scrollY>0)
    })
}

function iniciarWeb(){
    mostrarProductos()
    activarBotones()
    hacerNumeroCarritoDinamico(carrito)
    activarSliderPrecios()
    activarFiltros()
    activarScrollNav()
}

iniciarWeb()

