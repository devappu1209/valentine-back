const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sportsguyappu@gmail.com",
        pass: "yzgpxxxxxxxxxxx"
    }
});

app.post("/send-prize", async (req, res) => {
    const { prizeName } = req.body;

    try {
        await transporter.sendMail({
            from: "Love Surprise 💖 <sportsguyappu@gmail.com>",
            to: "sportsguyappu@gmail.com",
            subject: "🎁 Surprise She Chose!",
            text: `She selected this surprise: ${prizeName}`
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log("💌 Mail server running on http://localhost:3000");
});
