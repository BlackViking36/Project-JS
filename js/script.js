
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
        <div class="producto1">
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

// EVENTO COMPRA
function compraTotal(productosDelStorage) {
    acumulador = 0;
    productosDelStorage.forEach((productoCarrito) => {
        acumulador += productoCarrito.precio * productoCarrito.cant
    })

    if(acumulador == 0) {
        parrafoCompra.innerHTML = ""
        modalBody.innerHTML = "<p>Tu carrito esta vacio! </p>";
    } else {
        parrafoCompra.innerHTML = `<p>Importe total $${new Intl.NumberFormat("de-DE").format(acumulador)}</p>`;
    }
}

function cargarEventosModal(productosDelStorage) {

    productosDelStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${indice}`).addEventListener('click', () => {
            console.log(`Producto ${productoCarrito.nombre} eliminado`)
            document.getElementById(`productoCarrito${indice}`).remove()
            productos.splice(indice, 1)
            localStorage.setItem('carrito', JSON.stringify(productos))
            cargarProductosModal(JSON.parse(localStorage.getItem('carrito')))
        })
    })

    productosDelStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`sum${indice}`).addEventListener('click', () => {
            console.log()
            if(productos[indice].cant < productos[indice].stock) {
                productos[indice].cant++
                localStorage.setItem('carrito', JSON.stringify(productos))
                cargarProductosModal(JSON.parse(localStorage.getItem('carrito')))
                
            }
        })
    })

    productosDelStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`rest${indice}`).addEventListener('click', () => {
            console.log()
            if(productos[indice].cant > 1) {
                productos[indice].cant--
                localStorage.setItem('carrito', JSON.stringify(productos))
                cargarProductosModal(JSON.parse(localStorage.getItem('carrito')))
            }
        })
    })
    
}

function cargarProductosModal(productosDelStorage) {

    modalBody.innerHTML = " "  
    productosDelStorage.forEach((productoCarrito, indice) => {
        
        modalBody.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${indice}" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${productoCarrito.img}" class="img-fluid rounded-start" alt="photosCarrito">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">


                            <h5 class="card-title">${productoCarrito.nombre}</h5>
                            <div class="row">
                                <p class="card-text">Cantidad: ${productoCarrito.cant}</p>
                                <button class= "btn btn-outline-secondary" id="sum${indice}"><i class="fas fa-plus"></i></button>
                                <button class= "btn btn-outline-secondary" id="rest${indice}"><i class="fas fa-minus"></i></button> 
                            </div>
                            <p class="card-text">$${new Intl.NumberFormat("de-DE").format(productoCarrito.precio * productoCarrito.cant)}</p> 
                            <button class= "btn btn-danger" id="botonEliminar${indice}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
})
cargarEventosModal(productosDelStorage)
compraTotal(productosDelStorage)
}

botonCarrito.addEventListener('click', () => {
    let productosDelStorage = JSON.parse(localStorage.getItem('carrito'))

    cargarProductosModal(productosDelStorage)
    
})

botonFinalizarCompra.addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify([]));
    swal("Gracias por su compra!", "Los productos seran enviados en la brevedad", "success");
})


