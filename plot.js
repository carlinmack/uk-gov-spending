document.addEventListener("DOMContentLoaded", function () {
    const figures = [
        "1900-1969-spending",
        "1970-2021-spending",
        "1900-2021-spending-inflation",
    ];

    for (let figure of figures) {
        let element = document.createElement("div");
        element.id = figure;

        document.getElementById("plotlyContainer").append(element);
    }

    Plotly.d3.csv("data/" + figures[0] + ".csv", (data) => {
        barPlot(data, figures[0], "group", "1900-1969 UK Government Spending");
    });

    Plotly.d3.csv("data/" + figures[1] + ".csv", (data) => {
        barPlot(data, figures[1], "group", "1970-2021 UK Government Spending");
    });

    Plotly.d3.csv("data/" + figures[2] + ".csv", (data) => {
        barPlot(
            data,
            figures[2],
            "group",
            "1900-2021 UK Government Spending (adjusted for inflation)"
        );
    });
});

function barPlot(data, plotID, mode, title) {
    let values = [];

    const keys = Object.keys(data[0]);
    for (let key of keys) {
        values.push(data.map((obj) => obj[key]));
    }

    let dataSets = [];

    for (let i = 1; i < values.length; i++) {
        dataSets.push({
            x: values[0],
            y: values[i].map((x) => parseInt(x)),
            name: keys[i],
            type: "bar",
        });
    }

    const layout = {
        title: title,
        barmode: "stack",
        autosize: true,
    };

    const config = {
        responsive: true,
    };

    Plotly.newPlot(plotID, dataSets, layout, config);
}
