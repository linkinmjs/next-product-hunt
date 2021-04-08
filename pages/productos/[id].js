import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase';

const Producto = () => {

    // state del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;
    //console.log(id);

    // context de firebase
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data());
                } else {
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id]);



    return (
        <Layout>
            {error && <Error404 />}
        </Layout>
    );
}

export default Producto;