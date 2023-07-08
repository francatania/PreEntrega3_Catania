const autosContainer = document.querySelector(".autos-container")
const numeroCart = document.querySelector(".carrito")
const botonBuscar = document.querySelector(".submit-filtro")
const barraBuscadora = document.querySelector(".buscador-filtro")
const precioMin = document.querySelector(".input-min")
const precioMax = document.querySelector(".input-max")
const limpiarFiltros = document.querySelector(".limpiar-filtro")
const sliderMin = document.querySelector(".range-min")
const sliderMax = document.querySelector(".range-max")
const selectorMarcas = document.querySelector("#selectorMarcas")
const btnEnviarForm = document.querySelector(".enviar-form")
const camposFormulario = document.querySelectorAll(".form-control")

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
                <h2 class="card-error-h2">🔍</h2>
                <h2 class="card-error-h2">No encontramos productos para mostrar.</h2>
                <h4 class="card-error-h4">Intenta de nuevo más tarde.</h4>
            </div>`
}

function retornarErrorFiltro(){
    return `<div class="card-error card-error-autosContainer">
                <h2 class="card-error-h2">🔍</h2>
                <h2 class="card-error-h2">No encontramos productos para mostrar.</h2>
                <h4 class="card-error-h4">Intenta otro filtro.</h4>
            </div>`
}

function retornarNumeroCarrito(numeroCarrito){
    return `<a href="html/carrito.html"><i class="fa-solid fa-cart-shopping"></i><span> (${numeroCarrito})</span></a>`
}

function actualizarHTMLNumeroCarrito(elemento, numero){
    elemento.innerHTML = ""
    elemento.innerHTML += retornarNumeroCarrito(numero)
}

function hacerNumeroCarritoDinamico(carrito){
    const numCarrito = document.querySelector("#numeroCarrito")
    let contador = 0
    for (item of carrito){
        contador += item.cantidad
    }
    actualizarHTMLNumeroCarrito(numCarrito, contador)
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
          zIndex: 9999999999999999,
          fontSize: "12px",
        },
        toastClassName: "toast-index"
      }).showToast();
}

function mostrarProductos(){
    autosContainer.innerHTML = ""
    autos.length > 0 ? autos.forEach((auto) => autosContainer.innerHTML += retornarCard(auto)) : autosContainer.innerHTML += retornarError()
    activarBotones(autos)
}

async function obtenerProductosAsync(){
    try {
        const response = await fetch(URL)
        const data = await response.json()
        autos.push(...data)
        mostrarProductos()
    } catch (error) {
        autosContainer.innerHTML += retornarError()
        console.error(error)
    }

}

function mostrarProductosFiltrados(array){
    autosContainer.innerHTML = ""
    array.length > 0 ? array.forEach(auto => autosContainer.innerHTML += retornarCard(auto)) : autosContainer.innerHTML += retornarErrorFiltro()
    activarBotones(array)
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

function buscarAutos(){
    botonBuscar.addEventListener("click", ()=>{
        const autosFiltrados = autos.filter(auto => {
            if(barraBuscadora.value === "" && selectorMarcas.value === ""){
                return auto.precio >= parseInt(precioMin.value) && auto.precio <= parseInt(precioMax.value)
            }
            else{
                return (auto.nombre.toLowerCase() == barraBuscadora.value.toLowerCase() || auto.marca.toLowerCase() == selectorMarcas.value.toLowerCase()) && (auto.precio >= parseInt(precioMin.value) && auto.precio <= parseInt(precioMax.value))
            }
        })
        mostrarProductosFiltrados(autosFiltrados)
    })
}

function limpiarFiltrosFuncion(){
    limpiarFiltros.addEventListener("click", ()=>{
        mostrarProductos()
        sliderMin.value = 200000
        sliderMax.value = 5000000
        precioMax.value = sliderMax.value
        precioMin.value = sliderMin.value
        selectorMarcas.value = ""
        barraBuscadora.value = ""
    })
}

function activarFiltros(){
    buscarAutos()
    limpiarFiltrosFuncion()
}

function activarBotones(array){
    const buttons = document.querySelectorAll(".button-add")
    for(let button of buttons){
        button.addEventListener("click", e =>{
            let idBoton = parseInt(e.target.id)
            let autoElegido = array.find(auto => auto.id === idBoton)
            carrito.some(auto=> auto.id === idBoton) ? aumentarCantidadAuto(idBoton) : agregarPrimerUnidadDeAuto(autoElegido)
            hacerNumeroCarritoDinamico(carrito)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            avisarProductoAgregadoCarrito(button)
        })
    }
}

function alertarFormEnviado(){
    Swal.fire({
        icon: 'success',
        title: '¡Consulta enviada!',
        confirmButtonText:
            'Ok'
      });
}

function activarFormulario(){
    btnEnviarForm.addEventListener("click", ()=>{
        alertarFormEnviado()
        for(boton of camposFormulario){
            boton.value = ""
        }
    })
}

function activarScrollNav(){
    const nav = document.querySelector(".nav")
    window.addEventListener("scroll", ()=>{
        nav.classList.toggle("nav-scroll", window.scrollY>0)
    })
}

function activarMenuHamburguesa(){
    const botonAbrirMenu = document.querySelector("#abrir")
    const botonCerrarMenu = document.querySelector("#cerrar")
    const menuContainer = document.querySelector(".menu")

    botonAbrirMenu.addEventListener("click", ()=>{
        menuContainer.classList.add("menu-visible")
    })

    botonCerrarMenu.addEventListener("click", ()=>{
        menuContainer.classList.remove("menu-visible")
    })
}

function activarMenuFiltrosDesplegable(){
    const btnDesplegar = document.querySelector("#desplegarFiltros")
    const divFiltros = document.querySelector(".filtrosDesplegable")
    const btnCerrar = document.querySelector("#cerrarFiltros")
    const filtrosContainer = document.querySelector(".filtrosContainer")

    btnDesplegar.addEventListener("click", ()=>{
        divFiltros.classList.add("filtrosDesplegable-activado")
        filtrosContainer.classList.add("filtrosContainer-desplegado")
    })

    btnCerrar.addEventListener("click", ()=>{
        divFiltros.classList.remove("filtrosDesplegable-activado")
        filtrosContainer.classList.remove("filtrosContainer-desplegado")
    })

}


function iniciarWeb(){
    obtenerProductosAsync()
    hacerNumeroCarritoDinamico(carrito)
    activarSliderPrecios()
    activarFiltros()
    activarScrollNav()
    activarFormulario()
    activarMenuHamburguesa()
    activarMenuFiltrosDesplegable()
}

iniciarWeb()

