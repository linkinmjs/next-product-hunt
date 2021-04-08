import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Producto = () => {
    
    // Routing para obtener el id actual
    const router = useRouter();
    const { query: {id} } = router;

    useEffect(()=>{
        if(id){
            console.log('ya existe un id', id);
        }
    }, [id])

    return (
        <h1>desde {id}</h1>
    );
}

export default Producto;