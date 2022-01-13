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

        // $('body').css({ // SE APLICA LA ETIQUETA STYLE AL BODY
        //     "background-color": "black",
        //     "color": "azure"
        })

    $('#btnLightMode').click(() => {
        $('#btnDarkMode').show() //SE PUEDE CAMBIAR POR FADEIN O FADEOUT Y ENTRE PARENTESIS UNA ANIMACION COMO SLOW O FAST
        $('#btnLightMode').hide()

        $('main').removeClass('darkMode')
        localStorage.setItem('darkMode', "light")

        // $('body').css({
        //     "background-color": "azure",
        //     "color": "black"
        })
    })

    $('#btnAnimacion').click(function() {
        $('#box').animate({
            width: "700px",
            height: "150px"
        }, {
            duration:800,
            easing: "linear",
            complete: () => {
                console.log(this)
                $(this).after("<h1>Equipate con las mejores marcas</h1>")
            }
        })
    })

    $('#parrafo1').animate({
        "font-size": "50px"
    }).fadeOut(4000).delay(100).fadeIn(4000)