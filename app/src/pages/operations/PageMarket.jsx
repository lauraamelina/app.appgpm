import React from "react";
import BtnAction from '../../components/btn/BtnAction'
import operations from '../../assets/img/operations.png'

export default function PageDashboard() {
    return (
        <main className="container">
            <h1>Market</h1>
            <section className="row market">
                <div className="col-md-6">
                    <h2 className="fw-700">¡Quiero comprar!</h2>
                    <p>Entra al market donde econtrarás miles de productos, filtra según tus necesidades y consigue el mejor producto para ti.</p>
                    <BtnAction buttonText="Ir a comprar" route="/dashboard/operations/buy"/>

                </div>
                <div className="col-md-6">
                    <h2 className="fw-700">¡Quiero vender!</h2>
                    <p>Encuentra aquí las demandas que otros usuarios están buscando, filtra según los productos que tengas disponibles y concreta tu venta.</p>
                    <BtnAction buttonText="Ir a vender" route="/dashboard/operations/bids"/>
                </div>
            </section>

            <section className="row market-publicar">
                <div className="col-md-4 col-12">
                    <h2>¡Publica tu producto!</h2>
                    <p>¿Tienes un producto para vender? <br /> ¿Qué estás esperando? Llega a miles de usuarios en   todo el mundo...
                    </p>
                    <BtnAction buttonText="Publicar producto" route="/dashboard/products/new"/>
                </div>
                <div className="col-md-4 img">
                    <img src={operations} alt="operations"/>
                </div>
                <div className="col-md-4 col-12">
                    <h2>¡Publica tu demanda!</h2>
                    <p>¿Necesitas algun producto? <br /> Crea una demanda elige las caracteristicas de lo que buscas y conéctate con miles de usuarios que te harán llegar sus productos...
                    </p>
                    <BtnAction buttonText="Publicar Bid" route="/dashboard/demands/new"/>
                </div>

            </section>

        </main>
    )
}