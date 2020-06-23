
var services ={
    createUser:"INSERT INTO user (name,address,phoneNumber,email) VALUES (?,?,?,?)",
    getUser:"SELECT * FROM user",
    deleteUser:"DELETE FROM user WHERE id =?",
    updateUser:"UPDATE user SET name=?,address=?,phoneNumber=?,email=? WHERE id=?"
}


module.exports = services;