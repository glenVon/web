alert("  BENBENUTTY  ");

// Obtener elementos del DOM
const popup = document.getElementById('miPopup');
const botonAbrir = document.getElementById('abrirPopup');
const botonCerrar = document.querySelector('.cerrarPopup');

// Función para abrir el popup
function abrirPopup() {
    popup.style.display = 'flex'; // Cambia a 'flex' para centrar con el CSS
}

// Función para cerrar el popup
function cerrarPopup() {
    popup.style.display = 'none';
}

// Event listeners
botonAbrir.addEventListener('click', abrirPopup);
botonCerrar.addEventListener('click', cerrarPopup);

// Cerrar popup al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target === popup) { // Si el clic fue en el overlay
        cerrarPopup();
    }
});


function submit() {
    alert("  EXELENT  ");
}

// Validación del formulario
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('miFormulario');
    
    // Expresiones regulares para validación
    const regex = {
        nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    // Función para validar RUT chileno
    function validarRUT(rut) {
        // Eliminar puntos y guión, y convertir a mayúsculas
        rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        
        if (rut.length < 2) return false;
        
        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1);
        
        // Validar que el cuerpo sea numérico
        if (!/^\d+$/.test(cuerpo)) return false;
        
        // Calcular dígito verificador
        let suma = 0;
        let multiplo = 2;
        
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        
        const dvEsperado = 11 - (suma % 11);
        let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        
        return dvCalculado === dv;
    }

    // Función para mostrar errores
    function mostrarError(campo, mensaje) {
        const errorElement = document.getElementById(`error${campo}`);
        const inputElement = document.getElementById(campo.toLowerCase());
        
        errorElement.textContent = mensaje;
        inputElement.classList.add('error-input');
        inputElement.classList.remove('success-input');
    }

    // Función para limpiar errores
    function limpiarError(campo) {
        const errorElement = document.getElementById(`error${campo}`);
        const inputElement = document.getElementById(campo.toLowerCase());
        
        errorElement.textContent = '';
        inputElement.classList.remove('error-input');
        inputElement.classList.add('success-input');
    }

    // Validaciones individuales
    function validarNombre() {
        const nombre = document.getElementById('nombre').value.trim();
        
        if (!nombre) {
            mostrarError('Nombre', 'El nombre es obligatorio');
            return false;
        }
        
        if (!regex.nombre.test(nombre)) {
            mostrarError('Nombre', 'El nombre debe tener entre 2 y 50 caracteres y solo letras');
            return false;
        }
        
        limpiarError('Nombre');
        return true;
    }

    function validarRUTInput() {
        const rut = document.getElementById('rut').value.trim();
        
        if (!rut) {
            mostrarError('Rut', 'El RUT es obligatorio');
            return false;
        }
        
        if (!validarRUT(rut)) {
            mostrarError('Rut', 'El RUT no es válido');
            return false;
        }
        
        limpiarError('Rut');
        return true;
    }

    function validarEmail() {
        const email = document.getElementById('email').value.trim();
        
        if (!email) {
            mostrarError('Email', 'El email es obligatorio');
            return false;
        }
        
        if (!regex.email.test(email)) {
            mostrarError('Email', 'El formato del email no es válido');
            return false;
        }
        
        limpiarError('Email');
        return true;
    }

    function validarPassword() {
        const password = document.getElementById('password').value;
        
        if (!password) {
            mostrarError('Password', 'La contraseña es obligatoria');
            return false;
        }
        
        if (!regex.password.test(password)) {
            mostrarError('Password', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
            return false;
        }
        
        limpiarError('Password');
        return true;
    }

    function validarConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!confirmPassword) {
            mostrarError('ConfirmPassword', 'Debes confirmar la contraseña');
            return false;
        }
        
        if (password !== confirmPassword) {
            mostrarError('ConfirmPassword', 'Las contraseñas no coinciden');
            return false;
        }
        
        limpiarError('ConfirmPassword');
        return true;
    }

    // Event listeners para validación en tiempo real
    document.getElementById('nombre').addEventListener('blur', validarNombre);
    document.getElementById('rut').addEventListener('blur', validarRUTInput);
    document.getElementById('email').addEventListener('blur', validarEmail);
    document.getElementById('password').addEventListener('blur', validarPassword);
    document.getElementById('confirmPassword').addEventListener('blur', validarConfirmPassword);

    // Event listener para el envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ejecutar todas las validaciones
        const esValido = [
            validarNombre(),
            validarRUTInput(),
            validarEmail(),
            validarPassword(),
            validarConfirmPassword()
        ].every(result => result === true);
        
        if (esValido) {
            // Aquí puedes enviar el formulario o procesar los datos
            alert('¡Formulario enviado correctamente!');
            formulario.reset();
            
            // Limpiar todas las clases de éxito
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('success-input');
            });
        } else {
            alert('Por favor, corrige los errores en el formulario');
        }
    });

    // Limpiar errores al escribir
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            const campo = this.id.charAt(0).toUpperCase() + this.id.slice(1);
            const errorElement = document.getElementById(`error${campo}`);
            
            if (errorElement) {
                errorElement.textContent = '';
                this.classList.remove('error-input');
            }
        });
    });
});