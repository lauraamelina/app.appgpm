import React from "react";
import { useEffect, useState } from "react";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip} from "recharts";
import ImgProducts from "./ImgProducts";

export default function AverageChart({items}) {
  const [data, setData] = useState([]);

  const getIntroOfPage = (label) => {
    if (label === "1") {
      return "Enero";
    }
    if (label === "2") {
      return "Febrero";
    }
    if (label === "3") {
      return "Marzo";
    }
    if (label === "4") {
      return "Abril";
    }
    if (label === "5") {
      return "Mayo";
    }
    if (label === "6") {
      return "Junio";
    }
    if (label === "7") {
      return "Julio";
    }
    if (label === "8") {
      return "Agosto";
    }
    if (label === "9") {
      return "Septiembre";
    }
    if (label === "10") {
      return "Octubre";
    }
    if (label === "11") {
      return "Noviembre";
    }
    if (label === "12") {
      return "Diciembre";
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="py-2 px-2">{`${getIntroOfPage(label)}: ${payload[0].value}`}</div>
        </div>
      );
    }
  
    return null;
  };

  useEffect(() => {
      if (Object.keys(items).length > 0) {
          for (let i = 0; i < Object.keys(items?.promedio).length; i++) {
            let promedios = []
            for (let j = 0; j < Object.keys(items?.promedio[i].promedios_venta).length; j++) {
              promedios = [
                ...promedios,
                {
                  name: items?.promedio[i].promedios_venta[j].month,
                  uv: items?.promedio[i].promedios_venta[j].price
                }
              ]
            }

            setData(data => [
              ...data, 
              {
                nombre: items?.promedio[i].nombre, 
                id: items?.promedio[i].id,
                promedios: promedios

              }
            ])
          }
      }
      //eslint-disable-next-line
  }, [items])


  return (
    <div className="averageChart">
      <h2>Precio Promedio (FOB) </h2>

      {data.map((item, index) => (
        <div key={index}>
          <div>
            <h3>{item.nombre}</h3>
            <ImgProducts id={item.id} />
          </div>
          <AreaChart
            width={750}
            height={100}
            data={item.promedios}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
            
          >
            
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />}  />

            <Area type="monotone" dataKey="uv" fill="#28a745" stroke="#28a745"/>
          </AreaChart>
        </div>
      ))}

    </div>

  );
}
