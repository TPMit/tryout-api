"use strict"

class BankTransfer {
  constructor(jumlah, codeBayar, idMurid) {
    this.jumlah = jumlah;
    this.codeBayar = codeBayar;
    this.id_murid = idMurid;
  }

  baseBody(){
    let gross_amount = 0;
    gross_amount = this.jumlah;
    order_id = this.codeBayar;
    id_murid = this.id_murid;

    let body = {
      payment_type : "bank_transfer",
      transaction_details : {
        gross_amount,
        order_id,
      },
      item_details: this.id_murid,
    }

    return body;
    }
    bca(){
      let base = this.baseBody();
      let myBody = {
        payment_type: base.payment_type,
        transaction_details: base.transaction_details,
        item_details: base.item_details,
        bank_transfer: {
          bank: "bca",
          va_number: "12345678911",
          free_text: {
            inquiry: [
              {
                id: "text indonesia",
                en: "tex english",
              }
            ],
            payment: [
              {
                id: "Pembayaran tryout",
                en: "Tryout payment",
              }
            ]
          }
        }
      }

      return myBody;
    }

    bni(){
      let base = this.baseBody();
      let myBody = {
        payment_type: base.payment_type,
        transaction_details: base.transaction_details,
        item_details: base.item_details,
        bank_transfer: {
          bank: "bni",
          va_number: "12345678",
        }
      }

      return myBody;
    }

    permata(){
      let base = this.baseBody();
      let myBody = {
        payment_type: base.payment_type,
        transaction_details: base.transaction_details,
        item_details: base.item_details,
        bank_transfer: {
          bank: "bca",
          va_number: "1234567890",
        }
      }

      return myBody;
    }
}
module.exports = BankTransfer;
