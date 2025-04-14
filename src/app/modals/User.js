import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    reviews: [
        {
            name: String,
            email: String,
            picture: String,
            review: String,
            star: Number,
            date: { type: Date, default: Date.now }
        }
    ]
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
