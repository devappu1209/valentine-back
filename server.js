import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
    res.send("Valentine Backend is running 💖");
});

app.post("/send-prize", async (req, res) => {
    const { prizeName } = req.body;

    try {
        await resend.emails.send({
            from: "Valentine Surprise <onboarding@resend.dev>",
            to: ["sportsguyappu@gmail.com"],
            subject: "🎁 Surprise She Chose!",
            html: `<h2>💖 She selected this surprise:</h2><p>${prizeName}</p>`
        });

        res.json({ success: true });
    } catch (error) {
        console.error("EMAIL ERROR:", error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("💌 Email service running on port", PORT);
});
