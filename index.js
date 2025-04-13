const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());

app.post('/enviarNotificacion', async (req, res) => {
  const { token, titulo, mensaje, chatId } = req.body;

  const payload = {
    data: {
      titulo: titulo,
      contenido: mensaje,
      chatId: chatId,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(payload);
    console.log('Notificación enviada:', response);
    res.status(200).send('Notificación enviada');
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    res.status(500).send('Error al enviar notificación');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
