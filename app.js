import express from "express";
import router from "./routes/product.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));

app.use('/product', router);



app.listen(port, () => {
    console.log(`App Start Listening at PORT ${port}`);
});