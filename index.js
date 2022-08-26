//importing express package
const express = require("express");
//importing data from users.json
const {users} = require("./data/users.json");

const app = express();

const PORT = 7229;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

app.get("/users/:id", (req, res) => {
    const {id} = req.params
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: user
    });
});

app.post("/users", (req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(401).json({
            success: "false",
            message: "User exists with this id"
        });
    }

    users.push({                //as key value and variable name are same we can write this way
        id,                     //otherwise id: id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        data: users
    });
});

app.put("/users/:id", (req, res) => {                  //we could have used patch method also
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id === id);

    if (!user){
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
}
    const updatedUser = users.map((each) => {
        if(each.id === id){
            return {
                ...each,    //...for destructuring
                ...data     //sequence of each and data matters, whatever is on top got updated by botom one
            };
        }
        return each;
    });

    return res.status(201).json({
        success: true,
        data: updatedUser
    });
});

app.get('*', (req, res) => {
    res.status(404).json({
        message: "This route does not exist"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});