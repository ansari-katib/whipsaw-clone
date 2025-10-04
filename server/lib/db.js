import mongoose from "mongoose";

export const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("DB is connected successfully 🚀");
            })
    } catch (error) {
        console.log("conection error : ", error);
    }
}