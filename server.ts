import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// Lazy-initialized Gemini AI client
let genAiClient: GoogleGenAI | null = null;
function getGenAi(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({ apiKey });
  }
  return genAiClient;
}

// ==========================================
// API ROUTES FIRST
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Olive Trip & Hospitality API',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    mapsConfigured: !!process.env.VITE_GOOGLE_MAPS_API_KEY
  });
});

// Gemini Assistant: Server-Side ONLY. strictly NO pricing, NO availability generation.
// Used for: Drafting professional executive briefing notes, summarizing delegation specs, drafting concierge notes.
app.post('/api/gemini/assist', async (req, res) => {
  try {
    const { action, payload } = req.body;
    const ai = getGenAi();

    if (!ai) {
      return res.status(200).json({
        success: false,
        message: 'GEMINI_API_KEY belum dikonfigurasi di environment server.',
        fallbackText: 'Catatan operasional standar telah disiapkan oleh tim Olive Trip & Hospitality.'
      });
    }

    let prompt = '';
    if (action === 'draft_service_notes') {
      prompt = `Anda adalah Operations Director Olive Trip & Hospitality, platform koordinasi akomodasi & mobilitas delegasi kementerian (B2G) dan korporasi (B2B) di Jakarta.
Tugas Anda: Buat 3-4 poin ringkas "Catatan Layanan & Pengaturan Operasional" resmi dalam Bahasa Indonesia formal untuk proposal koordinasi.

Data Kunjungan:
- Instansi: ${payload.organization || 'Delegasi'}
- PIC: ${payload.picName || 'PIC'} (${payload.picTitle || 'Koordinator'})
- Hotel: ${payload.hotelName || '-'}
- Durasi: ${payload.nights || '-'} Malam (${payload.roomQuantity || '-'} Kamar)
- Armada Bandara: ${payload.vehicleSummary || '-'}
- Catatan Khusus Klien: ${payload.notes || '-'}

ATURAN SANGAT KETAT:
1. JANGAN PERNAH menyertakan harga, tarif, nominal rupiah, biaya, diskon, atau angka keuangan apa pun!
2. Fokuskan pada kesiapan operasional: drop-off VIP, kebersihan armada, seragam driver (batik/jas), paging board bandara, koordinasi protokoler.
3. Berikan output langsung dalam poin-poin rapi tanpa kalimat pengantar atau penutup bertele-tele.`;
    } else if (action === 'summarize_request') {
      prompt = `Anda adalah Senior Hospitality Concierge di Olive Trip & Hospitality.
Buat ringkasan eksekutif 2 kalimat dalam Bahasa Indonesia formal mengenai permohonan kunjungan delegasi berikut:
Instansi: ${payload.organization}
Hotel: ${payload.hotelName}
Delegasi: ${payload.guestQuantity} orang, ${payload.roomQuantity} kamar
Transportasi: ${payload.vehicleSummary}
Tujuan: ${payload.referenceName}
PENTING: Jangan buat harga atau angka keuangan apa pun.`;
    } else {
      prompt = `Buat 2 poin panduan protokol kedatangan delegasi resmi di Jakarta untuk instansi ${payload.organization || 'Pemerintah/Korporasi'}. Tanpa harga.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    const outputText = response.text || '';
    return res.json({
      success: true,
      draftText: outputText.trim()
    });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return res.status(200).json({
      success: false,
      message: error?.message || 'Gagal memproses via Gemini AI',
      fallbackText: 'Layanan koordinasi penjemputan dan akomodasi siap difinalisasi oleh tim operasional Olive.'
    });
  }
});

// ==========================================
// VITE MIDDLEWARE SETUP
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Olive Trip & Hospitality server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
