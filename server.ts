import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/send-report", async (req, res) => {
    const { email, reportTitle } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env;

      if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("SMTP credentials (EMAIL_USER, EMAIL_PASS) are missing.");
        return res.status(500).json({ 
          error: "Email service not configured. Please set EMAIL_USER and EMAIL_PASS in the Settings menu." 
        });
      }

      // Create a transporter
      const transporter = nodemailer.createTransport({
        host: EMAIL_HOST || "smtp.ethereal.email",
        port: parseInt(EMAIL_PORT || "587"),
        secure: EMAIL_PORT === "465",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      // Send mail
      const info = await transporter.sendMail({
        from: '"IndiaFit" <reports@indiafit.org>',
        to: email,
        subject: `Your IndiaFit Report: ${reportTitle || "2026 Edition"}`,
        text: `Hello,\n\nThank you for your interest in the IndiaFit Report. You can find your requested report attached or via the link below.\n\nReport: ${reportTitle || "India Fit Report 2026"}\n\nBest regards,\nThe IndiaFit Team`,
        html: `<p>Hello,</p><p>Thank you for your interest in the <b>IndiaFit Report</b>. You can find your requested report attached or via the link below.</p><p><b>Report:</b> ${reportTitle || "India Fit Report 2026"}</p><p>Best regards,<br/>The IndiaFit Team</p>`,
      });

      console.log("Message sent: %s", info.messageId);
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
