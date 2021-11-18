import csv, json

with open('data-qqq.csv', newline='') as csvfile:
    data = csv.reader(csvfile, delimiter=',', quotechar='|')
    data_list = []
    for row in data:
        # print(row)
        data_dict = {
            "watchlistId": 2,
            "symbol": row[2],
            "symbolName": row[1]
        }
        data_list.append(data_dict)
    print(data_list)
    json_object = json.dumps(data_list, indent=4)
    with open('qqq.json', "w") as outfile:
        outfile.write(json_object)


{'num': '1', 'company': 'Microsoft Corporation', 'symbol': 'MSFT', 'weight': '6.406082', 'price': '341.53', 'chng': '2.41', '%chng': '(0.71%)'}
