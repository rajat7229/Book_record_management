const express = require("express");

const {users} = require("../data/users.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {                  //we could have used patch method also
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

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: "false",
            message:"User to be deleted was not found"
        });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success: true,
        data: users
    });

});

module.exports = router;  //default export //this line must be at the end