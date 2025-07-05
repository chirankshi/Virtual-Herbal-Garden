const mongoose = require('mongoose');


const { Schema } = mongoose;

// ------------ Blog Schema ------------
const BlogSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, default: 'Unknown' },
  date: { type: String, required: true },
  tags: { type: [String], default: [] },
  thumbnail: { type: String, default: '' },
  mainImage: { type: String, default: '' },
  excerpt: { type: String, default: '' },
  readTime: { type: String, default: '' },
  description: { type: String, default: '' },
  plantsMentioned: { type: [String], default: [] },
  usageTips: { type: String, default: '' }
}, { collection: 'Blogs', timestamps: true });

const Blogs = mongoose.model('Blog', BlogSchema);

// ------------ Home Remedy Schema ------------
const HomeRemedySchema = new Schema({ ...BlogSchema.obj }, { collection: 'HomeRemedies', timestamps: true });
const HomeRemedy = mongoose.model('HomeRemedy', HomeRemedySchema);

// ------------ Quiz Schema ------------
const QuizSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true }
}, { collection: 'Quiz', timestamps: true });

const Quiz = mongoose.model('Quiz', QuizSchema);

// ------------ Plant Schema ------------
const PlantSchema = new Schema({
  commonName: { type: String, required: true },
  botanicalName: { type: String, required: true },
  sanskritName: { type: String, required: true },
  plantSize: String,
  nativeRegion: String,
  preferredClimate: String,
  requiredSunlight: String,
  requiredSoil: String,
  partsUsedInMedicine: { type: [String], default: [] },
  activeCompounds: { type: [String], default: [] },
  dosageForm: { type: [String], default: [] },
  sideEffects: String,
  ageGroup: String,
  image: String,
  modelname: String
});

const RosePlantSchema = new Schema({
  plant: { type: PlantSchema, required: true },
  quiz: { type: [QuizSchema], default: [] }
}, { collection: 'Plants', timestamps: true });

const Plants = mongoose.model('Plants', RosePlantSchema);

// ------------ Product & Collection Schema ------------
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image_link: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  products: { type: [ProductSchema], default: [] }
}, { collection: 'Products', timestamps: true });

const Collection = mongoose.model('Collection', CollectionSchema);

// ------------ Contact, Product, User ------------
const ContactSchema = new Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

const UserProductSchema = new Schema({
  type: String,
  fName: String,
  fTitle: String,
  fPrice: Number,
  fImage: String
}, { timestamps: true });

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String
}, { timestamps: true });

const quizResultSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  });
  const QuizResult = mongoose.model('quizresult', quizResultSchema);

  const RemedySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    ingredients: {
      type: [String],
      default: []
    },
    steps: {
      type: [String],
      default: []
    },
    video_link: {
      type: String,
      default: ''
    },
    image_link: {
      type: String,
      default: ''
    }
  });
  
  const DiseaseRemedySchema = new mongoose.Schema({
    disease: {
      type: String,
      required: true
    },
    remedies: {
      type: [RemedySchema],
      required: true
    }
  }, {
    collection: 'HomeRemedies', // Your MongoDB collection name
    timestamps: true            // Automatically adds createdAt and updatedAt
  });
const HomeRemedies = mongoose.model('DiseaseRemedy', DiseaseRemedySchema)
const Contact = mongoose.model('Contact', ContactSchema);
const Product = mongoose.model('Product', UserProductSchema);
const User = mongoose.model('User', UserSchema);

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'completed', 'canceled'] },
  address: { type: String, required: true },
  paymentMethod: { type: String, default: 'cash', enum: ['cash', 'card', 'upi'] }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);


// ------------ Export All Models ------------
module.exports = {
  Blogs,
  HomeRemedy,
  Quiz,
  Plants,
  Collection,
  Contact,
  Product,
  User,
  Order,
  QuizResult,
  HomeRemedies,
};
