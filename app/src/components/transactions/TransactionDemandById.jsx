import React from 'react'
import { Link } from 'react-router-dom';

export default function TransactionDemandById({ transaction }) {
    function formatedDate(date) {
        const dateFormated = new Date(date);
        const day = dateFormated.getDate();
        const month = dateFormated.getMonth() + 1;
        const year = dateFormated.getFullYear();
        return `${day}/${month}/${year}`
    }

    function getTypes() {
        let types = [];
        if (transaction?.demand?.tipo1) {
            types.push(transaction?.demand?.tipo1)
        }
        if (transaction?.demand?.tipo2) {
            types.push(transaction?.demand?.tipo2)
        }
        if (transaction?.demand?.tipo3) {
            types.push(transaction?.demand?.tipo3)
        }
        return types.join(', ')
    }

    return (
        <section className='transactionId container'>
            <div className="row">
                <div className="col-md-6 comprador">
                    <section>
                        <h2>Comprador</h2>
                        <img src={`https://api.appgpm.com/files/img/${transaction?.buyer?.avatar}`} alt={transaction?.buyer?.name} />
                        <ul>
                            {transaction?.buyer?.name &&
                                <li><strong>Nombre</strong> <Link to={`/dashboard/users/profile/${transaction?.buyer?.id}`}>{transaction?.buyer?.name}</Link></li>}
                            {transaction?.buyer?.empresa &&
                                <li><strong>Empresa</strong>  {transaction?.buyer?.empresa}</li>}
                            {transaction?.buyer?.nit &&
                                <li><strong>N.I.T</strong>  {transaction?.buyer?.nit}</li>}
                            {transaction?.buyer?.email &&
                                <li><strong>E-mail</strong>  {transaction?.buyer?.email}</li>}
                            {transaction?.buyer?.telefono &&
                                <li><strong>Teléfono</strong>  {transaction?.buyer?.telefono}</li>}
                            {transaction?.buyer?.celular &&
                                <li><strong>Celular</strong>  {transaction?.buyer?.celular}</li>}
                            {transaction?.buyer?.ciudad &&
                                <li><strong>Ciudad</strong>  {transaction?.buyer?.ciudad}</li>}
                        </ul>
                    </section>
                </div>

                <div className="col-md-6 vendedor">
                    <section>
                        <h2>Vendedor</h2>
                        <img src={`https://api.appgpm.com/files/img/${transaction?.seller?.avatar}`} alt={transaction?.seller?.name} />
                        <ul>
                            {transaction?.seller?.name &&
                                <li><strong>Nombre</strong>  <Link to={`/dashboard/users/profile/${transaction?.seller?.id}`}>{transaction?.seller?.name}</Link> </li>}
                            {transaction?.seller?.empresa &&
                                <li><strong>Empresa</strong>  {transaction?.seller?.empresa}</li>}
                            {transaction?.seller?.nit &&
                                <li><strong>N.I.T</strong>  {transaction?.seller?.nit}</li>}
                            {transaction?.seller?.email &&
                                <li><strong>E-mail</strong>  {transaction?.seller?.email}</li>}
                            {transaction?.seller?.telefono &&
                                <li><strong>Teléfono</strong>  {transaction?.seller?.telefono}</li>}
                            {transaction?.seller?.celular &&
                                <li><strong>Celular</strong>  {transaction?.seller?.celular}</li>}
                            {transaction?.seller?.ciudad &&
                                <li><strong>Ciudad</strong>  {transaction?.seller?.ciudad}</li>}
                        </ul>
                    </section>
                </div>

                <div className="col-md-6 producto">
                    <section>
                        <h2>Producto</h2>
                        <ul>
                            <li><strong>Nombre: </strong> {transaction?.nombre_producto?.nombre}</li>
                            <li><strong>Tipo: </strong> {getTypes()} </li>
                            {transaction?.demand?.ciudad && 
                                <li><strong>Ciudad: </strong> {transaction?.demand?.ciudad} </li>}
                            {transaction?.demand?.plazo_carga && 
                                <li><strong>Plazo de carga: </strong>{transaction?.demand?.plazo_carga} </li>}
                        </ul>
                    </section>
                </div>

                <div className="col-md-6 transaccion">
                    <section>
                        <h2>Transacción</h2>
                        <ul>
                            <li><strong>ID: </strong> {transaction?.id} </li>
                            <li><strong>Fecha: </strong> {formatedDate(transaction?.created_at)} </li>
                            <li><strong>Estado: </strong> {transaction?.estado} </li>
                            <li><strong>Volumen: </strong> {transaction?.volumen} </li>
                            <li><strong>Peso: </strong> {transaction?.peso} </li>
                            <li><strong>Precio: </strong> {transaction?.demand?.precio} </li>
                            <li><strong>Valor Total: </strong> {transaction?.valor_total} </li>
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    )
}
