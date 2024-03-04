const router = require('express').Router();
const {sellSingleTicket, sellBukkTicket, findAll, findById, findByUsername, updateById, updateByUsername, deleteById, deleteByUsername, drawWinners} = require('./controllers');


router.route('/t/:id').get(findById).put(updateById).delete(deleteById);

router.route('/u/:username').get(findByUsername).put(updateByUsername).delete(deleteByUsername);

router.post('/bulk', sellSingleTicket);
router.get('draw', drawWinners);

router.route('/').get(findAll).post(sellBukkTicket);

module.exports = router;