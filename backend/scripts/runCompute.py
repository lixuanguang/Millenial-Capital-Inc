import sys
import json
import yfinance as yf
import pandas as pd
import collections


def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

# Find max value gien a key
def findMax(dictList, keyVal):
    seq = [x[keyVal] for x in dictList]
    value = max(seq)
    return value

# Filter a list of dictionaries to the condition
def filterListofDict(dictList, keyVal, seekVal):
    conditionfulfilled = [d for d in dictList if d[keyVal] == seekVal]
    return conditionfulfilled

def convertToProperDate(dataset):
    dataset["Dates"] = dataset.index
    dataset = dataset.reset_index()
    dataset["Date"] = dataset["Dates"].astype(str)
    dataset = dataset.drop(columns=["Dates"])
    return dataset

# Computes the financial ratios for analysis
def computeRatios(lines):

    listOfData = collections.defaultdict(list)

    # get ticker data with yfinance
    ticker = lines[1][0]['stock']
    tickerData = yf.Ticker(ticker)
    # get historical data
    hist = pd.DataFrame(tickerData.history(period="max"))

    # get the latest financial data value
    value = findMax(lines[1], "SN")
    finstatements1 = filterListofDict(lines[0], "SN", value)
    finstatements2 = filterListofDict(lines[1], "SN", value)
    # Actually the financial data from Kaggle is pretty bad.
    # If the data is good, I will be calculating the earnings ratio, solvency & liquidity ratios (for credit risk analysis)

    recommendations = tickerData.recommendations
    recommendations = convertToProperDate(recommendations)
    actions = tickerData.actions
    actions = convertToProperDate(actions)
    hist = convertToProperDate(hist)
    calendar = tickerData.calendar
    calendar = convertToProperDate(calendar)
    calendar = calendar.drop(columns=["Date"])
    
    listOfData["recommendations"].append(recommendations.to_dict('records'))
    listOfData["actions"].append(actions.to_dict('records'))
    listOfData["price"].append(hist.to_dict('records'))
    listOfData["calendar"].append(calendar.to_dict('records'))

    return (dict(listOfData))


def main():

    lines = read_in()

    data = computeRatios(lines)

    if (sys.argv[1] == 'recommendations'):
        print(data["recommendations"][0])
    elif (sys.argv[1] == 'actions'):
        print(data["actions"][0])
    elif (sys.argv[1] == 'price'):
        print(data["price"][0])
    elif (sys.argv[1] == 'calendar'):
        print(data["calendar"][0])


#start process

if __name__ == '__main__':
    main()