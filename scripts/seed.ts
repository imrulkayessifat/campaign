const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.user.createMany({
            data: [
                { email: "hlw@gmail.com", username: "sifat", isAdmin: "user", status: "pending" },
            ],
        });
        console.log("Default values seeded successfully.");
    } catch (error) {
        console.error("Error seeding default values", error);
    } finally {
        await db.$disconnect();
    }
}

main();