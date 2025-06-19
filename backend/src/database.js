import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'mysqldb',
    user: 'root',
    password: 'secret',
    database: 'buy-and-sell',
    port: '/var/run/mysqld/mysqld.sock',
});

export const db = {
    connect: () => connection.connect(),
    query: (queryString, escapedValues) => {
        return new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({results, fields});
            })
        })
    },
    end: () => connection.end()  
};