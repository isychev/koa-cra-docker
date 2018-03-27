const Koa = require('koa');
const mongoose = require('mongoose');

const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_NAME = process.env.DATABASE_NAME || 'mydb';
const NODE_PORT = process.env.NODE_PORT || 8080;

mongoose.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, err => {
  if (err) throw err;
  console.info('A successful connection to the database');
});

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    secName: String,
});

const User = mongoose.model('User', userSchema);

(async ()=>{
  const newUser = new User({
    name:'TempUser',
    secName: 'TempUser',
  });
  await newUser.save();
})();

const app = new Koa();

app.use(async ctx => {
  ctx.body = await User.find();
});

app.listen(NODE_PORT);
