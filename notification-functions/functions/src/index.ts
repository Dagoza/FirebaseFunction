import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();
app.use(cors());
admin.initializeApp();

app.post('/', async (req, res) => {
    let token = req.body.token;
    try {
        let response = await admin.messaging().send({
            notification: {
                title: "Notificacion por backend",
                body: ''
            },
            token, //:token
            data:{
                informacion: "adicional"
            }
        })

        return res.json(response)
    } catch (error) {
        return res.json(error).status(500);
    }

});

exports.notification = functions.https.onRequest(app);


// Firebase tools global para manejar firbase del pc
// ->firebase login
// firebase init functions

// acceder sería notification/

//firebase deploy --only functions