proj4.defs("EPSG:25831","+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
proj4.defs("EPSG:23031","+proj=utm +zone=31 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs +type=crs");
proj4.defs("EPSG:25829","+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");


const btnTransformar = document.querySelector(".btn-tranformar");

btnTransformar.addEventListener("click", (evt) => {
    console.log("Transformar coordenadas");
    const srs_origen = document.getElementById("origen").value;
    const srs_destino = document.getElementById("destino").value;
    let latitud = document.getElementById("lat").value; //CAMBIAR DE CONSTANTES A VAR PARA QUE SE PUEDA CAMBIAR EN EL IF EN CASO DE QUE INTRODUCIESEMOS LAS COORDS CON PUNTO Y COMA???
    let longitud = document.getElementById("lng").value;


    if (srs_origen === srs_destino) {                                   //MENSAJE DE ERROR SI LOS SRS SON IGUALES
        alert("ERROR. Los sistemas de referencia no pueden ser iguales");
    } else {                                                             //ELSE EN CASO QUE LOS SRS SEAN DIFERENTES Y LA CONVERSIÓN SE PUEDA EFECTUAR 
        
        var valor = document.getElementById("coords").value; // obtener el valor del cuadro de texto grande

        if (valor !== "") { // SI EL VALOR DENTRO DEL CUADRO GRANDE NO ESTÁ VACÍO (SE HA INTRODUCIDO ALGO) SE PROCEDE A VERIFICAR SU CONTENIDO

            var patron = /^-?\d+(\.\d+)?;-?\d+(\.\d+)?$/; // patrón para validar que son dos números (floats, integers o negativos) separados por punto y coma
            var esValido = patron.test(valor); // comprobar si el valor cumple el patrón



            // EN CASO DE QUE LA VALIDACIÓN DEL CUADRO DE TEXTO DEMUESTRE QUE SON NÚMEROS APTOS PARA EFECTUAR LA CONVERSIÓN, SE SOBREESCRIBIRÁ LA LATITUD Y LONGITUD POR LA DEL CUADRO GRANDE

            if (esValido) {
                var numeros = valor.split(";"); // dividir el valor en dos números separados por punto y coma
                latitud = parseFloat(numeros[0]); // convertir el primer número a FLOAT y sobreescribir la variable latitud
                longitud = parseFloat(numeros[1]); // convertir el segundo número a FLOAT y sobreescribir la variable longitud              
                

            // SI LA VALIDACIÓN SALIESE COMO FALSE, ENTONCES SE EJECUTARÍA UNA ALERTA DE ERROR

            } else {
                alert("ERROR. No es una entrada válida");
            }

        }
        
        // FINALMENTE SE LLEVA ACABO LA CONVERSIÓN CON LAS COORDS DE LOS CUADROS PEQUEÑOS O LAS DEL CUADRO GRANDE EN CASO DE QUE SE HAYAN SOBREESCRITO
        // PRIMERO SE VERIFICA SI LATITUD Y LONGITUD TIENEN CONTENIDO. SI ESTUVIESEN VACÍOS SALDRÍA UN MENSAJE DE ERROR INDICÁNDOLO

        if (latitud !== "" && longitud !== "") {

        const coordTransformada = transformarCoordenadas(latitud, longitud, srs_origen, srs_destino);
        document.getElementById("respuesta").innerHTML = coordTransformada;         
    
    
        } else {

            alert("ERROR. Existen coordenadas vacías")
        }


    }
});

const transformarCoordenadas = (lat, lon, epsg_in, epsg_out) => {

    const coordTransformada = proj4(epsg_in, epsg_out, [parseFloat(lon), parseFloat(lat)]);

    return `${coordTransformada[1]}<br> ${coordTransformada[0]}`;


}