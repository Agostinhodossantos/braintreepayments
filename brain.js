var braintree = require('braintree')
require('dotenv').config()

var gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.MERCHANT_ID,
    publicKey:    process.env.PUBLICKEY,
    privateKey:   process.env.PRIVATEKEY
  });



function genereteClientToken() {
   var token = gateway.clientToken.generate({
        customerId: 133
      }, (err, response) => {
        // pass clientToken to your front-end
        const clientToken = response.clientToken
        console.log(clientToken)
        return clientToken
    });

    return token
}


function createCustomer() {
   var create =   gateway.customer.create({
        firstName: "Charity",
        lastName: "Smith",
        paymentMethodNonce: 'nonce-from-the-client'
      }, (err, result) => {
        result.success;
        // true
      
        result.customer.id;
        // e.g 160923
      
        result.customer.paymentMethods[0].token;
        // e.g f28wm

        console.log(result)
        return result
      });

      return create
}

function createCard() {

    let creditCardParams = {
        customerId:630019718,
        number: '4311111111111111',
        expirationDate: '06/2022',
        cvv: '100'
      };
      
    var res =   gateway.creditCard.create(creditCardParams, (err, response) => {
          console.log(response)
          return response
      });

      return res

}

function makeTransaction(nonce) {
    gateway.transaction.sale({
        amount: '5.00',
        paymentMethodNonce: nonce,
        options: {
            submitForSettlement: true
        }
    }, function(err, result) {
        if(err) {
            console.log(err)
            return;
        }
    
        if(result.success) {
            console.log('Transaction ID: ' + result.transaction.id)
        } else {
            console.error(result.message);
        }
    })
    
}


module.exports = {
    makeTransaction, genereteClientToken, createCard,createCustomer
}