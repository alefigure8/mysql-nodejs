const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', { layout: false });
})

module.exports = router;