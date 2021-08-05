const { body } = require('express-validator')
const validate = require('../middleware/validate')


exports.postOrderDetail = validate([
    body('order_details.original_total')
        .notEmpty()
        .isNumeric(),
    body('order_details.pay_total')
        .notEmpty()
        .isNumeric(),
    body('order_details.pay_way')
        .notEmpty().withMessage('請選擇付款方式'),
    body('order_details.deliver_way')
        .notEmpty().withMessage('請選擇付款方式'),
    body('order_details.city')
        .notEmpty().withMessage('不能為空')
        .trim(),
    body('order_details.postal')
        .notEmpty().withMessage('不能為空')
        .isNumeric(),
    body('order_details.address')
        .notEmpty().withMessage('請填寫地址')
        .trim(),
])