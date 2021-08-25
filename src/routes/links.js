const { Router } = require('express');
const router = Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')


//LIST ALL LINKS
router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});


//ADD LINKS
router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

//SAVE LINKS
router.post('/add', isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };

    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully!');
    res.redirect('/links');
});


//EDIT LINKS
router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('links/edit', { links });
});


//EDIT SAVE
router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = { title, url, description };
    await pool.query('UPDATE links set ? WHERE ID = ?', [newLink, id]);
    res.redirect('/links');
})


//DELETE LINKS
router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
})


module.exports = router;