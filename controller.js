const mysql = require("mysql");
const { hashPassword } = require("./utils");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "eor",
    password: "1lc9go4xZ3_"
});


const pool = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  user: "root",
  database: "eor",
  password: "1lc9go4xZ3_"
});

class Controller {

  
  async getUroks(token_user) {
    return new Promise((resolve, reject) => {
      if (!token_user) {
        reject(new Error('Unauthorized'));
        return;
      }
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Database connection error:', err);
          reject(err);
          return;
        }
        connection.query('SELECT * FROM urok', (err, results, fields) => {
          connection.release();
  
          if (err) {
            console.error('Database query error:', err);
            reject(err);
            return;
          }
  
          console.log('Database query executed successfully');
          resolve(results);
        });
      });
    });
  }
  
  
  
  
  
  

    // async createDrug(token_user, drug_name, days, start_date, how_much_in_day) {
    //     const promise = this.getIdUserByToken(token_user);
    //     const id_user = await promise;
    //     return new Promise((resolve, reject) => {
    //         connection.connect((err) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 console.log('Database connected');
    //                 connection.query(
    //                     'INSERT INTO prescriptions SET ?', 
    //                     {
    //                         id_user: id_user,
    //                         drug_name: drug_name,
    //                         days: days,
    //                         start_date: start_date,
    //                         how_much_in_day: how_much_in_day
    //                     },
    //                     (err, results, fields) => {
    //                         if (err) {
    //                             reject(err);
    //                         } else {
    //                             resolve(results.insertId);
    //                         }
    //                         connection.end((err) => {
    //                             if (err) {
    //                                 console.log(err);
    //                             } else {
    //                                 console.log('Database closed');
    //                             }
    //                         });
    //                     });
    //             }
    //         })
    //     });


    // }




    // async deleteDrug(token_user, id_prescription) {
    //     const promise = this.getIdUserByToken(token_user);
    //     const id_user = await promise;
    //     return new Promise((resolve, reject) => {
    //         connection.connect((err) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 console.log('Database connected');
    //                 connection.query(
    //                     'DELETE FROM prescriptions WHERE id_user = ? AND id_prescription=?',
    //                     [
    //                         id_user,
    //                         id_prescription
    //                     ],
    //                    (err, results, fields) => {
    //                         if (err) {
    //                             reject(err);
    //                         } else {
    //                             resolve(results.insertId);
    //                         }
    //                         connection.end((err) => {
    //                             if (err) {
    //                                 console.log(err);
    //                             } else {
    //                                 console.log('Database closed');
    //                             }
    //                         });
    //                     });
    //             }
    //         })
    //     });


    // }


//user

async createUser(id_user, FirstName, LastName, login, password) {
    try {
        return new Promise((resolve, reject) => {
      connection.connect((err) => {
      connection.query(
        'INSERT INTO user SET ?',
        {
            id_user: id_user,
            FirstName: FirstName,
            LastName: LastName,
            login: login,
            password: hashPassword(password)
  
        },
        (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId);
            }
            connection.end((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Database closed');
                }
            });
        });
    })
    });
    } catch(err) {
        throw (err);
    }
  }

  async loginUser(Login, Password) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT id_user FROM user WHERE login = ? and password = ?',
        [Login, hashPassword(Password)],
        (err, results, fields) => {
          if (err) {
            reject(err);
          } else if (results.length === 0) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            return (error);
          } else {
            const generate_token = (length) => {
              const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
              const b = [];
              for (let i = 0; i < length; i += 1) {
                let j = Math.floor(Math.random() * (a.length - 1));
                b.push(a[j]);
              }
              return b.join('');
            };
            const token_user = generate_token(32);
            const id_user = results[0].id_user;
            console.log(token_user);
            connection.query(
              'UPDATE user SET token_user = ? WHERE id_user = ?',
              [token_user, id_user],
              (err, results, fields) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(token_user);
                }
              }
            );
          }
        }
      );
    }).catch(error => {
      console.error('An error occurred:', error);
      if (error.status) {
        return Promise.reject(error);
      } else {
        return Promise.reject(new Error('Internal server error'));
      }
    });
  }
  
  
  
  
  

  
  
    // async getIdUserByToken(token_user) {
    //     console.log(token_user);
    //     return new Promise((resolve, reject) => {
    //         connection.query(
    //             'SELECT id_user FROM user WHERE token_user = ?',
    //             [
    //                 token_user,
    //             ],
    //             (err, results, fields) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(results[0].id_user);
    //                 }
    //             });
    //     }
    //     )
    // }

    async logout(token_user) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
        return new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {

                    console.log('Database connected');
                    console.log(token_user);
                    connection.query(
                        'UPDATE user SET token_user = NULL WHERE id_user = ?',
                        [

                            id_user

                        ],
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                            connection.end((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Database closed');
                                }
                            });
                        });
                }
            })
        });
    }
};
module.exports = Controller;