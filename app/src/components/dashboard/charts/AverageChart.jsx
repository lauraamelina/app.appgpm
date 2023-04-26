import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ImgProducts from "./ImgProducts";
import CircularProgress from "@mui/material/CircularProgress";

export default function AverageChart({ items, loading }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const getIntroOfPage = (label) => {
    switch (label) {
      case "1":
        return "Enero";
      case "2":
        return "Febrero";
      case "3":
        return "Marzo";
      case "4":
        return "Abril";
      case "5":
        return "Mayo";
      case "6":
        return "Junio";
      case "7":
        return "Julio";
      case "8":
        return "Agosto";
      case "9":
        return "Septiembre";
      case "10":
        return "Octubre";
      case "11":
        return "Noviembre";
      case "12":
        return "Diciembre";
      default:
        return "";
    }
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
        let promedios = [];
        for (
          let j = 0;
          j < Object.keys(items?.promedio[i].promedios_venta).length;
          j++
        ) {
          promedios = [
            ...promedios,
            {
              name: items?.promedio[i].promedios_venta[j].month,
              uv: items?.promedio[i].promedios_venta[j].price,
            },
          ];
        }

        const existingProduct = data.find(
          (product) => product.id === items?.promedio[i].id
        );
        if (!existingProduct) {
          setData((data) => [
            ...data,
            {
              nombre: items?.promedio[i].nombre,
              id: items?.promedio[i].id,
              promedios: promedios,
              venta: items?.promedio[i].promedio_venta_actual?.price,
            },
          ]);
        }
      }
    }
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    setSearch(data?.map((product) => product?.nombre)[0]);
    setFiltered(data);
  }, [data]);

  useEffect(() => {
    if (search?.length > 0) {
      const filtered = data.filter((product) => product.nombre === search);
      setFiltered(filtered);
    } else {
      setFiltered(data);
    }
  }, [search, data]);


  return (
    <section className="averageChart">
      <div className="header">
        <h2>Precio Promedio (FOB) </h2>
        <select className="form-control" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)}>
          <option value="">Selecciona un producto</option>
          {data?.map((product, index) => {
            return (
              <option key={index} value={product.nombre}>
                {product.nombre}
              </option>
            );
          })}
        </select>
      </div>

      {loading && (
        <div className="text-center">
          <CircularProgress />
        </div>
      )}

      {!loading &&
        filtered.map((item, index) => (
          <div key={index}>
            <div>
              <h3>{item.nombre}</h3>
              <ImgProducts id={item.id} />
              <p>{item.venta}</p>
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
              <Tooltip content={<CustomTooltip />} />

              <Area type="monotone" dataKey="uv" fill="#28a745" stroke="#28a745" />
            </AreaChart>
          </div>
        ))}
    </section>
  );
}
