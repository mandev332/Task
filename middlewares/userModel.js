let getUser = `SELECT * FROM customers`;

let postUser = `INSERT INTO customers ( username, gmail, password, contact) values($1,$2,$3,$4) RETURNING *`;

let putUser = `Update customers SET username = $2, gmail = $3, password = $4, contact = $5 WHERE id = $1 RETURNING *`;

let deleteUser = `DELETE FROM customers WHERE id = $1 RETURNING *`;

export { getUser, postUser, putUser, deleteUser };
