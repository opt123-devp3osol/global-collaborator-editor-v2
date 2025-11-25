import pool from "./connection.js";

export const insertCommonApiCall = async (body) => {
    const {column,alias,tableName,values} = body;
    return new Promise(function(resolve, reject) {
        const query = `INSERT INTO ${tableName} (${column.toString()}) VALUES (${alias.toString()})`;

        pool.query(query,values, (error, results) => {
            if (error || results === undefined) {
                reject(error);
            }
            let data = [];
            if(results !== undefined)
                data = results?.rows;
            resolve(data);
        })

    }).catch((e)=>{
        console.error('Error writing to log file:', e);
    })
}

export const updateCommonApiCall = (body) => {
    const {column,value,whereCondition,tableName,returnColumnName} = body;
    return new Promise(function(resolve, reject) {
        let returnVa = returnColumnName ? returnColumnName : 'id';
        const query = `UPDATE ${tableName} set ${column.toString()} WHERE ${whereCondition} returning ${returnVa}`;

        pool.query(query,value, (error, results) => {
            if (error || results === undefined) {
                reject(error)
            }
            let data = [];
            if(results !== undefined)
                data = results?.rows;
            resolve(data);
        })
    })
}

export const deleteCommonApiCall = (body) => {
    const {condition,tableName,returnColumnName} = body;
    return new Promise(function(resolve, reject) {
        const query = `DELETE FROM ${tableName} WHERE ${condition} returning ${returnColumnName}`;

        pool.query(query, (error, results) => {
            if (error || results === undefined) {
                reject(error)
            }
            let data = [];
            if(results !== undefined)
                data = results?.rows;
            resolve(data);
        })
    })
}