import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function PieOrder(props) {

    // Set deadline variables
    const [totalOrders, setTotalOrders] = useState(0);
    const [ordersOnTime, setOrdersOnTime] = useState(0);
    const [ordersOutOfTime, setOrdersOutOfTime] = useState(0);
    const [percentOrders, setPercentOrders] = useState(0);

    // Variables to use in pie chart
    const [startAngle, setStartAngle] = useState(493);
    const [blueColor, setBlueColor] = useState(55);
    const [redColor, setRedColor] = useState(0);

    //data pie variables
    const data = [
        ["Pac Man", "Percentage"],
        ["", redColor], // red
        ["", 20], // white
        ["", blueColor], // blue
    ];

    //options pie
    const options = {
        legend: "none",
        pieHole: 0.7,
        pieSliceText: "none",
        pieStartAngle: startAngle,
        tooltip: { trigger: "none" },
        slices: {
            0: { color: "#ED3833" },
            1: { color: "transparent" },
            2: { color: "#4EB9C4" },
        },
        chartArea: {
            left: 0,
            top: 9,
            right: 0,
            bottom: 0
        },
    };

    //Refresh values of the chart
    function refreshValues() {
        let ordersConfig = props.orders
        let total = ordersConfig.length
        setTotalOrders(total)
        let onTime = ordersConfig.filter(ordersConfig => { return ordersConfig.pTempoAtraso === 0 });
        let qtyOnTime = onTime.length
        setOrdersOnTime(qtyOnTime)
        setOrdersOutOfTime(total - qtyOnTime)
        let percentOnTime = qtyOnTime / total
        let percentOutTime = 1 - percentOnTime
        setPercentOrders(new Intl.NumberFormat('en-IN', { style: 'percent', maximumFractionDigits: '1', minimumFractionDigits: '1' }).format(percentOnTime))

        //chart: multiply to 55 to convert in chart scale and to 4,73 + 230 to discover the start angle (these are empirical values).
        setBlueColor(percentOnTime * 55)
        setRedColor(percentOutTime * 55)
        setStartAngle(((percentOnTime * 55) * 4.73) + 230)
    }

    useEffect(() => {
        refreshValues()
    }, [props.orders]);

    return (
        <Box style={{ backgroundColor: 'white'}} sx={{ borderRadius: '10px', boxShadow: 2}}>
            <Typography className="card-text pt-2" variant="h6" color="" align="center">{props.title}</Typography>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Chart
                        className="pt-2" 
                        chartType="PieChart"
                        data={data}
                        options={options}
                        allowHtml='true'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="card ps-4 pt-3 me-4 mb-4 mt-3" style={{ borderRadius: "15px", backgroundColor: "#F2F2F2" }}>
                        <p className="card-text" >Total - {totalOrders}</p>
                        <p className="card-text" >On time - {ordersOnTime}</p>
                        <p className="card-text" >Overdue - {ordersOutOfTime}</p>
                        <div id="total" className="d-flex" style={{ alignItems: 'center' }}>
                            <h3 style={{ fontFamily: "arial", fontWeight: "bold" }} >{percentOrders}</h3><p className="card-text ps-2 mb-2">{props.desc}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}