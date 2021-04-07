export default function validarCrearProducto(valores){

    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = "El Nombre es obligatorio";
    }

    // validar empresa
    if (!valores.empresa){
        errores.empresa = "Nombre de empresa es obligatorio";
    }

    // validar la url
    if (!valores.url){
        errores.url = 'La URL del producto es obligatoria';
    }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ){
        errores.url = "URL mal formateada o no válida";
    }

    // validar descripción    
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripción de tu próducto";
    }


    return errores;
}