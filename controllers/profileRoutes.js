const router = require("express").Router()
const withAuth = require("../utils/auth")
const { User, Labels } = require("../models/")


router.get("/", withAuth, async (req, res) => {
    try{
        const userData = await User.findOne({
            where: {
                userId: req.session.userId,
            }
        })
        console.log(userData, "TEST MESSAGE")
        const info = userData.map((user) => user.get({ plain: true }))
        
        res.render("profileView", {
            layout: "profile",
            info: info,
        })
    }catch (err){
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router
