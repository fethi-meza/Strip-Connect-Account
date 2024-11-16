const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const accountRouter = require('./routes/accountRouter');
const paymentRouter = require('./routes/paymentRouter');
const stripeWebhook = require('./src/webhooks/stripeWebhook');

const app = express();

app.use(bodyParser.json());


app.use('/api/users', userRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/payments', paymentRouter);


app.use('/webhook', stripeWebhook);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
