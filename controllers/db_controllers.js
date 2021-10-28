var uniqueid = require("uuid");
const valid = require("credit-card-type");
var shortID = require("shortid");
const jwt = require("jsonwebtoken");

var db = require("../database_configs/database_helper");
const creditCardType = require("credit-card-type");
class Database_Controller {
  constructor() {
    this.evouchers = [];
  }

  getEvouchers(req, res) {
    return new Promise(async (resolve, reject) => {
      var ph = req.params.phone_no;

      var sql =
        "SELECT * FROM evoucher WHERE phone_no IN (SELECT phone_no from evoucher WHERE phone_no = ?  GROUP BY phone_no  HAVING COUNT(*) > 0 );";
      try {
        var result = await db.query(sql, ph);
        this.evouchers.push(result);
        resolve(result);
        console.log("LENGTH " + this.evouchers.length);
        return this.evouchers, (this.evouchers = []);
      } catch (err) {
        console.log("err in getVouchers : ", err);
      }
    });
  }

  createVouchers(req, res) {
    return new Promise(async (resolve, reject) => {
      const {
        description,
        expiry_date,
        image,
        quantity,
        buytype,
        phone_no,
        cardNo,
        amount,
      } = req.body;

      var uuid = uniqueid.v4();
      var promoCode = shortID.generate();
      var data = this.creditCardsValidation(cardNo);

      if (data.voucher_status != "InActive") {
        var sql =
          "INSERT INTO evoucher(title,description,expiry_date,image,payment_method,chosen_payment,quantity,buytype,phone_no,voucher_status,promo_code,use_status,amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
          var result = await db.query(sql, [
            uuid,
            description,
            expiry_date,
            image,
            data.cardType,
            data.cardType,
            quantity,
            buytype,
            phone_no,
            data.voucher_status,
            promoCode,
            "not_used",
            amount,
          ]);
          var json = {
            title: uuid,
            description: description,
            expiry_date: expiry_date,
            image: image,
            payment_method: "Visa",
            chosen_payment: "Visa",
            quantity: quantity,
            buytype: buytype,
            voucher_status: data.voucher_status,
            use_status: "not_used",
            amount: amount,
          };
          if (result.affectedRows > 0) {
            res.status(200).send(json);
            resolve(result);
          } else {
            res.status(409).send("Fail evoucher creation.");
            reject(err);
          }
        } catch (err) {
          console.log("Err in createVoucher : ", err);
        }
      } else {
        res.send("Sorry, your evoucher is InActive");
      }
    });
  }

  editEvoucher(req, res) {
    return new Promise(async (resolve, reject) => {
      const {
        description,
        expiry_date,
        payment_method,
        chosen_payment,
        quantity,
        buytype,
        phone_no,
        voucher_status,
        title,
      } = req.body;
      var sql =
        "UPDATE evoucher SET description = ? ,expiry_date=?,payment_method=?,chosen_payment=?,quantity=?,buytype=?,phone_no=?,voucher_status=? WHERE title =?";
      try {
        var result = await db.query(sql, [
          description,
          expiry_date,
          payment_method,
          chosen_payment,
          quantity,
          buytype,
          phone_no,
          voucher_status,
          title,
        ]);

        if (result.affectedRows > 0) {
          res.status(200).send("Success edit evoucher.");
          resolve(result);
        } else {
          res.status(409).send("Fail edit evoucher.");
        }
      } catch (err) {
        console.log("Err in editEvoucher : ", err);
      }
    });
  }

  creditCardsValidation(cardNo) {
    var card = cardNo.toString();

    var cardType = creditCardType(card);
    for (var i = 0; i < cardType.length; i++) {
      if (cardType[i].niceType == "Visa") {
        var arr = {
          voucher_status: "Active",
          cardType: cardType[i].niceType,
        };
        return arr;
      }
    }
  }

  purchaseItems(req, res) {
    return new Promise(async (resolve, reject) => {
      const {
        promo_code,
        expiry_date,
        payment_method,
        chosen_payment,
        price,
        phone_no,
        title,
      } = req.body;
      var discountPrice = 0;

      var sql =
        "SELECT expiry_date,voucher_status,promo_code,use_status,amount FROM evoucher WHERE phone_no=? AND title=?";
      try {
        var result = await db.query(sql, [phone_no, title]);
        var data = result[0];

        var calculatePrice = 0;
        if (payment_method && chosen_payment == "Visa") {
          var discountPrice = price * 0.1;
          var finalPrice = price - discountPrice;
          calculatePrice = data.amount - finalPrice;
        } else {
          calculatePrice = data.amount - price;
        }

        console.log(
          "DATA ",
          data.expiry_date,
          expiry_date,
          data.promo_code,
          promo_code,
          data.use_status,
          data.amount
        );
        if (
          data.promo_code == promo_code &&
          data.use_status == "not_used" &&
          calculatePrice >= 0
        ) {
          var updateVoucher =
            "UPDATE evoucher SET amount=? WHERE phone_no=? AND title=?";
          var result = await db.query(updateVoucher, [
            calculatePrice,
            phone_no,
            title,
          ]);
          if (result.affectedRows > 0) {
            //console.log("SUCCESS UPDATE");
            resolve(result);
            res.send("Success Update evoucher.");
          }
        }
      } catch (err) {
        console.log("Err in purchaseItems : ", err);
      }
    });
  }
}
module.exports = Database_Controller;
