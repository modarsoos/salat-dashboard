# هل صليت اليوم - Did you Pray Today?
![Version](https://img.shields.io/badge/version-0.1.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black) ![React](https://img.shields.io/badge/React-19.2.4-blue) ![Recharts](https://img.shields.io/badge/Recharts-2.15.0-red) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.0-38B2AC)

<div dir="rtl">

## نظرة عامة

**هل صليت اليوم** هو لوحة تحكم روحانية إسلامية شاملة تساعدك على تتبع صلواتك اليومية وقراءتك للقرآن الكريم وصدقاتك وأنشطتك الدينية الأخرى.

## المميزات

### 📿 تتبع الصلوات اليومية
تتبع صلواتك الخمس (الفجر، الظهر، العصر، المغرب، العشاء) مع تسجيل الركعات لكل صلاة.

### 📖 متابعة القرآن الكريم
سجل تقدمك في قراءة القرآن الكريم من صفحة إلى صفحة.

### 💰 سجل الصدقات
تتبع صدقاتك المختلفة بما في ذلك الصدقة الجارية والزكاة والتبرعات.

### ⏳ متابعة صلاة القضاء
راقب ركعات صلاة القضاء لكل صلاة.

### 🕌 يوم الجمعة
<img width="602" height="598" alt="2026-04-03 15_18_54-Islamic spiritual dashboard - v0 by Vercel - Brave" src="https://github.com/user-attachments/assets/6d74173e-ce6e-44d1-ae40-620d961ab568" />

قائمة مهام ليوم الجمعة المبارك:
- قراءة سورة الكهف
- الإكثار من الصلاة على النبي ﷺ
- الدعاء في ساعة الإجابة
- الاغتسال والتطيب

### 🌓 الوضع المظلم والفاتح
تدعم الواجهة الوضعين المظلم والفاتح حسب تفضيلاتك.

### 📱 تصميم متجاوب
يتكيف التصميم مع جميع أحجام الشاشات من الهاتف المحمول إلى الشاشات الكبيرة.

## التقنيات المستخدمة

- **Next.js 16** - إطار عمل React الحديث
- **React 19** - مكتبة واجهة المستخدم
- **TypeScript** - لغة البرمجة المكتوبة
- **Tailwind CSS 4** - إطار عمل CSS
- **Radix UI** - مكونات UI سهلة الوصول
- **next-themes** - إدارة السمات
- **Vercel Analytics** - تحليلات الأداء

## الحزم المستخدمة

| الحزمة | الإصدار | الوصف |
|--------|----------|-------|
| Next.js | 16.1.6 | إطار عمل React الحديث للتطبيقات الويب |
| React | 19.2.4 | مكتبة واجهة المستخدم |
| React DOM | 19.2.4 | ربط React بالمتصفح |
| TypeScript | 5.7.3 | لغة البرمجة المكتوبة |
| Tailwind CSS | 4.2.0 | إطار عمل CSS |
| Radix UI Components | متعددة | مكونات UI سهلة الوصول |
| next-themes | 0.4.6 | إدارة السمات المظلمة والفاتحة |
| Vercel Analytics | 1.6.1 | تحليلات الأداء |
| Recharts | 2.15.0 | مكتبة رسوم بيانية |
| date-fns | 4.1.0 | مكتبة تاريخ ووقت |
| react-hook-form | 7.54.1 | إدارة النماذج |
| zod | 3.24.1 | التحقق من البيانات |
| lucide-react | 0.564.0 | مجموعة أيقونات |
| sonner | 1.7.1 | إشعارات |
| clsx | 2.1.1 | مساعد CSS classes |
| class-variance-authority | 0.7.1 | إدارة variants CSS |
| @hookform/resolvers | 3.9.1 | محللات النماذج |
| autoprefixer | 10.4.20 | إضافة prefixes CSS تلقائياً |

## المتطلبات

- Node.js 18.17 أو أحدث
- npm أو pnpm أو yarn

## التثبيت

```bash
# استنساخ المشروع
git clone <repository-url>
cd Salat

# تثبيت الحزم
npm install

# تشغيل في وضع التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في متصفحك.

## الأوامر المتاحة

| الأمر | الوصف |
|-------|-------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء التطبيق للإنتاج |
| `npm run start` | تشغيل التطبيق المنتج |
| `npm run lint` | فحص الكود |

## هيكل المشروع

```
Salat/
├── app/                    # صفحات التطبيق
│   ├── globals.css         # الأنماط العامة
│   ├── layout.tsx          # تخطيط التطبيق
│   └── page.tsx            # الصفحة الرئيسية
├── components/
│   ├── dashboard/           # مكونات لوحة التحكم
│   │   ├── sidebar.tsx     # الشريط الجانبي
│   │   ├── header.tsx      # الرأس
│   │   ├── rakat-counter.tsx    # عداد الركعات
│   │   ├── prayer-tracker.tsx   # متتبع الصلوات
│   │   ├── quran-progress.tsx  # تقدم القرآن
│   │   ├── charity-vault.tsx    # خزنة الصدقات
│   │   ├── qadaa-tracker.tsx    # متتبع القضاء
│   │   ├── friday-oasis.tsx    # واحة الجمعة
│   │   └── dashboard-skeleton.tsx  # هيكل التحميل
│   └── ui/                 # مكونات UI الأساسية
├── hooks/                  # الخطافات المخصصة
├── lib/                   # الأدوات المساعدة
├── public/                # الملفات الثابتة
├── styles/                # الأنماط الإضافية
├── package.json
└── tsconfig.json
```

## التخصيص

### تغيير الألوان
يمكنك تعديل الألوان في ملف `app/globals.css` لتخصيص المظهر.

### إضافة لغات
المشروع يدعم RTL (من اليمين لليسار) للعربية بشكل افتراضي.

## المساهمة

نرحب بمساهماتكم! يرجى فتح issue أو pull request.

## الترخيص

هذا المشروع مرخص بموجب MIT License.

---

**اجعل كل يوم خطوة نحو الجنة** 🕋

</div>
