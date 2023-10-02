const router = require("express").Router()
const withAuth = require("../utils/auth")
const { User, Labels } = require("../models/")



router.get("/", withAuth, async (req, res) => {
    try{
        const labelData = await Labels.findAll({
            where: {
                userId: req.session.userId,
            }
        })
        const labels = labelData.map((label) => label.get({plain: true}))
        res.render("profileView", {
            layout: "profile"
        })
    }catch (err){
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router
