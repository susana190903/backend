const userQueries = {
    getAll: 'SELECT * FROM users',
    getById: 'SELECT * FROM users WHERE id = ?',
    getByEmail: 'SELECT * FROM users WHERE email = ?',
    create: 'INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)',
}

module.exports = {userQueries};