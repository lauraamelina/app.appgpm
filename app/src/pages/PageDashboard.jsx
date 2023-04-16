import React from "react";
import ChartFob from "../components/dashboard/ChartFob";
import WorldMapChart from "../components/dashboard/charts/WorldMapChart";


export default function PageDashboard() {
    return (
        <main className="container">
            <h1>Inicio</h1>
            <ChartFob/>
            <WorldMapChart/>

        </main>
    )
}