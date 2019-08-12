const Logger = require("cute-logger")
const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  firmName: {
    type: String,
    required: false
  },
  stateBar: {
    type: Number,
    required: false
  },
  officePhone: {
    type: String,
    required: false
  },
  mobilePhone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  mailingAddress: [
    {
      streetAddrOne: {
        type: String,
        required: false
      },
      streetAddrTwo: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      state: {
        type: String,
        required: false
      },
      zip: {
        type: String,
        required: false
      },
      required:false
    }
  ],
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  policy: {
    type: Boolean,
    required: true
  },
  insurancePolicy:{
    type: Number,
    required: false
  },
  termsConditions: {
    type: Boolean,
    required: false
  },
  isSeeker: {
    type:Boolean,
    default: false
  },
  isAttorney: {
    type: Boolean,
    default: false
  },
  reviewTotal: {
    type: Number,
    default: 0
  },
  reviews: [
   {
      attorneyId: {
        type: String,
        required: false,
        default: ''
      },
      appearanceId: {
        type: String,
        required: false,
        default: ''
      },
      comment: {
        type: String,
        required: false,
        default: ''
      },
      rating: {
        type: String,
        required: false,
        default: 0
      }
   }
  ],
  isVerified: {
    type: Boolean,
    default: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  onHold:{
    type: Boolean,
    default: false
  },
  status:{
    type: String,
    default: "OK"
  },
  cards: [
    {
      id: {
        type: String,
        required: false
      },
      last4: {
        type: String,
        required: false
      },
      brand: {
        type: String,
        required: false
      }
    }
  ],
  stripe_user_id: {
    type: String,
    required: false
  },
  stripe_customer_id: {
    type: String,
    required: false
  },
  transactions: [{
    date: {
      type: Date,
      required: false,
      default: new Date(),
    },
    amount: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false 
    }
  }],
  notifications:[{
    type: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      default: false
    }
  }
  ]
  
},{
    collection: 'users', timestamps: true
});

// hash user password before saving into database
users.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  Logger.log("MODEL: Hasing password")
  next();
});
module.exports = mongoose.model('users', users);
