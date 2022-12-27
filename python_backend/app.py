from flask import Flask, render_template, request, jsonify
import mysql.connector as mysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def db_config():
    cnx = mysql.connect(host='localhost', database='FRPDemo', user='root', password='password')
    cur=cnx.cursor(buffered=True)
    return cnx,cur

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/users', methods=['POST', 'GET'])
def data():
    cnx,cur = db_config()
    try:
    
    # POST a data to database
        if request.method == 'POST':
            body = request.get_json(force=True)
            id = body['id']
            firstName = body['firstName']
            lastName = body['lastName']
            emailId = body['emailId']
            insert_query = "insert into user_dtls(id,firstName,lastName,emailId) values(%s,%s,%s,%s)"
            val = (id, firstName,lastName,emailId)
            cur.execute(insert_query,val)
            cnx.commit()
            cur.close()
            cnx.close()
            bodyDict = {
                'status': 'Data is posted to MY Sql DB!',
                "id" : id,
                "firstName": firstName,
                "lastName": lastName,
                "emailId": emailId
            }
            return jsonify(bodyDict)
        
        # GET all data from database
        if request.method == 'GET':
            query = "select * from user_dtls"
            cur.execute(query)
            responseData = [dict((cur.description[i][0], value)
                                    for i, value in enumerate(row)) for row in cur.fetchall()]
            cur.close()
            cnx.close()
            return jsonify(responseData)

    except Exception as e:
        d = {}
        return jsonify(d)
   
    return jsonify(responseData)

@app.route('/users/<string:id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def onedata(id):
    cnx,cur = db_config()
    # GET a specific data by id
    try:
        if request.method == 'GET':
            query = "select * from user_dtls where id=%s"
            cur.execute(query,(id,))
            responseData = dict((cur.description[i][0], v) for i,v in enumerate(cur.fetchone()))
            print(responseData)
            cur.close()
            cnx.close()
            return jsonify(responseData)

        # delete data by id
        if request.method == 'DELETE':
            delete_query = "delete from user_dtls where id = %s"
            cur.execute(delete_query,(id,))
            cnx.commit()
            cur.close()
            cnx.close()
            return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

        # UPDATE a data by id
        if request.method == 'PUT':
            body = request.json
            firstName = body['firstName']
            lastName = body['lastName']
            emailId = body['emailId']
            update_query =  "update user_dtls set firstName =%s ,lastName = %s,emailId=%s where id = %s"
            val = (firstName,lastName,emailId,id)
            cur.execute(update_query,val)
            cnx.commit()
            cur.close()
            cnx.close()
            return jsonify({'status': 'Data id: ' + id + ' is updated!'})

    except:
        return jsonify({"status":"not found"})

if __name__ == '__main__':
    app.debug = True
    app.run()