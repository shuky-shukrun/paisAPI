const mongoose = require('mongoose');


const LottoSchema = mongoose.Schema(
    {
        _id: {
            type: Number
        },
        url: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        winNumbers: {
            type: Array,
            required: true
        },
        strongNumber: {
            type: Number,
            required: true
        },
        firstPrizeReg: Number,
        firstPrizeDouble: Number,
        secondPrizeReg: Number,
        secondPrizeDouble: Number,
        sumGivenPrizes: Number,
        winTableReg: Object,
        winTableDouble: Object
    }, { 
        collection : 'lotto' 
    }
);

module.exports = mongoose.model('Lotto', LottoSchema);