let boton_registrar = document.getElementById("registrar");
let boton_login = document.getElementById("login");
boton_registrar.addEventListener("click", mostrar_registro);
boton_login.addEventListener("click", mostrar_login);


function mostrar_registro(e){
    e.preventDefault();
    let div_padre = e.target.parentNode;
    limpiar_contenido(div_padre);
    mostrar_form_regis(div_padre);
}

function mostrar_login(e){
    e.preventDefault();
    let div_padre = e.target.parentNode;
    limpiar_contenido(div_padre);
    mostrar_form_login(div_padre);
}

function mostrar_form_regis(div_padre){
    let formulario = document.createElement("form");
    formulario.classList="register-form";
    let label_nombre = document.createElement("label");
    let input_nombre = document.createElement("input");
    let label_apellido = document.createElement("label");
    let input_apellido = document.createElement("input");
    let label_password = document.createElement("label");
    let input_password = document.createElement("input");
    let label_email = document.createElement("label");
    let input_email = document.createElement("input");

    let registro = document.createElement("button");


    label_nombre.innerText = "Nombre Completo";
    label_apellido.innerText = "Apellidos";
    label_password.innerText = "Password";
    label_email.innerText = "Email";

    input_nombre.id = "input_nombre_regis";
    input_nombre.required=true;
    input_nombre.placeholder="Ej: Israel";

    input_apellido.id = "input_apellido_regis";
    input_apellido.required=true;
    input_apellido.placeholder="Ej: Zurita Cotaña";

    
    input_email.id = "input_email_regis";
    input_email.required = true;
    input_password.setAttribute("type", "email");
    input_email.placeholder="Ej: israelzuritacotania@gmail.com";
    
    input_password.id = "input_password_regis";
    input_password.setAttribute("type", "password");
    input_password.required = true;
    input_password.value="";

    registro.id ="registro";
    registro.addEventListener("click",registrar_usuario);
    registro.innerText="Registrar usuario"
  
    formulario.appendChild(label_nombre);
    formulario.appendChild(input_nombre);
    formulario.innerHTML +="<br>"
    formulario.appendChild(label_apellido);
    formulario.appendChild(input_apellido);
    formulario.innerHTML +="<br>"
    formulario.appendChild(label_password);
    formulario.appendChild(input_password);
    formulario.innerHTML +="<br>"
    formulario.appendChild(label_email);
    formulario.appendChild(input_email);
    formulario.innerHTML +="<br>"
    formulario.appendChild(registro);
    //anadir al div contenido
    formulario.appendChild(boton_login);
    div_padre.appendChild(formulario);
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "Registro"
    let mensajeIngreso = document.getElementById("mensajeIngreso");
    mensajeIngreso.innerText="Introdusca su información";
}



function registrar_usuario(e){
    e.preventDefault();
    if(document.getElementById("p_error"))
    {
        document.getElementById("p_error").remove();
    }
    let p_error = document.createElement("p");
    p_error.id="p_error";
    p_error.classList.add("rojo");
    let formulario = e.target.parentNode;
    let nombre = document.getElementById("input_nombre_regis").value;
    let apellido = document.getElementById("input_apellido_regis").value;
    let password = document.getElementById("input_password_regis").value;
    let email = document.getElementById("input_email_regis").value;

    //crear un objeto usuario
    if(validar_formulario(formulario))
    {
        var emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verificar si el valor es una dirección de correo electrónico válida
        if (emailRegExp.test(email)) {
          // El valor es una dirección de correo electrónico válida
          if(!email_repetido(email))
            {
                let validacion = validarPasswordLongitud(password);
                if(validacion===true)
                {
                    let newUsuario = new Usuario(nombre,apellido,cifrarContraseña(password),email);
                    localStorage.setItem(email,JSON.stringify(newUsuario));
                    console.log("Registro exitoso");
                    formulario.reset();
                    e.preventDefault();
                    let div_padre = formulario.parentNode;
                    limpiar_contenido(div_padre);
                    mostrar_form_acceso_bienvenida(div_padre,nombre,apellido,email,"Bienvenido!","¡Gracias por registrarte!");
                }
                else{
                    p_error.innerHTML = validacion;
                    formulario.appendChild(p_error);
                }
                
            }
            else
            {
            
                p_error.innerHTML = "Error el email ya esta registrado.";
                formulario.appendChild(p_error);
            }
        } else {
            p_error.innerHTML = "Introduzca una dirección de correo electrónico válida";
            formulario.appendChild(p_error);
        }
        
        
    }
    else
    {
       
        p_error.innerHTML = "Error,existe uno o mas campos vacios.";
        formulario.appendChild(p_error);

    }
    
}

function validar_formulario(formulario){
    let inputs = document.querySelectorAll("input");
    let valido = true;
    for (let i = 0; i < inputs.length; i++){
        if(inputs[i].value == "")
        {
            valido = false;
            break
        }
    }
    return valido;
}

function email_repetido(email){
    let repetido = false;
    for(let i=0; i<localStorage.length; i++)
    {
        if(localStorage.key(i) == email){
            repetido = true;
            break;
        }
    }

    return repetido;
}



function mostrar_form_acceso_bienvenida(div_padre,nombre,apellido,email,mensaje1, mensaje2){
    let card = document.createElement("div");
    card.classList="card";
    let label_nombre = document.createElement("label");
    let span_nombre = document.createElement("span");
    let label_apellido = document.createElement("label");
    let span_apellido = document.createElement("span");
    let imagenCard = document.createElement("img");
    imagenCard.id="imagen";
    imagenCard.setAttribute("alt", "Avatar Aleatorio");

    let label_email = document.createElement("label");
    let span_email = document.createElement("span");

    let cerrarSesion = document.createElement("button");


    label_nombre.innerText = "Nombre:";
    label_apellido.innerText = "Apellido:";
    label_email.innerText = "Correo electrónico:";

    span_nombre.id = "nombre";
    span_apellido.id = "apellido";
    span_email.id = "email";

    span_nombre.innerHTML=nombre,
    span_apellido.innerHTML=apellido,
    span_email.innerHTML=email;
   

    cerrarSesion.id ="cerrarSesion";
    cerrarSesion.addEventListener("click",function(e){
       location.reload();
    });
    cerrarSesion.innerText="Cerrar Sesion";
  
    card.appendChild(imagenCard);
    card.appendChild(label_nombre);
    card.appendChild(span_nombre);
    card.innerHTML +="<br>"
    card.appendChild(label_apellido);
    card.appendChild(span_apellido);
    card.innerHTML +="<br>"
    card.appendChild(label_email);
    card.appendChild(span_email);
    card.innerHTML +="<br>"
    card.appendChild(cerrarSesion);
    console.log(card);
    div_padre.appendChild(card);
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = mensaje1;
    let mensajeIngreso = document.getElementById("mensajeIngreso");
    mensajeIngreso.innerText=mensaje2;
    cargarImagen();

}

/*Login */

function mostrar_form_login(div_padre){
    let formulario = document.createElement("form");
    formulario.classList="register-form";
    let label_password = document.createElement("label");
    let input_password = document.createElement("input");
    let label_email = document.createElement("label");
    let input_email = document.createElement("input");

    let acceso = document.createElement("button");
    let cerrarSesion = document.createElement("button");
    cerrarSesion.id = "cerrarSesion";
    cerrarSesion.addEventListener("click",function(e){
       location.reload();
    });
    cerrarSesion.innerText="Cancelar";

    label_password.innerText = "Password";
    label_email.innerText = "Email";

    input_email.id = "input_email_regis";
    input_email.required = true;
    input_password.setAttribute("type", "email");
    input_email.placeholder="Ej: israelzuritacotania@gmail.com";
    
    input_password.id = "input_password_regis";
    input_password.setAttribute("type", "password");
    input_password.required = true;
    input_password.value="";

    acceso.id ="acceso";
    acceso.addEventListener("click",verificar_usuario);
    acceso.innerText="Iniciar Sesion";

    formulario.appendChild(label_email);
    formulario.appendChild(input_email);
    formulario.innerHTML +="<br>"
    formulario.appendChild(label_password);
    formulario.appendChild(input_password);
    formulario.innerHTML +="<br>"
    formulario.appendChild(acceso);
    //anadir al div contenido
    formulario.appendChild(cerrarSesion);
    div_padre.appendChild(formulario);
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "Iniciar Sesion";
    let mensajeIngreso = document.getElementById("mensajeIngreso");
    mensajeIngreso.innerText="Introdusca su informacion";
}


function verificar_usuario(e){
    e.preventDefault();
    if(document.getElementById("p_error"))
    {
        document.getElementById("p_error").remove();
    }
    let p_error = document.createElement("p");
    p_error.id="p_error";
    p_error.classList.add("rojo");
    let formulario = e.target.parentNode;
    let password = document.getElementById("input_password_regis").value;
    let email = document.getElementById("input_email_regis").value;

    //crear un objeto usuario
    if(validar_formulario(formulario))
    {
        var emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verificar si el valor es una dirección de correo electrónico válida
        if (emailRegExp.test(email)) {
            let div_padre = formulario.parentNode;
          // El valor es una dirección de correo electrónico válida
          if(email_password(email,password,div_padre))
            { }
            else
            {
            
                p_error.innerHTML = "Usuario o contraseña incorrectos.";
                formulario.appendChild(p_error);
            }
        } else {
            p_error.innerHTML = "Introduzca una dirección de correo electrónico válida";
            formulario.appendChild(p_error);
        }
        
        
    }
    else
    {
       
        p_error.innerHTML = "Error,existe uno o mas campos vacios.";
        formulario.appendChild(p_error);

    }
    
}

/*Validar el email como el usuario para acceder */
function email_password(email,password,div_padre){
    let repetido = false;
    for(let i=0; i<localStorage.length; i++)
    {
        const registro = localStorage.key(i);
        var json=localStorage.getItem(registro);
        var myObj= JSON.parse(json);
        if(registro == email && myObj.password == cifrarContraseña(password)){

            limpiar_contenido(div_padre);
            mostrar_form_acceso_bienvenida(div_padre,myObj.nombre,myObj.apellido,email,"Bienvenido!","¡Gracias por iniciar sesión correctamente!");
            repetido = true;
            break;
        }
    }

    return repetido;

    
}


function cifrarContraseña(contrasenia) {
    

    // Aplicar SHA-256 a la contraseña
    var hash = CryptoJS.SHA256(contrasenia);

    // Convertir el hash a una cadena de texto
    var hashTexto = hash.toString(CryptoJS.enc.Hex);

    return hashTexto;
  }

//validacion para requisitos contraseña segura
  function validarPasswordLongitud(password) {
    // Verificar longitud mínima de 6 caracteres
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    // Verificar si contiene al menos un número
    if (!/\d/.test(password)) {
      return "La contraseña debe contener al menos un número.";
    }
    // Verificar si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    // Si pasa todas las validaciones, retorna true
    return true;
  }

function cargarImagen(){
      // Obtener un elemento HTML para mostrar la imagen
const imgElement = document.getElementById("imagen");
console.log(imgElement);

// Hacer una solicitud GET a la API de Unsplash
fetch("https://picsum.photos/200/200/?random")
  .then(response => {
    // Si la respuesta es un éxito, mostrar la imagen en el elemento HTML
    if (response.ok) {
      // Crear una URL para la imagen
      const imgUrl = response.url;
      // Configurar el estilo del elemento HTML para mostrar la imagen en un círculo
      imgElement.style.borderRadius = "50%";
      imgElement.style.width = "150px";
      imgElement.style.height = "150px";
      imgElement.style.objectFit = "cover";
      // Establecer la URL de la imagen como fuente del elemento HTML
      imgElement.src = imgUrl;
    }
  })
  .catch(error => {
    console.error("Ha ocurrido un error al obtener la imagen: ", error);
  });

  }

  