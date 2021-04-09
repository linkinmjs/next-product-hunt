import React, { useEffect, useState, useContext } from 'react';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ContenedorProducto = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

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

    if (Object.keys(producto).length === 0) return 'Cargando...';

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos } = producto;

    return (
        <Layout>

            {error && <Error404 />}

            <div className="contenedor">
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >{nombre}</h1>

                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })}</p>

                        <img src={urlimagen} />

                        <p>{descripcion}</p>

                        <h2>Agrega tu comentario</h2>
                        <form>
                            <Campo>
                                <input
                                    type="text"
                                    name="mensaje"
                                />
                            </Campo>
                            <InputSubmit
                                type="submit"
                                value="Agregar comentario"
                            />
                        </form>

                        <h2 css={css`
                            margin: 2rem 0;
                        `}>Comentarios</h2>
                        {comentarios.map(comentario => (
                            <li>
                                <p>{comentario.nombre}</p>
                                <p>Escrito por: {comentario.usuarioNombre}</p>
                            </li>
                        ))}
                    </div>

                    <aside>
                        <Boton
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visitar URL</Boton>

                        <div
                            css={css`
                                margin-top: 5rem;
                            `}
                        >
                            <p css={css`
                                text-align:center;
                            `}>{votos} Votos</p>
                        </div>

                        <Boton>Votar</Boton>
                    </aside>
                </ContenedorProducto>
            </div>
        </Layout>
    );
}

export default Producto;