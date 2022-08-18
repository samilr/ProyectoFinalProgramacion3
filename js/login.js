function validar()
{
    var usuario = document.getElementById("usuario").value;
    var Contraseña = document.getElementById("pass").value;	

    if(usuario == "samil" && Contraseña == "1234")
    {
        alert("Bienvenido Samil");
        window.location.href = "../Administrador.html";
    }
    else
    {
        alert("Usuario o contraseña incorrecto");
    }
}
