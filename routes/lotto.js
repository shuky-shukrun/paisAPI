const express = require('express');
const router = express.Router();
const Lotto = require('../models/Lotto');

// HANDLE /lotto GET REQUESTS

/**
 * @swagger
 * /lotto:
 *   get:
 *      summary: "Get all the lotteries result"
 *      description: Use to request all lotteries result. DO NOT USE 'Try it out' button since the result is TOO BIG
 *      responses:
 *          '200':
 *              description: A successful response
 */
router.get('/', async (req, res) => {
    try {
        const savedLotto = await Lotto.find().sort({_id: 1});
        res.status(200).json(savedLotto);        
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

/**
 * @swagger
 * /lotto/recent:
 *  get:
 *    summary: "Get the most recent lottery"
 *    description:  Use to request the most recent lottery result
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/recent', async (req, res) => {
    try {
        console.log("recent");
        let lastLotteryInDB = await Lotto.find().sort({_id:-1}).limit(1);
        lastLotteryInDB = lastLotteryInDB[0];
        res.status(200).json(lastLotteryInDB);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

/**
 * @swagger
 * /lotto/{lotteryNum}:
 *  get:
 *    summary: "Get lottery by lottery number"
 *    description:  Use to request specific lottery result
 *    parameters:
 *    - name: "lotteryNum"
 *      in: "path"
 *      description: "Lottery number start from 2013"
 *      required: true
 *      type: "integer"
 *      format: "int32"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:lotteryNum', async (req, res) => {
    try {
        const lotteryNum = parseInt(req.params.lotteryNum);
        const result = await Lotto.findById(lotteryNum);
        if(result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'No lottery has been found.' });
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
});


/**
 * @swagger
 * /lotto/byID/{from}/{to}:
 *  get:
 *    summary: "Get range of lotteries by lotteries number"
 *    description:  Use to request range of lotteries. Set 'from' greater than 'to' for decreasing result
 *    parameters:
 *    - name: "from"
 *      in: "path"
 *      description: "first required lottery (included)"
 *      required: true
 *      type: "integer"
 *      format: "int32"
 *    - name: "to"
 *      in: "path"
 *      description: "last required lottery (included)"
 *      required: true
 *      type: "integer"
 *      format: "int32"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/byID/:from/:to', async (req, res) => {
    try {
        let from = parseInt(req.params.from);
        let to = parseInt(req.params.to);
        let sortBy = 1;
        console.dir("from: " + from + " to: " + to);
        if(from > to) {
            let temp = from;
            from = to;
            console.log(temp);
            to = temp;
            sortBy = -1;
        }
        const result = await Lotto.find({ _id: {$gte: from, $lte: to}}).sort({_id: sortBy});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /lotto/byDates/{from}/{to}:
 *  get:
 *    summary: "Get range of lotteries by dates"
 *    description:  Use to request range of lotteries. Set 'from' greater than 'to' for decreasing result
 *    parameters:
 *    - name: "from"
 *      in: "path"
 *      description: "date in YYYY-MM-DD format (included)"
 *      required: true
 *      type: "string"
 *    - name: "to"
 *      in: "path"
 *      description: "date in YYYY-MM-DD format (included)"
 *      required: true
 *      type: "string"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/byDates/:from/:to', async (req, res) => {
    try {
        let from = req.params.from;
        from = from.split('-');
        let fromDate = new Date(from[0], from[1] - 1,from[2]);

        let to = req.params.to;
        to = to.split('-');
        let toDate = new Date(to[0], to[1] - 1,to[2]);

        let sortBy = 1;
        console.log("from: " + fromDate + " to: " + toDate);
        if(fromDate > toDate) {
            let temp = fromDate;
            fromDate = toDate;
            toDate = temp;
            sortBy = -1;
        }
        const result = await Lotto.find({ date: {$gte: fromDate, $lte: toDate}})
                                  .sort({_id: sortBy});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;