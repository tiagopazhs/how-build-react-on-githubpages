import search from "../assets/search.png";
import option from "../assets/option.png";
import landscape from "../assets/landscape.png";
import barCode from "../assets/barcode.png";
import { Chart } from "react-google-charts";
import { optionsTable, formattersTable } from "../constants/dashContants";
import React, { useState, useRef } from 'react';
import '../styles.css';
import NavBar from "../components/NavBar";
const url = "http://localhost:8501";
let date = new Date();
let day = ("00" + date.getDate()).slice(-2);
let month = ("00" + (date.getMonth() + 1)).slice(-2);
let year = date.getFullYear();
let hour = ("00" + date.getHours()).slice(-2);
let minute = ("00" + date.getMinutes()).slice(-2);
let second = ("00" + date.getSeconds()).slice(-2);
let currentData = `${day}/${month}/${year}`;
let currentTime = `${hour}:${minute}:${second}`;

function ThreeRopes() {

    const [dataTableOpen] = useState([["Pedido", "Produto", "Código de barras", "Número de série"], ["100001", "Ibanez TOD10 Electric Guitar - Classic", "7891000789456", "67464168464646"], ["100002", "Gibson Les Paul Standard '50s Electric Guitar - Tobacco Burst", "7891000789456", "D243534df3434"], ["100003", "Fender Gold Foil Telecaster Electric Guitar - White Blonde", "", ""], ["100004", "PRS Silver Sky Electric Guitar - Roxy Fingerboard", "", ""], ["100005", "Epiphone Limited Edition 1959 Electric Guitar - Aged Dark Burst", "", ""], ["100006", "Ernie Ball 7-String Electric Guitar - Majora Purple", "", ""], ["100007", "Gibson Les Paul Modern - Graphite Top", "", ""], ["100008", "Fender Special Edition Custom Telecaster FMT HH - Amber", "", ""], ["100009", "PRS SE Custom 24-08 Electric Guitar - Eriza Verde", "", ""]]);
    const [currentOrders, setCurrentOrders] = useState([]);

    // Requisição get
    async function getPedido(id) {
        const responseGet = await fetch(`${url}/serial`);
        const dadosPedido = await responseGet.json();

        setCurrentOrders(dadosPedido)
        return dadosPedido
    }


    // Set variables that will be used to comunicate with API
    const [registered, setRegistered] = useState('');
    const [methodReq, setMethodReq] = useState("POST");

    // Set variables that will be used in input fields
    const [codePrinter, setCodePrinter] = useState('');
    const [descOnePrinter, setDescOnePrinter] = useState('');
    const [descTwoPrinter, setDescTwoPrinter] = useState('');

    // Set variables that will be used in ref to move in fields
    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const thirdInput = useRef(null);

    //Set variable of barcode in stage
    const [inStage, setInStage] = useState(landscape);
    const [qtyLabel, setQtyLabel] = useState('0,00');
    const [firstHistoryLabel, setFirstHistoryLabel] = useState('100068');
    const [inStagePrinter, setInStagePrinter] = useState('notInStage');

    //Set variable of barcode in insert
    const [codeInInsert, setCodeInInsert] = useState('');
    const [descTopInInsert, setDescTopInInsert] = useState('');
    const [descBottomInInsert, setDescBottomInInsert] = useState('');

    // Move from input one to input two and call the preview bar
    const moveToSecondInput = (event) => {
        if (event.key === 'Enter') {
            // previewBar();
            secondInput.current.focus();
        }
    }

    // Move from input two to input three
    const moveToThirdInput = (event) => {
        if (event.key === 'Enter') {
            thirdInput.current.focus();
        }
    }

    // Call the stage of user data same in the button insert
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            stageOfValidation()
        }
    }

    // Change the preview img from landscape to a real barCode
    async function previewBar() {
        if (codePrinter === '') {
            setInStage(landscape);
            setQtyLabel('0,00');
            setFirstHistoryLabel('100068');
        } else {
            setInStage(barCode);
            setQtyLabel('3,00');
            setFirstHistoryLabel(codePrinter);
            getProduto();
        }
    };

    // Change the printer img from printer to a Stage of user data validation in screen.
    async function stageOfValidation() {
        if (setCodePrinter === '') {
            setInStagePrinter('notInStage');
        } else {
            setInStagePrinter('inStage');
            setCodeInInsert(codePrinter);
            setDescTopInInsert(descOnePrinter);
            setDescBottomInInsert(descTwoPrinter);
        }
    };

    // Get requisition and return data label printed before
    async function getProduto() {
        const responseGet = await fetch(`${url}/serial/${codePrinter}`);
        const labelData = await responseGet.json();

        if (labelData === null) {
            setRegistered('')
        }
        else {
            setRegistered('got')
            console.log(labelData)
            setDescOnePrinter(labelData.ean)
            setDescTwoPrinter(labelData.serial)
            setMethodReq("PUT")
        }
        return labelData
    }

    // Post requisition and call execute the printer procces in the backEnd
    async function postTrigger(url, type, data) {

        if (type === "POST") {
            return (
                //save data in the historic of label
                fetch(`http://localhost:8501/historic`, {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        "usuario": "defaultUser",
                        "data": currentData,
                        "horario": currentTime,
                        "quantidade": 3,
                        "campoCod": codePrinter,
                        "campoDesc1": descOnePrinter,
                        "campoDesc2": descTwoPrinter
                    })
                })
                    .then(res => {
                        if (res.ok) { console.log("HTTP request successful", data) }
                        else { console.log("HTTP request unsuccessful") }
                        return res
                    })
                    .then(res => res.json())
                    .then(data => data)
                    .catch(error => error),
                //edit data in procces label
                fetch(url, {
                    method: type,
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        if (res.ok) { console.log("HTTP request successful", data) }
                        else { console.log("HTTP request unsuccessful") }
                        return res
                    })
                    .then(res => res.json())
                    .then(data => data)
                    .catch(error => error)
            )
        }

        if (type === "PUT") {
            return (
                //save data in the historic of label
                fetch(`http://localhost:8501/historic`, {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        "usuario": "defaultUser",
                        "data": currentData,
                        "horario": currentTime,
                        "quantidade": 3,
                        "campoCod": codePrinter,
                        "campoDesc1": descOnePrinter,
                        "campoDesc2": descTwoPrinter
                    })
                })
                    .then(res => {
                        if (res.ok) { console.log("HTTP request successful", data) }
                        else { console.log("HTTP request unsuccessful") }
                        return res
                    })
                    .then(res => res.json())
                    .then(data => data)
                    .catch(error => error),
                //edit data in procces label
                fetch(`${url}/:${codePrinter}`, {
                    method: type,
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        if (res.ok) { console.log("HTTP request successful", data) }
                        else { console.log("HTTP request unsuccessful") }
                        return res
                    })
                    .then(res => res.json())
                    .then(data => data)
                    .catch(error => error)
            )
        }
    }

    // clean the input field's to reset the validation of data
    async function cleanFields() {
        setCodePrinter('');
        setDescOnePrinter('');
        setDescTwoPrinter('');
        setInStagePrinter('notInStage');
        setCodePrinter('');
        setInStage(landscape);
        setQtyLabel('0,00');
        setFirstHistoryLabel('100068');
        firstInput.current.focus();
        setMethodReq("POST");
    }

    return (
        <div className="printerPage">
            <NavBar />

            <div className="body">
                <div className="mainPrinter" style={{ boxShadow: '1px 1px 9px #CCCDCD', width: "100%" }}>

                    <div className="navBarPrinter" >
                        <h2 className="ps-5 pt-2" style={{ fontStyle: 'sora', width: "50%", color: '#f3f3f3' }} >Verificação com 3 bips</h2>
                        <div className="navBarActions" >
                            <input id="searchLabels" defaultValue={'Buscar no histórico de leitura'}></input>
                            <div className="divSearchIcon">
                                <img id="searchIcon" onClick={() => getPedido()} src={search} alt="icone pesquisar" style={{ backgroundColor: 'white' }} />
                            </div>

                            <img id="optionIcon" src={option} alt="icone de opções" />
                        </div>
                    </div>

                    <div className="midLane">
                        <div className="stageInput">
                            <div className="stageInputLeft" style={{ width: "100%" }}>
                                <div className="divInput" id="box1">
                                    <p>Número do pedido</p>
                                    <input className="inputTyped"
                                        id="input1"
                                        ref={firstInput} //referenciate a fiels for focus use
                                        value={codePrinter}
                                        onChange={e => setCodePrinter(e.target.value)} //save the type data in a variable
                                        maxLength="14"
                                        style={{ height: "50px" }}
                                        onKeyDown={moveToSecondInput} //event executed when press enter
                                    />
                                </div>
                                <div className="divInput" id="box2">
                                    <p>Código de barras</p>
                                    <input className="inputTyped"
                                        id="input2"
                                        ref={secondInput} //referenciate a fiels for focus use
                                        value={descOnePrinter}
                                        onChange={e => setDescOnePrinter(e.target.value)} //save the type data in a variable
                                        type="text"
                                        style={{ height: "50px" }}
                                        onKeyDown={moveToThirdInput} //event executed when press enter
                                        onFocus={previewBar}
                                    />
                                </div>
                                <div className="divInput" id="box3">
                                    <p>Número de série</p>
                                    <input className="inputTyped"
                                        id="input3"
                                        style={{ height: "50px" }}
                                        ref={thirdInput} //referenciate a fiels for focus use
                                        value={descTwoPrinter}
                                        onChange={e => setDescTwoPrinter(e.target.value)} //save the type data in a variable
                                        type="text"
                                        onKeyDown={handleKeyDown} //event executed when press enter
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="stagePrinter">
                            <Chart
                                chartType="Table"
                                data={dataTableOpen}
                                options={optionsTable}
                                formatters={formattersTable}

                            />
                        </div>

                    </div>

                    <div className="footerBarPrinter" style={{ boxShadow: '0px 0px 6px rgba(73, 87, 105, .24' }}>
                        <div className="sliceFooterPrinter" >
                            <button // clean input fields
                                id="btnReset"
                                onClick={() => cleanFields()}
                            >Reiniciar
                            </button>
                            <button // Call the post function. parameters: url that server is running, requisition type, data to post & clean input fields
                                id="btnReset"
                                onClick={() => {
                                    postTrigger(`${url}/procces`, methodReq, {
                                        "campoCod": codePrinter,
                                        "campoDesc1": descOnePrinter,
                                        "campoDesc2": descTwoPrinter
                                    });
                                    cleanFields()
                                }}
                            >Gravar número de série
                            </button>
                        </div>
                        <div className="sliceFooterPrinter" id="sliceFooterRigth" >
                            <button // clean input fields
                                id="btnEnter"
                                onClick={() => cleanFields()}
                            >Exportar CSV
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default ThreeRopes;