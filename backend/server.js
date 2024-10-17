// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);
const bodyParser = require('body-parser');
const app = express();
app.use(cors());


const connectDb = require('./database')
connectDb();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
const Order = require('./models/orderModel')


const endpointSecret = "whsec_af8e21520e62ec15df0404afb5785fb0c99d96b827bea145eca03c4963bafdee";

app.post('/api/v1/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  console.log('called for webhook')
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }


  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

   
      await Order.findOneAndUpdate(
        {'paymentInfo.id': session.id},
        {'paymentInfo.status': 'succeeded', 'orderStatus': 'completed'}
      );

      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
console.log('successfully webhook')
  res.json({received: true});
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const cartRouter = require('./routes/cartRoutes')
const shippingRouter = require('./routes/shippingRoutes')
const orderRouter = require('./routes/orderRoutes');
// const session = require('express-session');
app.use('/api/v1/products/',productRouter);
app.use('/api/v1/users/',userRouter);
app.use('/api/v1/cart/',cartRouter);
app.use('/api/v1/shipping/',shippingRouter);
app.use('/api/v1/order/',orderRouter);


app.post('/api/v1/pay',async(req,res)=>{
    if(!req.session || !req.session.user) return res.json({status:'false',message:'login please'});
    const userId = req.session.user.userId;
    const {products,shippingAddress} = req.body;
    // console.log(products)
    try{
        const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
            //    images:[product.imageUrl]
            },
            unit_amount:Math.round(product.price*100),
        },
        quantity:Number(product.quantity)
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url:'http://localhost:5173/ordersuccess',
        cancel_url: 'http://localhost:5173/ordercancel',
    })
  //   await stripe.checkout.sessions.update(session.id, {
  //     success_url: `http://localhost:5173/orderresponse?reference_id=${session.id}`
  // });

    //saving order
    const order = new Order({
        shippingAddress,
        userId,
        orderItems:products.map(pro=>({
           name: pro.name,
           price: pro.price,
           quantity: pro.quantity,
           image: pro.imageUrl,
           productId:pro._id
        })),
        paymentInfo:{
            id:session.id,
            status:"pending"
        },
        itemsPrice:products.reduce((acc,product)=>acc+product.price*product.quantity,0),
        taxPrice:0,
        shippingPrice:0,
        totalPrice:products.reduce((acc,product)=>acc+product.price*product.quantity,0),
        orderStatus:'processing',
        })
        await order.save();

    res.json({id:session.id});
}catch(err){
    res.json({success:false});
}
})


app.get('/abc',(req,res)=>{
    res.json({success:true});
})


app.listen(3000,()=>{
    console.log('server started');
})


