import requests

r = requests.post('http://localhost:5000/predict', json = {
    "years":10,
    "gt":250})
print(r.text)
