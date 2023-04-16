import React, { useState, useEffect } from "react";
import * as DashboardService from "../../services/dashboard.service";
import AverageChart from './charts/AverageChart'
import InfoMonthChart from "./charts/InfoMonthChart";
import InfoStats from "./charts/InfoStats";
import WorldMapChart from "./charts/WorldMapChart";

export default function ChartFob() {
    const [dataFob, setDataFob] = useState([]);
    const [dataPerMonth, setDataPerMonth] = useState([])
    const [dataStats, setDataStats] = useState([])
    const [dataContinents, setDataContinents] = useState([])
    const [dataCountries, setDataCountries] = useState([])


    useEffect(() => {
        DashboardService.getFobData().then((data) => {
            setDataFob(data);
        });

        DashboardService.getInfoPerMonth().then((data) => {
            setDataPerMonth(data);
        });

        DashboardService.getStats().then((data) => {
            setDataStats(data);
        });

        DashboardService.getContinents().then((data) => {
            setDataContinents(data);
        });

        DashboardService.getCountries().then((data) => {
            setDataCountries(data);
        });




    }, [setDataFob, setDataPerMonth, setDataStats, setDataContinents]);




    return (
        <section className="chartFOB container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <AverageChart items={dataFob} />
                    <InfoMonthChart items={dataPerMonth} />
                    <InfoStats items={dataStats} />
                    <WorldMapChart itemsContinents={dataContinents} itemsCountries={dataCountries} />
                </div>

            </div>
        </section>

    )
}
