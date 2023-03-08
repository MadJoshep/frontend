export function validar(input){
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }
    //console.log(input.parentElement)
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input)
        }
}

const tiposDeErrores = [
    "valueMissing", 
    "typeMismatch", 
    "patterMismatch", 
    "customError"
]

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"    
    },
    password: {
        valueMissing: "Contraseña no puede estar vacio",
        patterMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra mayuscula, una letra minuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    }, 
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "El formato requerido es XXXXXXXXXXXX",
    },
    direccion: {
        valueMissing: "La direccion no puede estar vacia",
        patterMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "La ciudad no puede estar vacia",
        patterMismatch: "La ciudad debe contener entre 10 a 15 caracteres"
    },
    estado: {
        valueMissing: "El estado no puede estar vacia",
        patterMismatch: "El estado debe contener entre 10 a 40 caracteres"
    }


}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoInput, input){
    let mensaje = ""
    tiposDeErrores.forEach(( error ) => {
        if (input.validity[error]){
            console.log(tipoInput, error)
            console.log(input.validity[error])
            console.log(mensajesError[tipoInput][error])
            mensaje = mensajesError[tipoInput][error]
        }
    })


    return mensaje
}
const inputNacimiento = document.querySelector("#birth")

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target)
})

function validarNacimiento(input){
    const fechaCliente = new Date(input.value)
    let mensaje = ""
    if (!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"

    }

    input.setCustomValidity(mensaje)
}

function mayorEdad(fecha){
    const fechaActual = new Date()
    const diferenciaFechas = new Date(fecha.getUTCFullYear() +18, fecha.getUTCMonth(), fecha.getUTCDate())
    return diferenciaFechas <= fechaActual 
}