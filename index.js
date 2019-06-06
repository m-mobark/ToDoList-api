require('dotenv').config();
require('./config/passport')(passport);
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserRoutes = require('./routes/users');
const TaskRoutes = require('./routes/tasks');
const _PORT = process.env.PORT;
        //----------connecrt to DB ---------
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
        mongoose.connection.on('connected', () => {
          console.log('Connected');
        });
             mongoose.connection.on('error',  (err) => {
                console.log(`cant connect: ${err}`);
              });
              
              app.use(cors());
                app.use(bodayParser.json());

                      app.use(passport.initialize());
                      app.use(passport.session());
                    
                              app.get('/', (req, res, next) => {
                                res.send('blabla')
                              });
                                            //Users Routes
                                            app.use('/users', UserRoutes);
                                                  //tasks Routes                                           
                                                  app.use('/tasks', TaskRoutes);

                                                        app.listen(_PORT, () => {
                                                          console.log('Server Started');
                                                        });