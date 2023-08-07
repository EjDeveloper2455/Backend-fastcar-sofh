import twilio from 'twilio';

// Configura tus credenciales de Twilio
const accountSid = 'AC07ce4d911a8eb513ba48c9e4263ec6f5';
const authToken = '2537be7573bafe5038665925d519a5ee';
const twilioNumber = '+14708355733'; // Debe ser un número proporcionado por Twilio

// Crea un cliente de Twilio con tus credenciales
const client = twilio(accountSid, authToken);

const sendSms = async(req,res) =>{
    try {
        const {destinatario,mensaje} = req.body;
        client.messages.create({
            body: mensaje,
            from: twilioNumber,
            to: destinatario
          })
          .then(message =>res.send("Mensaje enviado con SID: "+message.sid))
          .catch(error => res.send('Error al enviar el mensaje: '+error));
        ;
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    sendSms
}

