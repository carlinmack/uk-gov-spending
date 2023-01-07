import csv
from datetime import datetime as dt

import matplotlib.pyplot as plt
import matplotlib.ticker as tkr


def plot():
    with open("data/1900-present-inflation-total.csv", "r") as file:
        reader = csv.reader(file, delimiter=",")
        next(reader)
        fileData = [
            [dt.strptime(line[0], "%Y"), int(line[1]), int(line[2])] for line in reader
        ]

    fileData = list(zip(*fileData))

    title = "UK spending vs revenue"

    fig, ax = plt.subplots()

    ax.set_title(title, fontweight="bold")

    ax.plot(
        fileData[0], fileData[1], color="#FAD564", linewidth=2, label="Total Spending"
    )
    ax.plot(
        fileData[0], fileData[2], color="#64C3D8", linewidth=2, label="Total Revenue"
    )
    maxArray = [x >= y for x, y in zip(fileData[1], fileData[2])]
    minArray = [x <= y for x, y in zip(fileData[1], fileData[2])]
    ax.fill_between(
        fileData[0],
        fileData[1],
        fileData[2],
        where=maxArray,
        facecolor="#FF41367F",
        interpolate=True,
    )
    ax.fill_between(
        fileData[0],
        fileData[1],
        fileData[2],
        where=minArray,
        color="#3D99707F",
        interpolate=True,
    )

    ax.set_xlim(
        left=dt.strptime("1900-01-01", "%Y-%m-%d"),
        right=dt.strptime("2023-01-01", "%Y-%m-%d"),
    )
    ax.xaxis_date()

    ax.set_ylabel("£ (adjusted for inflation)")
    ax.yaxis.set_major_formatter(tkr.FuncFormatter(threeFigureFormatter))

    plt.legend(loc="upper left")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.grid(color="#e5e5e5", which="major", axis="y", linestyle="solid")
    ax.set_axisbelow(True)
    ax.set_ylim(bottom=0)

    plt.gcf().set_size_inches(12, 8)
    plt.savefig("plots/Total", bbox_inches="tight", pad_inches=0.25, dpi=200)
    plt.close(fig)


def threeFigureFormatter(x, pos):
    s = "%d" % x
    if abs(x) >= 1:
        groups = []
        while s and s[-1].isdigit():
            groups.append(s[-3:])
            s = s[:-3]
        return s + ",".join(reversed(groups))
    else:
        return s


if __name__ == "__main__":
    plot()
