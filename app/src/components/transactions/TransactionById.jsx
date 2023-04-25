import React from 'react'
import { Link } from 'react-router-dom';

export default function TransactionById({ transaction }) {
    function formatedDate(date) {
        const dateFormated = new Date(date);
        const day = dateFormated.getDate();
        const month = dateFormated.getMonth() + 1;
        const year = dateFormated.getFullYear();
        return `${day}/${month}/${year}`
    }

    function getTypes() {
        let types = [];
        if (transaction?.product?.tipo1) {
            types.push(transaction?.product?.tipo1)
        }
        if (transaction?.product?.tipo2) {
            types.push(transaction?.product?.tipo2)
        }
        if (transaction?.product?.tipo3) {
            types.push(transaction?.product?.tipo3)
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
                            {transaction?.product?.dano_totales && 
                                <li><strong>Daños Totales: </strong>{transaction?.product?.dano_totales} </li>}
                            {transaction?.product?.blanqueados && 
                                <li><strong>Blanqueados: </strong> {transaction?.product?.blanqueados} </li>}
                            {transaction?.product?.granos_fuera_tipo && 
                                <li><strong>Fuera tipo: </strong> {transaction?.product?.granos_fuera_tipo} </li>}
                            {transaction?.product?.granos_partidos && 
                                <li><strong>Granos partidos: </strong> {transaction?.product?.granos_partidos} </li>}
                            {transaction?.product?.materias_extranos && 
                                <li><strong>Materiales extraños: </strong> {transaction?.product?.materias_extranos} </li>}
                            {transaction?.product?.ciudad && 
                                <li><strong>Ciudad: </strong> {transaction?.product?.ciudad} </li>}
                        </ul>
                    </section>
                </div>

                <div className="col-md-6 transaccion">
                    <section>
                        <h2>Transacción</h2>
                        <ul>
                            <li><strong>Fecha: </strong> {formatedDate(transaction?.created_at)} </li>
                            <li><strong>Estado: </strong> {transaction?.estado === 1 ? 'Activa' : 'Finalizada'} </li>
                            <li><strong>Volumen: </strong> {transaction?.volumen} {transaction?.peso}</li>
                            <li><strong>Incoterms: </strong> {transaction?.product?.incoterm?.nombre} </li>
                            <li><strong>Puerto: </strong> {transaction?.product?.puerto} </li>
                            <li><strong>Precio: </strong> {transaction?.product?.precio} </li>
                            <li><strong>Valor Total: </strong> <span className='fw-bolder text-danger'> {transaction?.valor_total}</span> </li>
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    )
}