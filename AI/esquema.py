import pulp
from pymongo import MongoClient
from datetime import datetime
import requests 
import json
def Optimizar(packageList,token):
    notif_message = ''
    #Conexión con mongo
    client = MongoClient('mongodb+srv://root:root@smartwarehouse.5fbb9dp.mongodb.net/?retryWrites=true&w=majority')

    #para mandar al core
    url_post = "http://localhost:3001/api/v1/package/setlocation"
    url_post_notif = "http://localhost:3001/api/v1/notification/create"

    db = client['test']
    sectionsCollection = db['sections']
    slotsCollection = db['slots']
    sections = list(sectionsCollection.find())
    slots = list(slotsCollection.find())

    for item in sections:
        item['capacity_level'] = {1: 1000, 2: 750, 3: 500, 4: 750}

    client.close()
    print("-"*20)
    # packages y sus características (incluyendo dimensiones)
    packages = packageList

    # Creación del problema de optimización
    prob = pulp.LpProblem("Asignacion_de_Ubicaciones", pulp.LpMaximize)

    # Variables de decisión para packages en sections, slots y leveles
    x = {}
    for package in packages:
        for section in sections:
            for slot in slots:
                for level in range(1, slot["levels"] + 1):
                    x[(package["code"], section["name"], slot["code"], level)] = pulp.LpVariable(
                        f'Ubicacion_{package["code"]}_{section["name"]}_{slot["code"]}_{level}', 0, 1, pulp.LpBinary)

    # Función objetivo (Maximizar la utilización de las sections considerando la distancia)
    prob += pulp.lpSum(
        x[(package["code"], section["name"], slot["code"], level)] * (
                package["weight"] - (slot["distance_to_door"] + section["distance_to_door"])) 
        for package in packages for section in sections for slot in slots for level in range(1, slot["levels"] + 1))

    # Restricciones
    # Restricción de capacidad de cada sección (basada en dimensiones)
    for section in sections:
        for slot in slots:
            for level in range(1, slot["levels"] + 1):
                prob += pulp.lpSum(
                    x[(package["code"], section["name"], slot["code"], level)] * (
                            package["height"] * package["width"] * package["depth"]) 
                    for package in packages) <= section["dimensions"]

    # Restricciones de capacidad de level en cada sección
    for section in sections:
        for level, capacidad in section["capacity_level"].items():
            prob += pulp.lpSum(x[(package["code"], section["name"], slot["code"], level)] * package["weight"] for package in packages for slot in slots) <= capacidad

    # Restricción para asegurar que cada package se asigne solo una vez
    for package in packages:
        prob += pulp.lpSum(
            x[(package["code"], section["name"], slot["code"], level)] for section in sections for slot in slots
            for level in range(1, slot["levels"] + 1)
        ) == 1

    # Restricciones para manejar la sobreposición
    for slot in slots:
        for level in range(1, slot["levels"] + 1):
            packages_in_slot = [
                package["code"] for package in packages
                if pulp.value(x[(package["code"], section["name"], slot["code"], level)]) == 1
            ]
            prob += pulp.lpSum(
                x[(package1, section["name"], slot["code"], level)] for package1 in packages_in_slot
                for package2 in packages_in_slot if package1 != package2
            ) == 0

    # Resuelve el problema de optimización
    prob.solve()

    sendingJson = {}
    # Imprime los resultados
    for package in packages:
        for section in sections:
            for slot in slots:
                for level in range(1, slot["levels"] + 1):
                    if pulp.value(x[(package["code"], section["name"], slot["code"], level)]) == 1:
                        sendingJson[package["code"]] = {'section': section["name"], 'slot': slot["code"], 'level': level}
                        notif_message = f"Paquete {package['code']} asignado a Sección {section['name']}, Estanteria {slot['code']}, Nivel {level}"
                        if(package['perishable']):
                            requests.post(url_post_notif, headers= {'token':token} , json={
                            'message':f"recuerde que el paquete {package['code']} vence el {package['expiration_date']}",
                            'PackageId': package['id']
                        })
                        post_notif_response = requests.post(url_post_notif, headers= {'token':token} , json={
                            'message':notif_message,
                            'PackageId': package['id']
                        })
                        print(notif_message)
    post_response = requests.post(url_post, json=sendingJson, headers= {'token':token})

    if post_response.status_code == 200:
        return sendingJson
    else:
        return 0