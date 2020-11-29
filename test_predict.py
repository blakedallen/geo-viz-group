import requests

tests = [
    {
        "years":2109,
        "gt":69,
    },
    {
        "years":2500,
        "gt":1000,
    },
    {
        "years":2500,
        "gt":0,
    },
]

for i,test in enumerate(tests):
    r = requests.post('http://localhost:5000/predict', json = test)
    print("Test: {}".format(i))
    print("Years: {}".format(test["years"]))
    print("Gigatons: {}".format(test["gt"]))
    print("Sea Level Rise: {} meters".format(r.json()["sea_level"]))
    print("*"*10)
    print("\n")        

