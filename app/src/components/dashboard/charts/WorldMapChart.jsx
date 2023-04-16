import React, { useEffect, useState } from 'react'
import WorldMap from "https://cdn.skypack.dev/react-world-map@2.3.0";
import Chart from 'react-google-charts'

function WorldMapChart({ itemsContinents, itemsCountries }) {
  const [selected, onSelect] = useState(null);
  const [dataContinents, setDataContinents] = useState([])
  const [dataCountries, setDataCountries] = useState([])


  useEffect(() => {
    if (itemsContinents !== []) {
      setDataContinents(itemsContinents?.data?.table);
    } else {
      setDataContinents([
        { name: "AMERICA-EUROPA", count: 0 },
        { name: "AMERICA-ASIA", count: 0 },
        { name: "AMERICA-AFRICA", count: 0 },
        { name: "EUROPA-ASIA", count: 0 },
        { name: "EUROPA-AFRICA", count: 0 },
        { name: "EUROPA-OCEANIA", count: 0 },
        { name: "ASIA-AFRICA", count: 0 },
        { name: "ASIA-OCEANIA", count: 0 },
        { name: "AFRICA-OCEANIA", count: 0 },
      ])
    }
  }, [itemsContinents])

  useEffect(() => {
    if (itemsCountries?.data !== undefined) {
      setDataCountries([
        ["País", "Productos", "Bids"],
        // recorre itemsCountries.data
        ...itemsCountries?.data?.map((item) => {
          return [item.iso, item.products, item.demands]
        })

      ])
    } else {
      setDataCountries([
        ["País", "Productos", "Bids"],
        ["", 0, 0]
      ])
    }
  }, [itemsCountries])

  useEffect(() => {
    if (itemsContinents !== []) {
      setDataContinents(itemsContinents?.data?.table);
    } else {
      setDataContinents([
        { name: "AMERICA-EUROPA", count: 0 },
        { name: "AMERICA-ASIA", count: 0 },
        { name: "AMERICA-AFRICA", count: 0 },
        { name: "EUROPA-ASIA", count: 0 },
        { name: "EUROPA-AFRICA", count: 0 },
        { name: "EUROPA-OCEANIA", count: 0 },
        { name: "ASIA-AFRICA", count: 0 },
        { name: "ASIA-OCEANIA", count: 0 },
        { name: "AFRICA-OCEANIA", count: 0 },
      ])
    }
  }, [itemsContinents])

  function tooltipSelected(selected) {
    let name = ""
    if (selected) {
      switch (selected) {
        case "sa":
          name = "AMERICA"
          break;
        case "na":
          name = "AMERICA"
          break;
        case "eu":
          name = "EUROPA"
          break;
        case "as":
          name = "ASIA"
          break;
        case "af":
          name = "AFRICA"
          break;
        case "oc":
          name = "OCEANIA"
          break;
        default:
          name = "null"
          break;
      }
    }

    if (dataContinents !== []) {
      let count = 0;
      dataContinents.forEach(item => {
        if (item.name.includes(name)) {
          count += item.count
        }
      })

      return `${name}: ${count} transacciones`
    }

  }

  return (
    <>
      <section className='world container'>
        <div className='header'>
          <h2>Transacciones</h2>
          <p>{selected !== null && tooltipSelected(selected)}</p>

        </div>
        <div className="row">
          <div className="col-md-8 col-12">
            <WorldMap
              selected={selected}
              onSelect={onSelect}

            />
          </div>
          <div className="col-md-4 col-12">
            <table>
              <thead>
                <tr>
                  <th>Relación</th>
                  <th>Transacciones</th>
                </tr>
              </thead>
              <tbody>
                {dataContinents?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>



        </div>
      </section>

      <section className='world container'>
        <div className='header'>
          <h2>Productos y Bids</h2>
        </div>
        <div className="row">
          <div className="col-md-8 col-12">
            <Chart
              chartEvents={[
                {
                  eventName: "select",
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) return;
                    //eslint-disable-next-line
                    const region = dataCountries[selection[0].row + 1];
                  },
                },
              ]}
              chartType="GeoChart"
              width="100%"
              height="400px"
              data={dataCountries}
              mapsApiKey='AIzaSyBeaSqOWjmm5Rx6ONLHF_gU-UxAOUMXqto'
              options={{
                colorAxis: { colors: ["#82B8D9", "#1F82BF"] },
                defaultColor: "#f5f5f5",
                legend: "none",
              }}
            />
          </div>
          <div className="col-md-4 col-12 countries">
            <table> 
              <thead>
                <tr>
                  <th>País</th>
                  <th>Productos</th>
                  <th>Bids</th>
                </tr>
              </thead>
              <tbody>
                {dataCountries?.map((item, index) => (
                  index > 0 && (
                    <tr key={index}>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>

          </div>



        </div>
      </section>
    </>

  );
}

export default WorldMapChart;