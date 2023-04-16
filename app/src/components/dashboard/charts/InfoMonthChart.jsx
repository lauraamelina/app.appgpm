import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";



export default function InfoMonthChart({ items }) {
    const [toneladas, setToneladas] = useState([]);
    const [usd, setUsd] = useState([]);
    const [operaciones, setOperaciones] = useState([]);

    useEffect(() => {
        if (Object.keys(items).length > 0) {
            setToneladas([
                {
                    name: 'Ene',
                    pv: items['grafica1'][0].data[0]
                },
                {
                    name: 'Feb',
                    pv: items['grafica1'][0].data[1]
                },
                {
                    name: 'Mar',
                    pv: items['grafica1'][0].data[2]
                },
                {
                    name: 'Abr',
                    pv: items['grafica1'][0].data[3]
                },
                {
                    name: 'May',
                    pv: items['grafica1'][0].data[4]
                },
                {
                    name: 'Jun',
                    pv: items['grafica1'][0].data[5]
                },
                {
                    name: 'Jul',
                    pv: items['grafica1'][0].data[6]
                },
                {
                    name: 'Ago',
                    pv: items['grafica1'][0].data[7]
                },
                {
                    name: 'Sep',
                    pv: items['grafica1'][0].data[8]
                },
                {
                    name: 'Oct',
                    pv: items['grafica1'][0].data[9]
                },
                {
                    name: 'Nov',
                    pv: items['grafica1'][0].data[10]
                },
                {
                    name: 'Dic',
                    pv: items['grafica1'][0].data[11]
                }


            ])

            setUsd([
                {
                    name: 'Ene',
                    pv: items['grafica2'][0].data[0]
                },
                {
                    name: 'Feb',
                    pv: items['grafica2'][0].data[1]
                },
                {
                    name: 'Mar',
                    pv: items['grafica2'][0].data[2]
                },
                {
                    name: 'Abr',
                    pv: items['grafica2'][0].data[3]
                },
                {
                    name: 'May',
                    pv: items['grafica2'][0].data[4]
                },
                {
                    name: 'Jun',
                    pv: items['grafica2'][0].data[5]
                },
                {
                    name: 'Jul',
                    pv: items['grafica2'][0].data[6]
                },
                {
                    name: 'Ago',
                    pv: items['grafica2'][0].data[7]
                },
                {
                    name: 'Sep',
                    pv: items['grafica2'][0].data[8]
                },
                {
                    name: 'Oct',
                    pv: items['grafica2'][0].data[9]
                },
                {
                    name: 'Nov',
                    pv: items['grafica2'][0].data[10]
                },
                {
                    name: 'Dic',
                    pv: items['grafica2'][0].data[11]
                }


            ])

            setOperaciones([
                {
                    name: 'Ene',
                    pv: items['grafica3'][0].data[0]
                },
                {
                    name: 'Feb',
                    pv: items['grafica3'][0].data[1]
                },
                {
                    name: 'Mar',
                    pv: items['grafica3'][0].data[2]
                },
                {
                    name: 'Abr',
                    pv: items['grafica3'][0].data[3]
                },
                {
                    name: 'May',
                    pv: items['grafica3'][0].data[4]
                },
                {
                    name: 'Jun',
                    pv: items['grafica3'][0].data[5]
                },
                {
                    name: 'Jul',
                    pv: items['grafica3'][0].data[6]
                },
                {
                    name: 'Ago',
                    pv: items['grafica3'][0].data[7]
                },
                {
                    name: 'Sep',
                    pv: items['grafica3'][0].data[8]
                },
                {
                    name: 'Oct',
                    pv: items['grafica3'][0].data[9]
                },
                {
                    name: 'Nov',
                    pv: items['grafica3'][0].data[10]
                },
                {
                    name: 'Dic',
                    pv: items['grafica3'][0].data[11]
                }


            ])
        }
        //eslint-disable-next-line
    }, [items])


    return (
        <section className="container infoMonthChart">
            <div className="row">
                <div className="col-md-3 col-12 ton">
                    <h3 className="h5">Toneladas por mes</h3>
                    <BarChart
                        width={230}
                        height={230}
                        data={toneladas}
                        margin={{
                            top: 5,
                            bottom: 5,
                            left: -10,
                        }}

                    >
                        <CartesianGrid strokeDasharray="1 1" stroke="white" />

                        <XAxis dataKey="name" fontSize={".6em"} stroke='white' />
                        <YAxis fontSize={".7em"} stroke='white' />
                        <Tooltip content={"name"} />
                        <Bar dataKey="pv" barSize={10} fill="white" />
                    </BarChart>
                </div>
                <div className="col-md-3 col-12 usd">
                    <h3 className="h5">Usd por mes</h3>
                    <BarChart
                        width={230}
                        height={230}
                        data={usd}
                        margin={{
                            top: 5,
                            bottom: 5,
                            left: -10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" stroke='white' />
                        <XAxis dataKey="name" fontSize={".6em"} stroke='white' />
                        <YAxis fontSize={".7em"} stroke='white' />
                        <Tooltip content={"name: pv"} fill='#6A6A6A' />
                        <Bar dataKey="pv" barSize={10} fill="white" />
                    </BarChart>
                </div>
                <div className="col-md-3 col-12 ope">
                    <h3 className="h5">Operaciones por mes</h3>
                    <BarChart
                        width={230}
                        height={230}
                        data={operaciones}
                        margin={{
                            top: 5,
                            bottom: 5,
                            left: -10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" stroke='white' />
                        <XAxis dataKey="name" fontSize={".6em"} stroke='white' />
                        <YAxis fontSize={".7em"} stroke='white' />
                        <Tooltip content={"name"} />
                        <Bar dataKey="pv" barSize={10} fill="white" />
                    </BarChart>
                </div>
            </div>
        </section>
    );
}