# Manual QA Lab

โปรเจกต์ตัวอย่างสำหรับฝึก Manual QA Tester

- Frontend: Next.js + TypeScript
- Backend: NestJS + TypeScript
- Database: ไม่มี DB จริง ใช้ in-memory mock data ในโค้ด
- จุดประสงค์: ให้ tester ลองทำ exploratory testing, เขียน test case, และลองจับบัคจากระบบง่าย ๆ

## โครงสร้าง
- `frontend/` แยกเป็น repo ของฝั่ง web
- `backend/` แยกเป็น repo ของฝั่ง API

## แนวคิดระบบ
ระบบเป็น `Mini Shop QA Lab` มีฟีเจอร์หลัก:
- Login แบบ mock
- ดูรายการสินค้า
- ค้นหา / sort / filter สินค้า
- เพิ่มสินค้าเข้าตะกร้า
- ใช้คูปอง
- checkout
- ดู order history
- หน้า QA Challenge สำหรับโจทย์ทดสอบ และ test scenarios

## Intentionally seeded bugs
มีบัคตั้งใจฝังไว้ให้ manual tester หา เช่น:
1. search แยกพิมพ์ใหญ่พิมพ์เล็ก
2. coupon `SAVE10` คิดส่วนลดผิดเป็น 20%
3. stock limit เช็กผิด ทำให้ quantity เท่ากับ stock สูงสุดยังเพิ่มได้บางกรณี
4. sort by price เรียงแบบ string แทน number
5. checkout ไม่ validate เบอร์โทรให้ครบ 10 หลักจริง

## Run
เปิดแยก 2 terminal

### backend
```bash
cd backend
npm install
npm run start:dev
```

API จะรันที่ `http://localhost:3001`

### frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Web จะรันที่ `http://localhost:3000`

## Deploy
แนะนำให้ deploy แยกเป็น 2 โปรเจกต์:

1. `frontend/` ขึ้น Vercel
2. `backend/` ขึ้น Vercel เป็นอีกโปรเจกต์หนึ่ง หรือขึ้นแพลตฟอร์ม backend อื่นเช่น Render / Railway แล้วเอา URL มาใส่ให้ frontend

### สิ่งที่ต้องตั้งค่าก่อน deploy
- Frontend ใช้ตัวแปร `NEXT_PUBLIC_API_URL`
- Backend รองรับ `PORT` จากแพลตฟอร์มแล้ว

### Deploy frontend ไป Vercel
1. Push repo ขึ้น GitHub
2. Import repo นี้เข้า Vercel
3. ตั้ง `Root Directory` เป็น `frontend`
4. เพิ่ม Environment Variable:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url
```

5. Deploy

### Deploy backend
ถ้าจะใช้ Vercel:
1. Import repo เดิมเข้า Vercel อีกรอบ
2. ตั้ง `Root Directory` เป็น `backend`
3. Deploy

ถ้าใช้แพลตฟอร์มอื่น:
1. Deploy จากโฟลเดอร์ `backend`
2. นำ URL ที่ได้มาใส่ใน `NEXT_PUBLIC_API_URL` ของ frontend
3. Redeploy frontend อีกรอบ

### Local env ตัวอย่าง
- `frontend/.env.example`
- `backend/.env.example`

## สำหรับผู้สอน / reviewer
- ให้ tester เข้าเมนู `QA Challenge`
- ให้ลองเขียน test case จาก requirement บนหน้าเว็บ
- ให้ลองหา defect และสรุป severity / priority
