import { Box, Card, Divider, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { averageLoja } from "../utils/index.js";

export default function StoreCard(props) {

    //set variables to use in the store card
    const [atendidosLoja, setAtendidosLoja] = useState(0);
    const [prazoLoja, setPrazoLoja] = useState(0);
    const [mediaDefault, setMediaDefault] = useState(0);
    const [mediaSpecial, setMediaSpecial] = useState(0);

    //Refresh values on the store cards dashboard
    function refreshFieldsValues() {

        let Loja = props.atualizarPedidos
        setAtendidosLoja(Loja.length)
        let prazoLoja = Loja.filter(Loja => { return Loja.pTempo < 3 && !(Loja.pPrazoEspecial) || Loja.pTempo < 5 && Loja.pPrazoEspecial });
        let totalPrazoLoja = prazoLoja.length

        setPrazoLoja(new Intl.NumberFormat('en-IN', { style: 'percent', maximumFractionDigits: '1', minimumFractionDigits: '1' }).format(totalPrazoLoja / atendidosLoja))
        setMediaDefault(averageLoja(Loja.filter(Loja => { return !(Loja.pPrazoEspecial) })).toFixed(2))
        setMediaSpecial(averageLoja(Loja.filter(Loja => { return (Loja.pPrazoEspecial) })).toFixed(2))
    }

    //function to refresh values
    useEffect(() => {
        if (props.atualizarPedidos.length > 0) refreshFieldsValues();
    }, [props.atualizarPedidos]);

    return (
        <Box className="ps-3" mt={1} sx={{ borderRadius: '10px', boxShadow: 3}} style={{ backgroundColor: 'white'}}>
            <div className="d-flex ps-1" style={{ justifyContent: "space-between" }}>
                <Box id="cardComALogo"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="5rem"
                    height="5rem"
                    mt={-3}
                    sx={{ borderRadius: '10px', boxShadow: 3}}
                    backgroundColor={props.backLogoColor}>
                    <img id="isIcon" className="" src={props.logo} alt="icone da empresa pesquisada" style={{ width: "80%", height: "auto" }} />
                </Box>
                <div className="me-0 pe-0" style={{ width: "60%" }}>
                    <h6 className="card-text d-flex justify-content-end align-items-center me-3 pt-2">Orders shipped</h6>
                    <h4 className="card-text d-flex justify-content-end align-items-center me-3 pt-2" style={{ fontWeight: "bold" }} >{atendidosLoja}</h4>
                </div>
            </div>
            <Divider />
            <div className="card-body">
                <div className="d-flex">
                    <small className="text-muted mt-2" style={{ fontWeight: "bold" }}>{prazoLoja}</small>
                    <small className="text-muted mt-2 ms-1">on time</small>
                </div>
                <div>
                    {props.backLogoColor != "#303030" &&
                        <div className="d-flex">
                            <small className="text-muted" style={{ fontWeight: "bold" }} >{mediaDefault}</small>
                            <small className="text-muted ms-1">days average to ship</small>
                        </div>
                    }
                    {props.backLogoColor === "#303030" &&
                        <div className="d-flex">
                            <small className="text-muted" style={{ fontWeight: "bold" }} >{mediaDefault}</small>
                            <small className="text-muted ms-1">dias em média e </small>
                            <small className="text-muted ms-1" style={{ fontWeight: "bold" }} >{mediaSpecial}</small>
                            <small className="text-muted ms-1">para personalização</small>
                        </div>
                    }
                </div>
            </div>
        </Box>
    )
}