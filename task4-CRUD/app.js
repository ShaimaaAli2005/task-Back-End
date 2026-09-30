const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // لقراءة بيانات الـ JSON في الـ Request Body

// 1. الاتصال بقاعدة بيانات MongoDB (تأكدي من تغيير الرابط حسب قاعدة بياناتك)
mongoose.connect('mongodb://127.0.0.1:27017/user-task-db')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Connection error:', err));

// 2. تعريف الـ Schema والـ Model للمستخدمين (name, age, city)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ==========================================
// 1- POST: إضافة 5 مستخدمين دفعة واحدة
// ==========================================
app.post('/users', async (req, res) => {
  try {
    // req.body يجب أن يكون عبارة عن مصفوفة (Array) تحتوى على 5 مستخدمين
    const users = await User.insertMany(req.body);
    res.status(201).json({
      message: '5 users added successfully',
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2- GET: استرجاع جميع المستخدمين
// ==========================================
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3- GET by ID: استرجاع مستخدم معين برقم الـ _id
// ==========================================
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4- PATCH: تحديث بيانات مستخدم باستخدام الـ _id
// ==========================================
app.patch('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // {new: true} لارجاع البيانات بعد التحديث
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5- DELETE by ID: حذف مستخدم باستخدام الـ _id
// ==========================================
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// تشغيل السيرفر على البورت 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});