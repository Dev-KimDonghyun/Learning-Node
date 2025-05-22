import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    age: Number,
});

const User = mongoose.model("userList", userSchema);
export default User;