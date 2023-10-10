import React from "react";
import Rating from "@mui/material/Rating";
import * as authService from "../../services/auth.service";

export default function CalificationByUser({ califications }) {
    const userId = authService.getUserId();

    function formattedDate(date) {
        const dateObj = new Date(date);
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        return day + "/" + month + "/" + year;
    }

    if (!califications || califications.length === 0) {
        return (
            <div className="calification-card">
                <div className="user-info">
                    <h4>No tienes calificaciones</h4>
                </div>
            </div>
        );
    }

    const ownCalifications = [];
    const othersCalifications = [];

    califications.forEach((calification) => {
        if (
            (calification.estrellas_comprador || calification.estrellas_vendedor) &&
            userId === calification.comprador_id
        ) {
            ownCalifications.push(calification);
        } else if (
            (calification.estrellas_comprador || calification.estrellas_vendedor) &&
            userId !== calification.comprador_id
        ) {
            othersCalifications.push(calification);
        }
    });

    const calculateAverage = (calificationArray) => {
        if (calificationArray.length === 0) {
            return 0;
        }

        const total = calificationArray.reduce(
            (accumulator, calification) =>
                accumulator + calification.estrellas_comprador,
            0
        );

        return total / calificationArray.length;
    };

    const ownAverage = calculateAverage(ownCalifications);
    const othersAverage = calculateAverage(othersCalifications);

    return (
        <div className="calificationByUser row">
            <div className="col-md-6">
                <h2>Calificaciones del usuario</h2>
                {ownCalifications.length > 0 ? (
                    <span className="d-flex justify-content-center">
                        Promedio:  <Rating name="read-only" value={ownAverage.toFixed(2)} readOnly />
                    </span>
                )
                    :
                    <p className="mt-5">No tiene calificaciones</p>
                }
                {ownCalifications.map((calification) => (
                    <div key={calification.id} className="calification-card">
                        <span>Fecha de calificación: {formattedDate(calification.created_at)}</span>
                        {userId === calification.comprador_id ? (
                            <>
                                <h4>Comprador</h4>
                                <Rating name="read-only" value={calification.estrellas_comprador} readOnly />
                                <p>{calification.comentario_comprador}</p>
                            </>
                        ) : (
                            <>
                                <h4>Vendedor</h4>
                                <Rating name="read-only" value={calification.estrellas_vendedor} readOnly />
                                <p>{calification.comentario_vendedor}</p>
                            </>
                        )}
                    </div>
                ))}

            </div>
            <div className="col-md-6">
                <h2>Calificaciones de terceros</h2>
                {othersCalifications.length > 0 ? (
                    <span className="d-flex justify-content-center">
                        Promedio:  <Rating name="read-only" value={othersAverage.toFixed(2)} readOnly />
                    </span>
                ) :
                    <p className="mt-5">No tiene calificaciones de terceros</p>
                }
                {othersCalifications.map((calification) => (
                    <div key={calification.id} className="calification-card">
                        <span>Fecha de calificación: {formattedDate(calification.created_at)}</span>
                        {userId === calification.comprador_id ? (
                            <>
                                <h4>Comprador</h4>
                                <Rating name="read-only" value={calification.estrellas_comprador} readOnly />
                                <p>{calification.comentario_comprador}</p>
                            </>
                        ) : (
                            <>
                                <h4>Vendedor</h4>
                                <Rating name="read-only" value={calification.estrellas_vendedor} readOnly />
                                <p>{calification.comentario_vendedor}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
