require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

// جلب رابط الاتصال من ملف .env
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const dbName = 'usersDatabase';
const collectionName = 'users';

async function runMongoDBTasks() {
    try {
        // الاتصال بقاعدة البيانات
        await client.connect();
        console.log("🚀 Connected successfully to MongoDB server!\n");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // تنظيف الكولكشن في البداية (اختياري لضمان نظافة البيانات مع كل تشغيل)
        await collection.deleteMany({});

        console.log("-----------------------------------------");
        console.log("1. Use insertOne to add 2 user documents");
        console.log("-----------------------------------------");
        const user1 = await collection.insertOne({ name: "Ahmed Ali", age: 25, city: "Cairo" });
        const user2 = await collection.insertOne({ name: "Sara Mohamed", age: 30, city: "Alexandria" });
        
        console.log("Inserted User 1 ID:", user1.insertedId);
        console.log("Inserted User 2 ID:", user2.insertedId);
        
        // حفظ ID لأغراض الاستخدام لاحقاً في findOne و updateOne و deleteOne
        const specificUserId = user1.insertedId;


        console.log("\n-----------------------------------------");
        console.log("2. Use insertMany to add at least 10 users (5 with age 27)");
        console.log("-----------------------------------------");
        const manyUsers = [
            { name: "Khaled", age: 27, city: "Giza" },
            { name: "Mona", age: 27, city: "Aswan" },
            { name: "Tarek", age: 22, city: "Luxor" },
            { name: "Nour", age: 27, city: "Cairo" },
            { name: "Youssef", age: 27, city: "Mansoura" },
            { name: "Hoda", age: 35, city: "Tanta" },
            { name: "Mahmoud", age: 27, city: "Alexandria" },
            { name: "Salma", age: 24, city: "Suez" },
            { name: "Amr", age: 29, city: "Fayoum" },
            { name: "Dina", age: 26, city: "Ismailia" }
        ];
        const insertManyResult = await collection.insertMany(manyUsers);
        console.log(`Number of inserted documents: ${insertManyResult.insertedCount}`);


        console.log("\n-----------------------------------------");
        console.log("3. Use find to display all documents where age is 27");
        console.log("-----------------------------------------");
        const age27Users = await collection.find({ age: 27 }).toArray();
        console.log("Users with age 27:", age27Users);


        console.log("\n-----------------------------------------");
        console.log("4. Use limit to display only the first 3 documents where age is 27");
        console.log("-----------------------------------------");
        const limitedAge27Users = await collection.find({ age: 27 }).limit(3).toArray();
        console.log("First 3 users with age 27:", limitedAge27Users);


        console.log("\n-----------------------------------------");
        console.log("5. Use findOne to search for a user using the _id");
        console.log("-----------------------------------------");
        const foundUser = await collection.findOne({ _id: specificUserId });
        console.log("Found user by ID:", foundUser);


        console.log("\n-----------------------------------------");
        console.log("6. Use countDocuments to count users with age = 27");
        console.log("-----------------------------------------");
        const count27 = await collection.countDocuments({ age: 27 });
        console.log(`Total users with age 27: ${count27}`);


        console.log("\n-----------------------------------------");
        console.log("7. Use updateOne with $set and$inc");
        console.log("-----------------------------------------");
        const updateOneResult = await collection.updateOne(
            { _id: specificUserId },
           { 
               $set: { name: "Ahmed Ali Updated" },
                $inc: { age: 3 } // زيادة العمر بـ 3 سنوات
            }
        );
        console.log(`Number of modified documents: ${updateOneResult.modifiedCount}`);


        console.log("\n-----------------------------------------");
        console.log("8. Use updateMany with $inc to increase age of all users by 5 years");
        console.log("-----------------------------------------");
        const updateManyResult = await collection.updateMany(
            {}, // تطابق كل المستندات
            { $inc: { age: 5 } }
        );
        console.log(`Number of modified documents in updateMany: ${updateManyResult.modifiedCount}`);


        console.log("\n-----------------------------------------");
        console.log("9. Use deleteOne to delete a user using the _id");
        console.log("-----------------------------------------");
        // سنحذف مستند آخر كمثال (مثلاً Sara Mohamed أو ممكن نجيب ID مستند تانٍ)
        const anotherUser = await collection.findOne({ name: "Sara Mohamed" });
        if (anotherUser) {
            const deleteOneResult = await collection.deleteOne({ _id: anotherUser._id });
            console.log(`Number of deleted documents: ${deleteOneResult.deletedCount}`);
        }


        console.log("\n-----------------------------------------");
        console.log("10. Use deleteMany to delete users matching a specific condition");
        console.log("-----------------------------------------");
        // بعد التعديلات، ممكن نحذف المستخدمين اللي أعمارهم أكبر من أو تساوي 35 مثلاً، أو شرط معين بناءً على التكليف
        // هنا هنحذف المستخدمين اللي عمرهم أصبح 32 (اللي كانوا 27 وزدناهم 5)
        const deleteManyResult = await collection.deleteMany({ age: 32 });
        console.log(`Number of deleted documents using deletedCount: ${deleteManyResult.deletedCount}`);

    } catch (err) {
        console.error("❌ An error occurred during database operations:", err);
    } finally {
        // غلق الاتصال بقاعدة البيانات بنجاح في النهاية
        await client.close();
        console.log("\n🔌 Connection closed safely.");
    }
}

runMongoDBTasks();