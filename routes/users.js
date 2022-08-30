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

    if (user.issuedBook) {

        const getDateInDays = (data = "") => {
            let date;
            if (data === "") {
                date = new Date();
            } else {
                date = new Date(data);
            }
            let days = Math.floor(date / (1000 * 60 * 60 * 24)); //1000 is for milliseconds
            return days;
        };

        const subscriptionType = (date) => {
            if (user.subscriptionType === "Basic"){
                date = date + 90;
            } else if (user.subscriptionType === "Standard"){
                date = date + 180;
            } else if (user.subscriptionType === "Premium"){
                date = date + 365;
            }
    
            return date;
        };

        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);


        const data = {
            ...user,
            fine: returnDate < currentDate ? 
            subscriptionExpiration <= currentDate 
            ? 200
            :100
            :0
        }

        return res.status(201).json({
            Success: false,
            Message: "User can't be deleted until user have issued books and fine",
            Data: data
        });
    } else {
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success: true,
        data: users
    });
}

});

router.get("/subscription-details/:id", (req, res) => {
    const {id} = req.params;

    const user = users.find((each) => each.id === id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if(data === "") {
            // current date
            date = new Date();
        }
        else{
            //date on basis of data variable
            date = new Date(data);
        }

        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic"){
            date = date + 90;
        } else if (user.subscriptionType === "Standard"){
            date = date + 180;
        } else if (user.subscriptionType === "Premium"){
            date = date + 365;
        }

        return date;
    };

    // Subscription expiration calculation
    // January 1, 1970, UTC. // milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: 
            subscriptionExpiration <= currentDate ? 0 
            : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate ? 
            subscriptionExpiration <= currentDate 
            ? 200
            :100
            :0
    };

    res.status(200).json({
        success: true,
        data
    })
});

module.exports = router;  //default export //this line must be at the end