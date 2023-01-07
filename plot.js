document.addEventListener("DOMContentLoaded", function () {
    const spendingFigures = [
        "1900-1969-spending",
        "1970-present-spending",
        "1900-present-spending-inflation",
        "1900-present-spending-inflation-change",
        "1900-present-spending-inflation-cumulative",
    ];

    for (let figure of spendingFigures) {
        let element = document.createElement("div");
        element.id = figure;

        document.getElementById("plotlyContainer").append(element);
    }

    Plotly.d3.csv("data/" + spendingFigures[0] + ".csv", (data) => {
        plot(data, spendingFigures[0], "1900-1969 UK Government Spending");
    });

    Plotly.d3.csv("data/" + spendingFigures[1] + ".csv", (data) => {
        plot(data, spendingFigures[1], "1970-2022 UK Government Spending");
    });

    Plotly.d3.csv("data/" + spendingFigures[2] + ".csv", (data) => {
        plot(
            data,
            spendingFigures[2],
            "1900-2022 UK Government Spending (adjusted for inflation)",
            { ylabel: "2000 £s" }
        );

        plot(
            data,
            spendingFigures[3],
            '1900-2022 Change in UK Government Spending (adjusted for inflation)',
            { mode: 'relative', ylabel: '2000 £s' }
        );

        plot(
            data,
            spendingFigures[4],
            '1900-2022 Cumulative UK Government Spending (adjusted for inflation)',
            { type: 'line', ylabel: '2000 £s', mode: 'cumulative' }
        );
    });

    var element = document.createElement("h2");
    element.innerHTML = "Revenue";
    document.getElementById("plotlyContainer").append(element);

    const revenueFigures = [
        "1900-1969-revenue",
        "1970-present-revenue",
        "1900-present-revenue-inflation",
        "1900-present-revenue-inflation-change",
        "1900-present-revenue-inflation-cumulative",
    ];

    for (let figure of revenueFigures) {
        let element = document.createElement("div");
        element.id = figure;

        document.getElementById("plotlyContainer").append(element);
    }

    Plotly.d3.csv("data/" + revenueFigures[0] + ".csv", (data) => {
        plot(data, revenueFigures[0], "1900-1969 UK Government Revenue");
    });

    Plotly.d3.csv("data/" + revenueFigures[1] + ".csv", (data) => {
        plot(data, revenueFigures[1], "1970-2022 UK Government Revenue");
    });

    Plotly.d3.csv("data/" + revenueFigures[2] + ".csv", (data) => {
        plot(
            data,
            revenueFigures[2],
            '1900-2022 UK Government Revenue (adjusted for inflation)',
            { ylabel: '2000 £s' }
        );

        plot(
            data,
            revenueFigures[3],
            '1900-2022 Change in UK Government Revenue (adjusted for inflation)',
            { mode: 'relative', ylabel: '2000 £s' }
        );

        plot(
            data,
            revenueFigures[4],
            '1900-2022 Cumulative UK Government Revenue (adjusted for inflation)',
            { type: 'line', ylabel: '2000 £s', mode: 'cumulative' }
        );
    });

    var element = document.createElement("div");
    element.class = "js-plotly-plot"
    let image = document.createElement('img')
    image.src = "plots/Total.png";
    element.append(image)
    document.getElementById("plotlyContainer").append(element);

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
    // https://coolors.co/b690d5-64c3d8-8ec07f-fad564-db5a81-f1c8e5-ef9c43-7ac7a6-769dcc-bd51bd
    let layout = {
        title: title,
        barmode: mode,
        autosize: true,
        yaxis: {
            tickprefix: "£",
        },
        colorway: [
            "#B690D5",
            "#64C3D8",
            "#8ec07f",
            "#fad564",
            "#db5a81",
            "#f1c8e5",
            "#ef9c43",
            "#7ac7a6",
            "#769dcc",
            "#bd51bd",
        ],
    };

    if (ylabel) {
        layout.yaxis.title = ylabel;
    }

    const config = {
        responsive: true,
    };

    Plotly.newPlot(plotID, dataSets, layout, config);
}
