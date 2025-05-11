// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const app = express();
const JWT_SECRET = 'yourSecretKey'; 

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(helmet());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/claims_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Generate unique Claim ID
const generateClaimNumber = () => {
  const timestamp = Date.now().toString().slice(-5);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `CLM${timestamp}${randomDigits}`;
};

// Claim Schema
const claimSchema = new mongoose.Schema({
  patientName: String,
  fatherName: String,
  policyNo: String,
  beneId: String,
  provider: String,
  inscClaimAmtReimbursed: Number,
  attendingPhysician: String,
  otherPhysician: String,
  admissionDt: String,
  dischargeDt: String,
  doctorName: String,
  deductibleAmtPaid: Number,
  hospitalUsername: String,
   Cause:String,
   hospitalName:String,
  claimId: {
    type: String,
    required: true,
    unique: true,
    default: () => generateClaimNumber(),
  },
  submissionDate: { type: Date, default: Date.now },
  prescriptionImage: { type: String, required: true },
  billImage: { type: String, required: true },
  admissionSlipImage: { type: String, required: true },
  dischargeSlipImage: { type: String, required: true },
  

});

claimSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  let attempts = 0;
  while (attempts < 5) {
    try {
      if (!this.claimId) {
        this.claimId = generateClaimNumber();
      }
      const exists = await mongoose.model('Claim').exists({ claimId: this.claimId });
      if (!exists) return next();
      this.claimId = generateClaimNumber();
      attempts++;
    } catch (err) {
      return next(err);
    }
  }
  next(new Error('Failed to generate unique claim ID after 5 attempts'));
});

const Claim = mongoose.model('Claim', claimSchema);


// User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  policyNo: { type: String, required: true, unique: true },
  cnic: { type: String, required: true, unique: true },
  phone: String,
  email: String,
  beneficiaryId: { type: String, required: true, unique: true },
  address: String,
  city: String,
  postalCode: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'hospital'], default: 'user' },
  registrationDate: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

// Auth Middleware
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
        policyNo: decoded.policyNo,
        username: decoded.username // Extract username from token
      };
      next();
    });
  };
};

// Auth Routes
app.post('/register-user', async (req, res) => {
  try {
    const { policyNo, cnic, beneficiaryId, username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ policyNo }, { cnic }, { beneficiaryId }, { username }]
    });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User already exists' });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during registration' });
  }
});
// Get all users
app.get('/get-users', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().sort({ registrationDate: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error retrieving users' });
  }
});

// Update user
app.put('/update-user/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const updatedUser  = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser ) return res.status(404).json({ success: false, error: 'User  not found' });
    res.status(200).json({ success: true, updatedUser  });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error updating user' });
  }
});

// Delete user
app.delete('/delete-user/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const deletedUser  = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser ) return res.status(404).json({ success: false, error: 'User  not found' });
    res.status(200).json({ success: true, message: 'User  deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error deleting user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ 
      userId: user._id, 
      role: user.role, 
      policyNo: user.policyNo,
      username: user.username // Include username in the token
    }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      success: true,
      token,
      role: user.role,
      username: user.username,
      policyNo: user.policyNo
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
});

// Claim Routes
app.post('/submit-claim', authMiddleware(['user', 'hospital']), async (req, res) => {
  try {
    const newClaim = new Claim({
      ...req.body,
      claimId: generateClaimNumber(),
      hospitalUsername: req.body.hospitalUsername 
    });
    await newClaim.save();
    res.status(201).json({ success: true, claimId: newClaim.claimId });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during claim submission' });
  }
});

app.get('/get-claims', authMiddleware(['admin']), async (req, res) => {
  try {
    const claims = await Claim.find().sort({ submissionDate: -1 });
    res.status(200).json({ success: true, claims });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error retrieving claims' });
  }
});
app.get('/get-my-claims', authMiddleware(['user']), async (req, res) => {
  try {
    const userClaims = await Claim.find({ policyNo: req.user.policyNo }).sort({ submissionDate: -1 });
    res.status(200).json({ success: true, claims: userClaims });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error retrieving your claims' });
  }
});

app.post('/get-claim-by-details', authMiddleware(['user']), async (req, res) => {
  const { claimId, policyNo } = req.body;
  if (req.user.role === 'user' && req.user.policyNo !== policyNo) {
    return res.status(403).json({ error: 'Unauthorized access to another user\'s claim' });
  }
  try {
    const claim = await Claim.findOne({ claimId, policyNo });
    if (!claim) return res.status(404).json({ error: 'Claim not found' });
    res.status(200).json({ success: true, claim });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error retrieving claim' });
  }
});

app.put('/update-claim/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedClaim) return res.status(404).json({ success: false, error: 'Claim not found' });
    res.status(200).json({ success: true, updatedClaim });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error updating claim' });
  }
});

app.post('/delete-claim', async (req, res) => {
  try {
    const { claimId, policyNo } = req.body;
    const deletedClaim = await Claim.findOneAndDelete({ claimId, policyNo });
    if (!deletedClaim) return res.status(404).json({ success: false, error: 'Claim not found' });
    res.status(200).json({ success: true, message: 'Claim deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error deleting claim' });
  }
});

// Check Policy
app.get('/check-policy/:policyNo', async (req, res) => {
  try {
    const user = await User.findOne({ policyNo: req.params.policyNo });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Claim Prediction Schema & Fraud Check
const fullPredictionSchema = new mongoose.Schema({
  claimId: { type: String, required: true },
  claimData: { type: Object, required: true },
  prediction: { type: String, required: true },
  probability: { type: Number, required: true },
  checkedAt: { type: Date, default: Date.now }
});

const FullClaimPrediction = mongoose.model('FullClaimPrediction', fullPredictionSchema);

app.post('/check-fraud', async (req, res) => {
  try {
    const { features,claimId } = req.body;
    const response = await axios.post('http://172.29.176.1:5001/predict', { features });
    const { prediction, probability } = response.data;
    await FullClaimPrediction.create({ claimId,claimData: features, prediction, probability });
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: 'Error checking fraud' });
  }
});
// server.js - Add these new route
app.get('/get-fraud-results', authMiddleware(['admin']), async (req, res) => {
  try {
    const results = await FullClaimPrediction.find().sort({ checkedAt: -1 });
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching fraud results' });
  }
});

app.get('/get-claim-status', authMiddleware(['user']), async (req, res) => {
  try {
    const policyNo = req.user.policyNo;
    const claims = await Claim.find({ policyNo }).sort({ submissionDate: -1 });
    const claimIds = claims.map(c => c.claimId);
    const predictions = await FullClaimPrediction.find({ claimId: { $in: claimIds } });

   
    const claimsWithStatus = claims.map(claim => {
      const prediction = predictions.find(p => p.claimId === claim.claimId);
      return {
        ...claim.toObject(),
        prediction: prediction?.prediction,
        probability: prediction?.probability,
        checkedAt: prediction?.checkedAt
      };
    });

    res.status(200).json({ success: true, claims: claimsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching claim status' });
  }
});
app.get('/get-hospital-claims', authMiddleware(['hospital']), async (req, res) => {
  try {
    const hospitalUsername = req.user.username;

    const claims = await Claim.find({ hospitalUsername }).sort({ submissionDate: -1 });
    const claimIds = claims.map(c => c.claimId);
    const predictions = await FullClaimPrediction.find({ claimId: { $in: claimIds } });
    console.log(`Fetching claims for hospital user: ${hospitalUsername}`);

    const claimsWithStatus = claims.map(claim => {
      const prediction = predictions.find(p => p.claimId === claim.claimId);
      return {
        ...claim.toObject(),
        prediction: prediction?.prediction,
        probability: prediction?.probability,
        checkedAt: prediction?.checkedAt
      };
    });

    res.status(200).json({ success: true, claims: claimsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching hospital claim status' });
  }
});

const recommendationSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now }
});
const Recommendation = mongoose.model('Recommendation', recommendationSchema);
app.post('/broadcast-recommendation', authMiddleware(['admin']), async (req, res) => {
  try {
    const { title, body } = req.body;
    await Recommendation.create({ title, body });
    res.status(201).json({ success: true, message: 'Recommendation broadcasted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error broadcasting recommendation' });
  }
});
app.get('/recommendations', authMiddleware(['user']), async (req, res) => {
  try {
    const recommendations = await Recommendation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error retrieving recommendations' });
  }
});
const policyUpdateSchema = new mongoose.Schema({
  policyNo: { type: String, required: true },
  updateDetails: String,
  createdAt: { type: Date, default: Date.now }
});
const PolicyUpdate = mongoose.model('PolicyUpdate', policyUpdateSchema);
app.post('/update-policy', authMiddleware(['admin']), async (req, res) => {
  try {
    const { policyNo, updateDetails } = req.body;
    const user = await User.findOne({ policyNo });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    await PolicyUpdate.create({ policyNo, updateDetails });
    res.status(201).json({ success: true, message: 'Policy update sent to user' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error sending policy update' });
  }
});
app.get('/get-my-policy-updates', authMiddleware(['user']), async (req, res) => {
  try {
    const updates = await PolicyUpdate.find({ policyNo: req.user.policyNo }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, updates });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching policy updates' });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
