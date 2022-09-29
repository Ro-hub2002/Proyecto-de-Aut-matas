let arrayGuardar = [];
// Creando variable con el ID del formulario de HTML.
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
	e.preventDefault();


// 	Variables que contienen los valores de cada input del formulario.
nombre = document.getElementById('nombre').value;
codigo = document.getElementById('codigo').value;
fecha = document.getElementById('fecha').value;
direccion = document.getElementById('direccion').value;
telefono_fijo = document.getElementById('telefono_fijo').value;
telefono = document.getElementById('telefono').value;
email = document.getElementById('email').value;


// Expresiones regulares para validar el formulario.
expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
expRegCodigo = /^[1-9]{1}[0-9]{7}$/; // / 7 digitos numericos y que no empiece por 0
expRegFecha = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/;
expRegDireccion = /^[a-zA-z0-9-#\s]$/;
expRegTelefono_fijo = /^[0-9]{7}$/; // Que contenga 7 números
expRegTelefono = /^[3][0-9]{9}$/; // Que comience por 3 y que contenga 10 números
expRegEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;


// Validaciones --- Confimar si todos los campos cumplen con las expresiones regulares.
// Si la expresión es diferente de True, que retorne false y no se pueda enviar el formulario.
if(!expRegNombre.test(nombre)){
	swal({
		title: "Error: Ingrese un nombre valido",
		icon: "error"
	  });
	return false;
}

else if(!expRegCodigo.test(codigo)){
	swal({
		title: "Error: El código tiene que tener 8 digitos y que no empiece por 0",
		icon: "error"
	  });
	return false;
}

else if(!expRegFecha.test(fecha)){
	swal({
		title: "Error: Ingrese una fecha valida",
		icon: "error"
	  });
	return false;
}

else if(!expRegDireccion.test(direccion)){
	swal({
		title: "Error: Ingrese una dirección valida",
		icon: "error"
	  });
	return false;
}

else if(!expRegTelefono_fijo.test(telefono_fijo)){
	swal({
		title: "Error: El teléfono fijo solo se permite de 7 dígitos",
		icon: "error"
	  });
	return false;
}

else if(!expRegTelefono.test(telefono)){
	swal({
		title: "Error: El teléfono celular debe comenzar con el número 3 y tiene que contener 10 digitos",
		icon: "error"
	  });
	return false;
}

else if(!expRegEmail.test(email)){
	swal({
		title: "Error: Ingrese un email valido",
		icon: "error"
	  });
	return false;
}
else{
	// Si todos los campos cumplen con las expresiones regulares, el formulario se enviara inmediatamente y deja los campos vacios.
	swal({
		title: "¡El registro del estudiante fue exitoso!",
		icon: "success"
	  });

	
	let trasladarDatos = new FormData(formulario);
	let trasladarTablaRef = document.getElementById("tabla");
	let trasladarfilas = trasladarTablaRef.insertRow(-1);

	let nuevaCeldaref = trasladarfilas.insertCell(0);
	nuevaCeldaref.textContent = trasladarDatos.get("nombre");

	nuevaCeldaref = trasladarfilas.insertCell(1);
	nuevaCeldaref.textContent = trasladarDatos.get("codigo");

	nuevaCeldaref = trasladarfilas.insertCell(2);
	nuevaCeldaref.textContent = trasladarDatos.get("fecha");

	nuevaCeldaref = trasladarfilas.insertCell(3);
	nuevaCeldaref.textContent = trasladarDatos.get("direccion");

	nuevaCeldaref = trasladarfilas.insertCell(4);
	nuevaCeldaref.textContent = trasladarDatos.get("telefono_fijo");

	nuevaCeldaref = trasladarfilas.insertCell(5);
	nuevaCeldaref.textContent = trasladarDatos.get("telefono");

	nuevaCeldaref = trasladarfilas.insertCell(6);
	nuevaCeldaref.textContent = trasladarDatos.get("email");
    arrayGuardar.push({
		nombre,
		codigo,
		fecha,
		direccion,
		telefono,
		telefonoFijo: telefono_fijo,
		telefono,
		email
	});
	console.log(arrayGuardar);

	formulario.reset();

	
}

});

