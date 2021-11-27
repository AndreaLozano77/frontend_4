const urlbase = 'http://129.151.119.152:8080/api/user';

const crear = () => {
    //document.getElementById('txtNombre').value;
    const nombre = $('#txtNombre').val();
    const email = $('#txtemail').val();
    const password = $('#txtContrasena').val();
    const confirmar = $('#txtConfirmarClave').val();

    if (password !== confirmar) {
        mostrarMensaje('Error', 'Las contraseñas no coinciden', true);
        return;
    } else if (password.length < 6) {
        mostrarMensaje('Error', 'La contraseña debe tener minimo 6 caracteres', true);
        return;
    }

    if (email === "" || password === "") {
        mostrarMensaje('Error', 'Debe escribir el email y la contraseña para ingresar', true);
        $("#loading").html("");
        return;
    }
// ======================================
    var regularExpresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var correctEmail = regularExpresion.test(email);
    if(correctEmail == false){
        mostrarMensaje('Advertencia', 'El email no es valido, te falta <strong>@</strong> o <strong>.com</strong>', true);
    }/* else{
        validations +=1;
    } */
//========================================

    const payload = {
        name: nombre,
        email: email,
        password: password
    };

    $.ajax({
        url: `${urlbase}/new`,
        type: "POST",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                mostrarMensaje('Confirmacion', 'Cuenta Creada');
                //alert('Empresa Creada');
            }
        },
    });

    entrar();
} 
 

const mostrarMensaje = (titulo, cuerpo, error) => {
    //console.log("error",error);
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-warning")
    } else {
        $("#myToast").addClass("toast bg-primary")
    }

    $("#myToast").toast("show");
}


const entrar = () => {
    const loading = '<img src="images/stopwatch.gif">';
    $("#loading").html(loading);

    setTimeout(()=>{
        autenticar();
    }, 2000);
}

const autenticar = ()=>{
    const email = $("#txtemail").val();
    const password = $("#txtContrasena").val();

    if (email === "" || password === "") {
        mostrarMensaje('Error', 'Debe escribir el email y la contraseña para ingresar', true);
        $("#loading").html("");
        return;
    }



    $.ajax({
        url: `${urlbase}/${email}/${password}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#loading").html("");
            console.log(respuesta);
            if (respuesta.id===null){
                mostrarMensaje('Error', 'Usuario y/o contraseña incorrectos', true);
            }else{
                mostrarMensaje('Bienvenido', 'Ingreso Correcto');

                setTimeout(()=>{
                    window.location.href = 'principal.html';
                }, 2000);              
            }
        },
        error: function (xhr, status) {
            $("#loading").html("");
            console.log(xhr);
            console.log(status);
            mostrarMensaje('Error', 'Error al validar', true);
        }
    });

}


