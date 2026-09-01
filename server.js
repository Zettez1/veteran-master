const express = require('express');
const multer = require('multer');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Telegram Config — from Railway Variables (fallback to hardcoded for local dev)
const token = process.env.TELEGRAM_TOKEN || '8542907147:AAHOdyMNxCZkDI0gRsxZkBq4Wvtmhb7enE4';
const chatId = process.env.TELEGRAM_CHAT_ID || '-1003407248691';
const bot = token ? new TelegramBot(token, { polling: false }) : null;

// Multer Config (Memory Storage to avoid disk cleanup)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(express.static(__dirname)); // Serve static files from root
app.use(express.json());

// API Route for Form Submission
app.post('/api/send-request', upload.array('photos', 3), async (req, res) => {
    try {
        const { name, phone, messengers, timeFrom, timeTo, comment } = req.body;
        const files = req.files;

        // Construct Message
        let message = `🔔 *Нова заявка з сайту*\n\n`;
        message += `👤 *Ім'я:* ${name}\n`;
        message += `📞 *Телефон:* ${phone}\n`;
        
        if (messengers) message += `💬 *Месенджери:* ${messengers}\n`;
        
        const timeStr = [];
        if (timeFrom) timeStr.push(`з ${timeFrom}`);
        if (timeTo) timeStr.push(`до ${timeTo}`);
        if (timeStr.length > 0) message += `⏰ *Зручний час:* ${timeStr.join(' ')}\n`;
        
        if (comment) message += `📝 *Коментар:* ${comment}\n`;

        // Send Text Message
        if (!bot) throw new Error('Telegram not configured');
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

        // Send Photos (if any)
        if (files && files.length > 0) {
            for (const file of files) {
                await bot.sendPhoto(chatId, file.buffer, {
                    caption: `📸 Фото від ${name}`,
                    filename: file.originalname,
                    contentType: file.mimetype
                });
            }
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Telegram Error:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

// Fallback for SPA (though this is a single page mostly)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
