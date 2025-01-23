from flask import Flask, send_from_directory

from http.client import HTTPConnection
from flask import request

def send_message_streaming(message):
    connection = HTTPConnection('localhost', 8000)
    connection.putrequest('POST', '/', skip_host=True)
    connection.putheader('Content-Type', 'text/plain')
    connection._http_vsn = 11
    connection._http_vsn_str = 'HTTP/1.1'
    encoded_message = message.encode('utf-8')
    connection.putheader('Content-Length', str(len(encoded_message)))
    connection.endheaders()
    connection.send(encoded_message)
    response = connection.getresponse()

    if response.status == 200:
        while True:
            chunk = response.readline().decode('utf-8')
            if not chunk:
                return
            yield chunk.strip()
    else:
        raise Exception(f"Error: Server responded with status {response.status}")

def send_message(message):
    response = ""
    for data in send_message_streaming(message):
        response += data + '\n'
    return response




app = Flask(__name__, static_url_path='', static_folder='.')

@app.route('/')
def serve_files():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('.', path)
@app.route('/src/ai/<message>')
def ai_route(message):
    response = send_message(message + " - answer in 50-100 words")
    return response

if __name__ == '__main__':
    app.run(debug=True)