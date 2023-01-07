import os

import pandas as pd


def main():  # Read the data from the file into a pandas dataframe
    directory = "input/"
    df_list = []
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)

        temp_df = pd.read_csv(f, header=0, index_col="Year", dtype={"Year": int})

        # Print the dataframe to verify that it has been correctly read
        df_list.append(temp_df)

    df = pd.concat(df_list, axis=1)
    df = df.rename(
        ## TBH I think that this is the wrong way around and that the nominal ones 
        ## are the ones adjusted for inflation but it doesn't rly make sense with
        ## the data :/
        columns={
            "Business and Other Revenue-total £ billion ": "Business and Other Revenue (adj)",
            "Capital-total £ billion ": "Capital Tax (adj)",
            "Defence-total £ billion ": "Military (adj)",
            "Education-total £ billion ": "Education (adj)",
            "Excise Taxes-total £ billion ": "Excise Taxes (adj)",
            "General Government-total £ billion ": "General Government (adj)",
            "Health Care-total £ billion ": "Health Care (NHS etc) (adj)",
            "Income-total £ billion ": "Income Tax (adj)",
            "Interest-total £ billion ": "Interest on Debts (adj)",
            "National Insurance-total £ billion ": "National Insurance (adj)",
            "Other Spending-total £ billion ": "Other Spending (adj)",
            "Other-total £ billion ": "Other (adj)",
            "Other-total £ billion ": "Other (adj)",
            "Pensions-total £ billion ": "Pensions (adj)",
            "Property Taxes-total £ billion ": "Property Taxes (adj)",
            "Protection-total £ billion ": "Emergency Services (adj)",
            "Sales/Value Added Taxes-total £ billion ": "Sales/Value Added Taxes (adj)",
            "Total Direct Revenue-total £ billion ": "Total Direct Revenue (adj)",
            "Total Spending-total £ billion ": "Total Spending (adj)",
            "Transport-total £ billion ": "Transport (Railway/Roads etc) (adj)",
            "Transportation-total £ billion ": "Transportation (adj)",
            "Welfare-total £ billion ": "Welfare (Benefits etc) (adj)",
            "Business and Other Revenue-total £ billion nominal": "Business and Other Revenue",
            "Capital-total £ billion nominal": "Capital Tax",
            "Defence-total £ billion nominal": "Military",
            "Education-total £ billion nominal": "Education",
            "Excise Taxes-total £ billion nominal": "Excise Taxes",
            "General Government-total £ billion nominal": "General Government",
            "Health Care-total £ billion nominal": "Health Care (NHS etc)",
            "Income-total £ billion nominal": "Income Tax",
            "Interest-total £ billion nominal": "Interest on Debts",
            "National Insurance-total £ billion nominal": "National Insurance",
            "Other Spending-total £ billion nominal": "Other Spending",
            "Other-total £ billion nominal": "Other",
            "Other-total £ billion nominal": "Other",
            "Pensions-total £ billion nominal": "Pensions",
            "Property Taxes-total £ billion nominal": "Property Taxes",
            "Protection-total £ billion nominal": "Emergency Services",
            "Sales/Value Added Taxes-total £ billion nominal": "Sales/Value Added Taxes",
            "Total Direct Revenue-total £ billion nominal": "Total Direct Revenue",
            "Total Spending-total £ billion nominal": "Total Spending",
            "Transport-total £ billion nominal": "Transport (Railway/Roads etc)",
            "Transportation-total £ billion nominal": "Transportation",
            "Welfare-total £ billion nominal": "Welfare (Benefits etc)",
        }
    )
    # with pd.option_context('display.max_colwidth', None, 'display.max_rows', None):
    # print(list(df.columns))

    # 1900-2020-inflation-total
    columns = ["Total Spending (adj)", "Total Direct Revenue (adj)"]
    output(columns, df, "1900-2020-inflation-total.csv")

    # 1900-2020-spending-inflation
    columns = ["Health Care (NHS etc) (adj)", "Pensions (adj)", "Welfare (Benefits etc) (adj)", "Education (adj)", "Military (adj)", "Interest on Debts (adj)", "Other Spending (adj)", "Emergency Services (adj)", "Transport (Railway/Roads etc) (adj)", "General Government (adj)", ]
    output(columns, df, "1900-2020-spending-inflation.csv")

    # 1900-2020-revenue-inflation
    columns = ["Income Tax (adj)", "Sales/Value Added Taxes (adj)", "National Insurance (adj)", "Business and Other Revenue (adj)", "Other (adj)", "Transportation (adj)", "Property Taxes (adj)", "Excise Taxes (adj)", "Capital Tax (adj)"]
    output(columns, df, "1900-2020-revenue-inflation.csv")

    # 1900-1969-spending
    columns = ["Health Care (NHS etc)", "Pensions", "Welfare (Benefits etc)", "Education", "Military", "Interest on Debts", "Other Spending", "Emergency Services", "Transport (Railway/Roads etc)", "General Government", ]
    output(columns, df[:70], "1900-1969-spending.csv")

    # 1900-1969-revenue
    columns = ["Income Tax", "Sales/Value Added Taxes", "National Insurance", "Business and Other Revenue", "Other", "Transportation", "Property Taxes", "Excise Taxes", "Capital Tax"]
    output(columns, df[:70], "1900-1969-revenue.csv")

    # 1970-2020-spending
    columns = ["Health Care (NHS etc)", "Pensions", "Welfare (Benefits etc)", "Education", "Military", "Interest on Debts", "Other Spending", "Emergency Services", "Transport (Railway/Roads etc)", "General Government", ]
    output(columns, df[70:], "1970-2020-spending.csv")

    # 1970-2020-revenue
    columns = ["Income Tax", "Sales/Value Added Taxes", "National Insurance", "Business and Other Revenue", "Other", "Transportation", "Property Taxes", "Excise Taxes", "Capital Tax"]
    output(columns, df[70:], "1970-2020-revenue.csv")


def output(columns, df, filename):
    temp = df[columns]
    # print(columns)
    # Multiply the selected columns by a billion
    temp *= 1e9
    temp = temp.astype(int)
    # Write the selected columns to the file
    temp.to_csv("data/" + filename)


if __name__ == "__main__":
    main()
