const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())


//post the data to json file
app.post('/user/add', (req, res) => {

    const existUsers = getUserData()
    const userData = req.body
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})


//get all the data from json file
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})


/* Update - Patch method */
app.patch('/user/update/:title', (req, res) => {
   
    const title= req.params.title
   
    const userData = req.body
    
    const existUsers = getUserData()
    const updateUser = existUsers.filter( user => user.title !== title )
    updateUser.push(userData)
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})


//deleting a todo
app.delete('/user/delete/:id', (req, res) => {
    const id= req.params.id
    const existUsers = getUserData()
   
    const filterUser = existUsers.filter( user => user.id !== id )
    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }
 
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
    
})

//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}
//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)    
}
//connecting the server
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})  