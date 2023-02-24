//format column chart
export const optionsColumn = {
    height: 230,
    chartArea: {
        left: 11,
        top: 0,
        right: 11,
        bottom: 30,
        width: "80%",
        height: "100%"
      },
    backgroundColor: "none",
    annotations: {
        textStyle: {
            fontSize: 15,
            bold: true,
            color: "#495769",
        },
        alwaysOutside: true,
        highContrast: false,
    },
    vAxis: {
        baselineColor: "#B8B7BB",
        textStyle: {
            fontSize: 10
        },
        gridlines: {
            count: 0,
        },     
    }

};

//format table chart
export const optionsTable = {
    allowHtml: true,
    'width':'100%',
    'height':250,
    chartArea:{left:0, top:0, bottom:0},
    showRowNumber: true,
    cssClassNames: {
        tableCell: 'tableOrder'
    }
};

//format table chart
export const formattersTable = [
    {
        type: "ColorFormat",
        column: 4,
        desc: true,
        ranges: [
            [0, 0, "black", "white"],
            [2, null, "black", "#EE616F"],
            [1, null, "black", "#F7D883"],
        ],
    },
];
