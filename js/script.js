// INICIO DARKMODE
let darkMode;

if(localStorage.getItem('darkMode')) {
    darkMode = localStorage.getItem('darkMode')
} else {
    darkMode = "light"
}

localStorage.setItem('darkMode', darkMode)

$(() => {
    if(localStorage.getItem('darkMode') == "dark"){
        $('main').addClass('darkMode')
        $('#btnDarkMode').hide()
        $('#btnLightMode').show()
    } else {
        $('#btnLightMode').hide()
    }

    $('#btnDarkMode').click(() => {
        $('#btnDarkMode').hide()
        $('#btnLightMode').show()

        $('main').addClass('darkMode')
        localStorage.setItem('darkMode', "dark") 

        })

    $('#btnLightMode').click(() => {
        $('#btnDarkMode').show() //SE PUEDE CAMBIAR POR FADEIN O FADEOUT Y ENTRE PARENTESIS UNA ANIMACION COMO SLOW O FAST
        $('#btnLightMode').hide()

        $('main').removeClass('darkMode')
        localStorage.setItem('darkMode', "light")

        })
    })
    // FIN DARKMODE



    // INICIO CARRITO
    localStorage.setItem('carrito', JSON.stringify([]))
    let divProductos = document.getElementById("divProductos")
    let botonCarrito = document.getElementById("botonCarrito")
    let modalBody = document.getElementById("modal-body")
    let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
    let parrafoCompra = document.getElementById('precioTotal')
    let acumulador;
    
    fetch('../productos.json')
    .then(response => response.json())
    .then(dataProductos => {
        dataProductos.forEach((productoEnArray, indice)=> {
    
            divProductos.innerHTML += `
            <div class="producto1" id="prod">
                <div class="cardprod" id="producto${indice}">
                    <div class="cardprodImg d-flex justify-content-center col-12">
                        <img src="../${productoEnArray.img}" class="img-fluid cardprodImg-zoom" alt="imgPro">
                    </div>
                    <div class="cardprodInfo">
                        <p>${productoEnArray.nombre}</p>
                        <p> Stock: ${productoEnArray.stock}</p>
                    </div>
                    <div class="cardprodPrecio">
                        <span>$${productoEnArray.precio}</span>
                        <button id="boton${indice}" class="button button--prod">Añadir al carrito</button>
                    </div>
                </div>
            </div>

            <div class="producto2" id="note">
                <div class="cardprod" id="producto${indice}">
                    <div class="cardprodImg d-flex justify-content-center col-12">
                        <img src="../${productoEnArray.img}" class="img-fluid cardprodImg-zoom" alt="imgNote">
                    </div>
                    <div class="cardprodInfo">
                        <p>${productoEnArray.nombre}</p>
                        <p> Stock: ${productoEnArray.stock}</p>
                    </div>
                    <div class="cardprodPrecio">
                        <span>$${productoEnArray.precio}</span>
                        <button id="boton${indice}" class="button button--prod">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            `
        });
    
        dataProductos.forEach((productoEnArray, indice) => {
            document.getElementById(`boton${indice}`).addEventListener('click', () => {
                if(productos.find(producto => producto.nombre == productoEnArray.nombre)) {
                    let index = productos.findIndex(producto => producto.nombre == productoEnArray.nombre)
                    productos[index].cant++;
                    localStorage.setItem('carrito', JSON.stringify(productos))
                } else {
                    let nuevoProducto = new Producto(productoEnArray.nombre, productoEnArray.precio, productoEnArray.stock, productoEnArray.img)
                    productos.push(nuevoProducto)
                    localStorage.setItem('carrito', JSON.stringify(productos))
                }
            
            })
        })
    })
    // FIN CARRITO