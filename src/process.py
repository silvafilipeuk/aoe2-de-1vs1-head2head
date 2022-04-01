from flask import Flask, render_template, request, jsonify
import system

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('form.html')



@app.route('/searchP1', methods=['POST'])
def searchP1():
	p1 = request.form['p1']

	result = system.searchPlayer(p1);
	
	return jsonify({'result' : result})



@app.route('/searchP2', methods=['POST'])
def searchP2():
	p2 = request.form['p2']

	result = system.searchPlayer(p2);
	
	return jsonify({'result' : result})



@app.route('/process', methods=['POST'])
def process():

	p1 = request.form['p1']
	p2 = request.form['p2']

	if p1 and p2:
		result = system.matchStats(p1, p2);

		
		return jsonify({'result' : result})

	return jsonify({'error' : 'Missing data!'})

if __name__ == '__main__':
	app.run(debug=True)