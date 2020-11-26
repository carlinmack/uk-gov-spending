document.addEventListener("DOMContentLoaded", function () {
    const figures = [
        "1900-1969-spending",
        "1970-2021-spending",
        "1900-2021-spending-inflation",
        "1900-2021-spending-inflation-change",
        "1900-2021-spending-inflation-cumulative",
    ];

    for (let figure of figures) {
        let element = document.createElement("div");
        element.id = figure;

        document.getElementById("plotlyContainer").append(element);
    }

    Plotly.d3.csv("data/" + figures[0] + ".csv", (data) => {
        plot(data, figures[0], "1900-1969 UK Government Spending");
    });

    Plotly.d3.csv("data/" + figures[1] + ".csv", (data) => {
        plot(data, figures[1], "1970-2021 UK Government Spending");
    });

    Plotly.d3.csv("data/" + figures[2] + ".csv", (data) => {
        plot(
            data,
            figures[2],
            "1900-2021 UK Government Spending (adjusted for inflation)",
            { ylabel: "2013 £s" }
        );

        plot(
            data,
            figures[3],
            "1900-2021 Change in UK Government Spending (adjusted for inflation)",
            { mode: "relative", ylabel: "2013 £s" }
        );

        plot(
            data,
            figures[4],
            "1900-2021 Cumulative UK Government Spending (adjusted for inflation)",
            { type: "line", ylabel: "2013 £s", mode: "cumulative" }
        );
    });
});

function plot(data, plotID, title, { ylabel = "", mode = "stack", type = "" } = {}) {
    let values = [];

    const keys = Object.keys(data[0]);
    for (let key of keys) {
        values.push(data.map((obj) => obj[key]));
    }

    if (mode == "relative") {
        for (let i = 1; i < values.length; i++) {
            for (let j = 1; j < values[i].length; j++) {
                values[i][j - 1] = parseInt(values[i][j]) - parseInt(values[i][j - 1]);
            }
        }
        values[0].shift();
    }

    if (mode == "cumulative") {
        for (let i = 1; i < values.length; i++) {
            for (let j = 1; j < values[i].length; j++) {
                values[i][j] = parseInt(values[i][j]) + parseInt(values[i][j - 1]);
                console.log(values[i][j]);
            }
        }
    }

    let dataSets = [];

    for (let i = 1; i < values.length; i++) {
        let options = { type: "bar" };
        if (type == "line") {
            options = {
                mode: "lines",
                line: { shape: "spline" },
                type: "scatter",
            };
        }
        dataSets.push({
            x: values[0],
            y: values[i].map((x) => parseInt(x)),
            name: keys[i],
            ...options,
        });
    }

    let layout = {
        title: title,
        barmode: mode,
        autosize: true,
        yaxis: {
            tickprefix: "£",
        },
    };

    if (ylabel) {
        layout.yaxis.title = ylabel;
    }

    const config = {
        responsive: true,
    };

    Plotly.newPlot(plotID, dataSets, layout, config);
}
