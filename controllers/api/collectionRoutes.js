const router = require('express').Router();
const { Collection } = require('../../models');

router.post("/", async (req, res) => {
    try {
        const collectionToAdd = await Collection.create(
            {
                name: req.body.dataName,
                set_img_url: req.body.dataImg,
                set_num: req.body.dataNum
            }
        )
        console.log(req.body)
        res.status(200).json(collectionToAdd)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router;