const mercadopago2 = require("mercadopago");
const userServices = require('../services/UserServices')
const ServicesUser = new userServices();
const path = require("path");
const mercadopago = require('../services/mercadopago')
const UserController = require('../controller/usersController')
const jwt = require('jsonwebtoken')

class PixController {
  
  static userId = null;
  static lastPaymentId = null;
  static creditos = null;


  static async verificarStatusPagamento(paymentId) {
    try {
      const data = await mercadopago2.payment.findById(paymentId);
      const status = data["response"]["status"];
      console.log("Status do pagamento:", status);
      if (status === "approved") {
        console.log("O pagamento foi aprovado. Parando a verificação.");
        const dados = { creditos: PixController.creditos };
        const teste = await ServicesUser.updateCreditos(dados, PixController.userId);
        PixController.lastPaymentId = null;
      } else {
        console.log("O pagamento ainda não foi aprovado. Continuando a verificação.");
        setTimeout(() => {
          PixController.verificarStatusPagamento(paymentId);
        }, 5000);
      }
    } catch (error) {
      console.log("Ocorreu um erro ao verificar o status do pagamento:", error);
    }
  }
  

  static async gerarQrCod(req, res) {
    const  valor  = req.body.valor;

    var payment_data = {
      transaction_amount: parseFloat(valor),
      description: "Pagamento via API",
      payment_method_id: "pix",
      payer: {
        email: "danielmenezesdev2512@gmail.com",
        first_name: "Daniel",
        last_name: "Menezes De Jesus",
        identification: {
          type: "CPF",
          number: "06428714507",
        },
        address: {
          zip_code: "76200000",
          street_name: "Rua mauá Q8 Lt29",
          street_number: "0",
          neighborhood: "Aguas Claras",
          city: "Iporá",
          federal_unit: "GO",
        },
      },
    };
    let paymentId;
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.substring(7);
    const decoded = jwt.verify(token, 'teste');
    PixController.userId = decoded.id;
    PixController.creditos = valor
    mercadopago2.payment
      .create(payment_data)
      .then(function (data) {
        paymentId = data["response"]["id"];
        PixController.lastPaymentId = paymentId;
        console.log("ID do pagamento:", paymentId);
        PixController.verificarStatusPagamento(paymentId);

        const qrCodeBase64 =
          data["response"]["point_of_interaction"]["transaction_data"][
            "qr_code_base64"
          ];
        res.render("index", { paymentId: paymentId, qrCodeBase64: qrCodeBase64 });
        
      })
      .catch(function (error) {
        console.log("Erro ao gerar o Pix:", error);
        return res.status(500).json({ error: "Erro ao gerar o Pix." });
      });
  }


  static verificarstatuspix(req ,res){
    const { id } = req.params;
    mercadopago2.payment
      .findById(id)
      .then(function (data) {
        // console.log(data["response"]);
        return res.json({
          id: data["response"]["id"],
          qr_code_base64:
            data["response"]["point_of_interaction"]["transaction_data"][
              "qr_code_base64"
            ],
          status: data["response"]["status"],
          transaction_amount: data["response"]["transaction_amount"],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static visualizarQrCod(req, res) {
    res.render("index", { paymentId: PixController.lastPaymentId }); // Passa o último ID do Pix para o arquivo EJS
  }

}
module.exports = PixController;
