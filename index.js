/**
 * Copyright (c) 2019 Satyam Kumar <satyamvats5@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const router = require('./router/indexRouter');

const key = require('./util/config');

const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);

const options = require('./config/database/databaseConfig');

// const key = require('./util/config');

const db_connection = require('./util/database/db_connect');

const colleges = require('./models/college/college');

const mentors = require('./models/mentor/mentor');

const students = require('./models/student/student');

const PORT = 8080;

const path = require('path');

const app = new express();

// const router = require('./routes/index');

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded(
		{
			extended: true
		}
	)
)

var sessionStore = new MySQLStore(options);

app.use(session({
	secret: key.keyCookie,
	resave: true,
	saveUninitialized: false,
	//cookie: {maxAge: 10000, httpOnly: true, isLoggedIn: false},
	store: sessionStore
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, staticFolder)));

app.use(function(req, res, next) {
    console.log(req.method, req.url)
    next();
})

app.use('/', router);

app.set('port', PORT);

colleges.hasMany(mentors, {foreignKey: 'college_code', constraints : true, onDelete : 'CASCADE'});

colleges.hasMany(students, {foreignKey: 'college_code', constraints : true, onDelete : 'CASCADE'});

mentors.hasMany(students, {foreignKey: 'mentor_id', constraints : true, onDelete : 'CASCADE'});

// const db_connection = require('./util/database');

var server = app.listen(
	app.get('port'), function() {
		var port = server.address().port;
		console.log("Server is running on port: " + port);
		db_connection
		.sync({force:false})
		.then(() => {
			console.log('Database connected!');
		})
		.catch(err => {
			console.log(err);
		});
	}
);
