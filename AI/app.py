from flask import Flask
from flask import jsonify
from flask import request
from esquema import Optimizar
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/api/v1/optimize', methods=['POST'])
def optimizarBodega():
    try:
        response = Optimizar(request.json['packages'],request.headers['token'])
        print(response)
        if len(response.values()) == 0:
            return jsonify({'N/A': {'section': 'null', 'slot': 'null', 'level': 'null'}})
        else:
            return jsonify(response)
    except Exception as err:
        return jsonify({'message': err})

if __name__ == '__main__':
    app.run(debug=True, port=5000)