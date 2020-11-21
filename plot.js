document.addEventListener("DOMContentLoaded", function () {
    const figures = [
        "1900-1969-spending",
        "1970-2021-spending",
        "1900-2021-spending-inflation",
    ];

    for (let figure of figures) {
        let element = document.createElement("div");
        element.class = "image";
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
            "1900-1969 UK Government Spending (adjusted for inflation)"
        );
    });

    Plotly.d3.csv("data/" + figures[3] + ".csv", (data) => {
        barPlot(
            data,
            figures[3],
            "group",
            "1970-2021 UK Government Spending (adjusted for inflation)"
        );
    });
});

function barPlot(data, plotID, mode, title) {
    var values = [];

    for (let key of Object.keys(data[0])) {
        values.push(data.map((obj) => obj[key]));
    }

    var dataSets = [];

    for (var i = 1; i < values.length; i++) {
        dataSets.push({
            x: values[0],
            y: values[i].map((x) => parseInt(x)),
            name: Object.keys(data[0])[i],
            type: "bar",
        });
    }

    var layout = {
        title: title,
        barmode: "stack",
        autosize: true,
    };
    var config = {
        responsive: true
    }

    Plotly.newPlot(plotID, dataSets, layout, config);
}
