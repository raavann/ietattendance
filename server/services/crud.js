const pool = require('../database/db');

module.exports = {
    add: (data, callBack) => {
        pool.query(
            `insert into ${data.allocation} (sub, st, et ,link) values( '${data.subject}' ,'${data.starttime}' ,'${data.endtime}' ,'${data.link}' )`,

            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    find: (allocation, id, callBack) => {
        if (id == 0){
            pool.query(`select * from ${allocation}`, (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            });
        } else {
            pool.query(`select * from ${allocation} where id = ${id}`, (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            });
        }
        
    },

    update: (data, callBack) => {
        pool.query( `update ${data.allocation} set 
            subject=${data.subject}, starttime=${data.starttime}, endtime=${data.endtime}, link=${data.link}
            where id = ${data.id}`,
        
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                
                return callBack(null, results[0]);
            }
        );
    },
    
    delete: (data, callBack) => {
        pool.query(
            `delete from ${data.allocation} where id = ${data.id}`,
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    }
};