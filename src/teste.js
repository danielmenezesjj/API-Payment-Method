const express = require("express");
const port = 3004;
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

app.use(express.json());
app.use(cors());
app.listen(3004, () => console.log("Servidor iniciado na porta 3004"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mercadopago.configurations.setAccessToken(
  "APP_USR-1663945377140952-061615-6b77bcea722f8cf2db76d06e081ea145-659099715"
); //TOKEN DO MERCADO PAGO
let lastPaymentId = null;

function verificarStatusPagamento(paymentId) {
  mercadopago.payment
    .findById(paymentId)
    .then(function (data) {
      const status = data["response"]["status"];

      console.log("Status do pagamento:", status);

      if (status === "approved") {
        console.log("O pagamento foi aprovado. Parando a verificação.");
        lastPaymentId = null;
      } else {
        console.log(
          "O pagamento ainda não foi aprovado. Continuando a verificação."
        );
        setTimeout(() => {
          verificarStatusPagamento(paymentId); // essa função fica verificando durante 5sec o status do pagamento
        }, 5000);
      }
    })
    .catch(function (error) {
      console.log("Ocorreu um erro ao verificar o status do pagamento:", error);
    });
}




app.get("/gerarpix/:valor", (req, res) => {
  const { valor } = req.params;

  var payment_data = {
    transaction_amount: parseFloat(valor),
    description: "Descrição",
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

  mercadopago.payment
    .create(payment_data)
    .then(function (data) {
      paymentId = data["response"]["id"];
      lastPaymentId = paymentId;
      console.log("ID do pagamento:", paymentId);
      verificarStatusPagamento(paymentId);

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
});
app.get("/verificarstatuspix/:id", (req, res) => {
  const { id } = req.params;

  mercadopago.payment
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
});

app.get("/index", (req, res) => {
  res.render("index", { paymentId: lastPaymentId }); // Passa o último ID do Pix para o arquivo EJS
});
