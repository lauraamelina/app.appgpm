import React, { useState, useEffect } from "react";
import * as DashboardService from "../../services/dashboard.service";
import AverageChart from './charts/AverageChart'
import InfoMonthChart from "./charts/InfoMonthChart";
import InfoStats from "./charts/InfoStats";
import WorldMapChart from "./charts/WorldMapChart";
import Ads from "./ads/Ads";
import VerificationAccount from "./VerificationAccount";

export default function ChartFob() {
    const [dataFob, setDataFob] = useState([]);
    const [dataPerMonth, setDataPerMonth] = useState([])
    const [dataStats, setDataStats] = useState([])
    const [dataContinents, setDataContinents] = useState([])
    const [dataCountries, setDataCountries] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true);
        DashboardService.getFobData().then((data) => {
            setDataFob(data);
            setLoading(false);
        });

        DashboardService.getInfoPerMonth().then((data) => {
            setDataPerMonth(data);
            setLoading(false);
        });

        DashboardService.getStats().then((data) => {
            setDataStats(data);
            setLoading(false);
        });

        DashboardService.getContinents().then((data) => {
            setDataContinents(data);
            setLoading(false);
        });

        DashboardService.getCountries().then((data) => {
            setDataCountries(data);
            setLoading(false);
        });
    }, [setDataFob, setDataPerMonth, setDataStats, setDataContinents]);




    return (
        <section className="row">
            <div className="col-md-9">
                <VerificationAccount />
                <AverageChart items={dataFob} loading={loading} />
                <InfoMonthChart items={dataPerMonth} />
                <InfoStats items={dataStats} />
                <WorldMapChart itemsContinents={dataContinents} itemsCountries={dataCountries} />
            </div>

            <div className="col-md-3 ads">
                <Ads />
            </div>
        </section>
    )
}
