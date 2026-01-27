const Message = require('../model/messeage.model');
const { sendEmail } = require('../service/email.service');

// SEND / CREATE MESSAGE
exports.createMessage = async (req,res,next) => {
  try {
    const { name, email, message } = req.body;

    // 1️⃣ Save to MongoDB
    const newMessage = await Message.create({ name, email, message });

    // 2️⃣ Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const emailText = `
New message from ${name} (${email})
Message: ${message}
`;
    await sendEmail(adminEmail, "A message from portfolio", emailText);

    res.status(201).json({ success:true, data: newMessage });

  } catch(err){
    next(err);
  }
};

// GET ALL MESSAGES (Admin)
exports.getAllMessages = async (req,res,next) => {
  try{
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success:true, data: messages });
  }catch(err){
    next(err);
  }
}

// GET SINGLE MESSAGE
exports.getMessageById = async (req,res,next) => {
  try{
    const message = await Message.findById(req.params.id);
    if(!message) return res.status(404).json({ success:false, message:'Message not found' });
    res.json({ success:true, data: message });
  }catch(err){
    next(err);
  }
}


// UPDATE MESSAGE (Backend Controller)
exports.updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    // সরাসরি ডাটাবেসে status ফিল্ড 'read' করে দিচ্ছি
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { $set: { status: 'read' } }, 
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, data: updatedMessage });
  } catch (err) {
    next(err);
  }
};
// DELETE MESSAGE
exports.deleteMessage = async (req,res,next) => {
  try{
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success:true, message:'Message deleted' });
  }catch(err){
    next(err);
  }
}