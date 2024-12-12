const userQueries = {
    getAll: 'SELECT * FROM user',
    getById: 'SELECT * FROM user WHERE id = ?',
    getByEmail: 'SELECT * FROM user WHERE email = ?',
    create: 'INSERT INTO user (first_name, last_name, email, password) VALUES (?,?,?,?)',
    editUser: 'UPDATE user SET first_name=?, last_name=?, email=? WHERE id=?',
    emailvalid: 'SELECT * FROM user WHERE email = ? AND id <> ?',
    deleteUser: 'DELETE FROM user WHERE id=?'
}

module.exports = { userQueries };
