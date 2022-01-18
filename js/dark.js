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

