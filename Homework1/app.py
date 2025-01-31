from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

applications = []
next_app_number = 1

@app.route('/api/submit_application', methods=['POST'])
def submit_application():
    global next_app_number
    data = request.get_json()
    
    application = {
        'number': next_app_number,
        'name': data.get('name'),
        'zipcode': data.get('zipcode'),
        'status': 'received'
    }
    
    applications.append(application)
    next_app_number += 1
    
    return jsonify({'application_number': application['number']})

@app.route('/api/check_status/<app_number>', methods=['GET'])
def check_status(app_number):
    app_number = int(app_number)
    for app in applications:
        if app['number'] == app_number:
            return jsonify({'status': app['status']})
    return jsonify({'status': 'not found'})

@app.route('/api/update_status', methods=['POST'])
def update_status():
    data = request.get_json()
    app_number = int(data.get('application_number'))
    new_status = data.get('status')
    
    for app in applications:
        if app['number'] == app_number:
            app['status'] = new_status
            return jsonify({'message': 'Status updated successfully'})
            
    return jsonify({'message': 'Application not found'})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)