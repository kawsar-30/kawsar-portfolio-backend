const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Register Admin (optional)
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch(err) { next(err); }
}

// Login Admin
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch(err) { next(err); }
}


exports.getAllAdmins = async (req, res, next) => {
  try {
    // সব ইউজারকে খুঁজে বের করবে কিন্তু সিকিউরিটির জন্য পাসওয়ার্ডটা বাদ দিবে (-password)
    const admins = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: admins
    });
  } catch (err) {
    next(err);
  }
}; 


exports.deleteAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Admin Deleted" });
  } catch (err) { next(err); }
};

// ৩. পাসওয়ার্ড রিসেট করা
exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword; // Model-এ pre-save hook থাকলে অটো হ্যাশ হবে
    await user.save();
    res.status(200).json({ success: true, message: "Password updated" });
  } catch (err) { next(err); }
};
