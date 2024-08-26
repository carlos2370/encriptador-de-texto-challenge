// Arrays de vocales y llaves
const vocales = ['a', 'e', 'i', 'o', 'u'];
const llaves = ['ai', 'enter', 'imes', 'ober', 'ufat'];

// Función para verificar si el texto contiene caracteres válidos
function esTextoValido(texto) {
    // Verifica si el texto contiene solo letras minúsculas sin tildes ni caracteres especiales
    return /^[a-zñ!.,:;\s]*$/.test(texto);
}

// Función para mostrar el mensaje de advertencia y limpiar el texto
function mostrarAdvertenciaYLimpiar() {
    const mensaje = document.querySelector('.mensaje__aviso');
    mensaje.classList.remove('hidden');
    
    // Limpia el área de texto
    document.getElementById('inputTexto').value = '';
    
    // Oculta el mensaje después de 5 segundos
    setTimeout(() => {
        mensaje.classList.add('hidden');
    }, 5000); // 10000 milisegundos = 10 segundos

    // Mostrar la imagen y ocultar el resto de los elementos
    document.getElementById('btnCopiar').classList.add('hidden');
    document.getElementById('outputTexto').classList.add('hidden');
    document.querySelector('.imagen').classList.remove('hidden');
}

// Función para encriptar
function reemplazarVocales(frase, vocales, llaves) {
    function reemplazar(match) {
        let index = vocales.indexOf(match);
        return llaves[index];
    }
    let regex = new RegExp(`[${vocales.join('')}]`, 'g');    
    return frase.replace(regex, reemplazar);
}

// Función para desencriptar
function reemplazarSecuencias(frase, llaves, vocales) {
    for (let i = 0; i < llaves.length; i++) {
        frase = frase.replace(new RegExp(llaves[i], 'gi'), vocales[i]);
    }
    return frase;
}

// Función que se ejecuta cuando se presiona el botón "Encriptar"
function encriptar() {
    let inputTexto = document.getElementById('inputTexto').value.trim();
    if (!esTextoValido(inputTexto)) {
        mostrarAdvertenciaYLimpiar();
        return;
    }

    let resultado = reemplazarVocales(inputTexto, vocales, llaves);
    document.getElementById('outputTexto').value = resultado.toLowerCase();
    document.querySelector('.mensaje__aviso').classList.add('hidden');
    document.getElementById('btnCopiar').classList.remove('hidden');
    document.getElementById('outputTexto').classList.remove('hidden');
    document.querySelector('.imagen').classList.add('hidden');
}

// Función que se ejecuta cuando se presiona el botón "Desencriptar"
function desencriptar() {
    let inputTexto = document.getElementById('inputTexto').value.trim();
    if (!esTextoValido(inputTexto)) {
        mostrarAdvertenciaYLimpiar();
        return;
    }

    let resultado = reemplazarSecuencias(inputTexto, llaves, vocales);
    document.getElementById('outputTexto').value = resultado.toLowerCase();
    document.querySelector('.mensaje__aviso').classList.add('hidden');
    document.getElementById('btnCopiar').classList.remove('hidden');
    document.getElementById('outputTexto').classList.remove('hidden');
    document.querySelector('.imagen').classList.add('hidden');
}

// Función para copiar el texto al portapapeles
function copiarTexto() {
    let texto = document.getElementById('outputTexto');
    texto.select();
    document.execCommand('copy');
}

// Asignar eventos a los botones
document.getElementById('btnEncriptar').addEventListener('click', encriptar);
document.getElementById('btnDesencriptar').addEventListener('click', desencriptar);
document.getElementById('btnCopiar').addEventListener('click', copiarTexto);
