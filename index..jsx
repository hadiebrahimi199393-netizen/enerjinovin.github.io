<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>گروه آموزشی انرژی نوین | EnergyNovin</title>
    
    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <!-- Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Persian Font: Vazirmatn -->
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    
    <!-- MathJax Configuration (Enabling $ for inline math) -->
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                displayMath: [['$$','$$'], ['\\[','\\]']],
                processEscapes: true
            },
            "HTML-CSS": { fonts: ["TeX"] }
        });
    </script>
    
    <!-- MathJax for Rendering Formulas -->
    <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Vazirmatn', 'sans-serif'] },
                    colors: {
                        brand: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 900: '#1e3a8a' },
                        accent: { 500: '#10b981', 600: '#059669' },
                        warn: { 500: '#f59e0b', 50: '#fffbeb' }
                    }
                }
            }
        }
    </script>
    
    <style>
        body { font-family: 'Vazirmatn', sans-serif; background-color: #f8fafc; }
        .fade-in { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        /* Ensuring math fits and has correct direction */
        .math-block { direction: ltr; overflow-x: auto; display: inline-block; }
        .math-container { direction: rtl; text-align: right; }
        /* MathJax font fix */
        .MathJax { font-size: 110%; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useMemo, useRef } = React;

        // ==========================================
        // 🔹 ICONS (Fixed: Inline SVGs)
        // ==========================================
        const Icons = {
            Home: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
            BookOpen: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
            ChevronLeft: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
            ChevronRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
            CheckCircle: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
            Play: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
            Layout: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>,
            Eye: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
            Layers: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.44 9.8 5.7a1 1 0 0 1 0 1.74l-9.8 5.7a1 1 0 0 1-1.02 0l-9.8-5.7a1 1 0 0 1 0-1.74l9.8-5.7a1 1 0 0 1 1.02 0Z"/><path d="m22 10-9 5.25a1 1 0 0 1-1.12 0L2 10"/><path d="m22 14-9 5.25a1 1 0 0 1-1.12 0L2 14"/></svg>,
            Menu: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
            Calculator: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
            Target: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        };

        // ==========================================
        // 🔹 CONTENT DATABASE
        // ==========================================
        
        const CHAPTERS = [
            {
                id: 'ch_func',
                title: 'فصل ۱: تابع',
                icon: <Icons.Layers className="w-6 h-6"/>,
                description: 'انتقال نمودار، توابع صعودی/نزولی',
                lessons: [
                    {
                        id: 'l_transform',
                        title: 'انتقال نمودار توابع',
                        summary: 'تغییرات داخل پرانتز برعکس (روی x)، بیرون مستقیم (روی y).',
                        content: [
                            { type: 'text', text: 'فرض کنید می‌خواهیم نمودار $y=k f(x-a)+b$ را رسم کنیم. روش "نقطه به نقطه" بهترین روش است.' },
                            { type: 'alert', title: 'نکته کلیدی', text: 'تغییرات داخل پرانتز برعکس عمل می‌کنند: $x-2$ یعنی ۲ واحد به راست. تغییرات بیرون مستقیم هستند: $+1$ یعنی ۱ واحد به بالا.' },
                            { type: 'steps', items: ['نقاط کلیدی (راس‌ها) را روی $f$ پیدا کنید.', 'طول‌ها را طبق داخل پرانتز تغییر دهید.', 'عرض‌ها را طبق بیرون پرانتز تغییر دهید.', 'نقاط جدید را بهم وصل کنید.'] }
                        ],
                        questions: [
                            {
                                id: 'q_func_1',
                                date: 'خرداد ۱۴۰۰',
                                q: 'با توجه به نمودار تابع $f(x)$ (فرض کنید یک سهمی با راس $(0,0)$)، نمودار تابع $g(x) = -f(x-2) + 1$ را رسم کنید.',
                                steps: [
                                    { t: 'تحلیل انتقالات', d: '$x-2$: انتقال ۲ واحد به راست. $-f$: قرینه نسبت به محور $x$. $+1$: انتقال ۱ واحد به بالا.' },
                                    { t: 'نقطه‌یابی', d: 'نقطه $(0,0) \\to (2,0) \\to (2,0) \\to (2,1)$. نقطه $(1,1) \\to (3,1) \\to (3,-1) \\to (3,0)$.' }
                                ]
                            },
                            {
                                id: 'q_func_2',
                                date: 'شهریور ۱۴۰۱',
                                q: 'نمودار تابع $g(x)=f(x-1)-2$ را با استفاده از نمودار $f$ رسم کنید.',
                                steps: [
                                    { t: 'تحلیل', d: 'هر نقطه $(x,y)$ تبدیل می‌شود به $(x+1, y-2)$.' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'ch_trig',
                title: 'فصل ۲: مثلثات',
                icon: <Icons.CheckCircle className="w-6 h-6"/>,
                description: 'دوره تناوب، معادلات مثلثاتی',
                lessons: [
                    {
                        id: 'l_graph_params',
                        title: 'یافتن ضرایب از روی نمودار',
                        summary: 'فرمول‌های $Max$ و $Min$ و $T$.',
                        content: [
                            { type: 'text', text: 'برای تابع $y=a\\sin(bx)+c$ یا کسینوس:' },
                            { type: 'formula', text: 'c = \\frac{Max + Min}{2} , \\quad |a| = \\frac{Max - Min}{2} , \\quad T = \\frac{2\\pi}{|b|}' },
                            { type: 'alert', title: 'دام آموزشی', text: 'علامت $a$ را با نگاه کردن به نقطه شروع نمودار تعیین کنید. اگر از محور نوسان بالا رفت، مثبت است.' }
                        ],
                        questions: [
                            {
                                id: 'q_trig_1',
                                date: 'خرداد ۱۴۰۲',
                                q: 'نمودار تابع $y = a \\sin(bx) + c$ در بازه $[0, \\pi]$ داده شده. Max=3 و Min=-1 است. مقادیر را بیابید.',
                                steps: [
                                    { t: 'یافتن c', d: '$c = (3 + (-1))/2 = 1$' },
                                    { t: 'یافتن a', d: '$|a| = (3 - (-1))/2 = 2$. چون صعودی شروع شده، $a=2$.' },
                                    { t: 'یافتن b', d: 'یک نوسان کامل در $\\pi$ رخ داده، پس $T=\\pi \\Rightarrow |b|=2$.' }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'l_eq',
                        title: 'معادلات مثلثاتی',
                        summary: 'هم‌جنس سازی و فرمول‌های کلی.',
                        content: [
                            { type: 'text', text: 'اولین کار: همه را به $\\sin$ یا $\\cos$ تبدیل کنید.' },
                            { type: 'formula', text: '\\cos 2x = 1 - 2\\sin^2 x \\quad \\text{(تبدیل به سینوس)}' },
                            { type: 'formula', text: '\\sin x = \\sin \\alpha \\Rightarrow x = 2k\\pi + \\alpha , \\quad x = 2k\\pi + \\pi - \\alpha' }
                        ],
                        questions: [
                            {
                                id: 'q_trig_2',
                                date: 'شهریور ۱۴۰۱',
                                q: 'جواب کلی معادله $\\sin x - \\cos 2x = 0$ را بیابید.',
                                steps: [
                                    { t: 'تبدیل', d: '$\\sin x - (1-2\\sin^2 x) = 0 \\Rightarrow 2\\sin^2 x + \\sin x - 1 = 0$' },
                                    { t: 'حل درجه ۲', d: 'با فرض $\\sin x = t$، ریشه‌ها $t=-1$ و $t=1/2$.' },
                                    { t: 'جواب نهایی', d: '$\\sin x = -1 \\Rightarrow x=2k\\pi - \\pi/2$. $\\sin x = 1/2 \\Rightarrow 2k\\pi+\\pi/6$ و $2k\\pi+5\\pi/6$.' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'ch_limits',
                title: 'فصل ۳: حد بی‌نهایت',
                icon: <Icons.Layout className="w-6 h-6"/>,
                description: 'حد در بی‌نهایت و حدهای نامتناهی',
                lessons: [
                    {
                        id: 'l_inf',
                        title: 'حد در بی‌نهایت (پرتوان)',
                        summary: 'فقط جملات با بزرگترین توان را نگه دار.',
                        content: [
                            { type: 'text', text: 'وقتی $x \\to \\pm\\infty$، قاعده پرتوان حاکم است.' },
                            { type: 'formula', text: '\\lim \\frac{ax^n + ...}{bx^m + ...} = \\lim \\frac{ax^n}{bx^m}' },
                            { type: 'alert', title: 'نکته مهم', text: 'رادیکال با فرجه زوج در منفی بی‌نهایت منفی بیرون می‌دهد: $\\sqrt{x^2} = |x| = -x$.' }
                        ],
                        questions: [
                            {
                                id: 'q_lim_1',
                                date: 'خرداد ۱۴۰۲',
                                q: 'حاصل حد $\\lim_{x \\to -\\infty} \\frac{3x - \\sqrt{x^2 - 3}}{5x}$ را بیابید.',
                                steps: [
                                    { t: 'پرتوان زیر رادیکال', d: '$\\sqrt{x^2} = |x| = -x$ (چون $x$ منفی است).' },
                                    { t: 'جایگذاری', d: 'صورت: $3x - (-x) = 4x$. مخرج: $5x$.' },
                                    { t: 'جواب', d: '$4x / 5x = 4/5$.' }
                                ]
                            },
                            {
                                id: 'q_lim_2',
                                date: 'دی ۱۴۰۲',
                                q: 'حاصل $\\lim_{x \\to 2^-} \\frac{[x]-3}{x-2}$ چیست؟',
                                steps: [
                                    { t: 'صورت', d: '$x \\to 2^-$ یعنی مثلا ۱.۹. پس $[x]=1$. صورت: $1-3=-2$.' },
                                    { t: 'مخرج', d: '$2^- - 2 = 0^-$ (صفر حدی منفی).' },
                                    { t: 'نتیجه', d: 'عدد منفی بر صفر منفی = مثبت بی‌نهایت $(+\\infty)$.' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'ch_deriv',
                title: 'فصل ۴: مشتق',
                icon: <Icons.Calculator className="w-6 h-6"/>,
                description: 'آهنگ تغییر و خط مماس',
                lessons: [
                    {
                        id: 'l_rate',
                        title: 'آهنگ متوسط و لحظه‌ای',
                        summary: 'تفاوت $\\Delta y / \\Delta x$ با $f\'(a)$.',
                        content: [
                            { type: 'text', text: 'آهنگ متوسط: شیب خط واصل دو نقطه. آهنگ لحظه‌ای: مشتق در یک نقطه.' },
                            { type: 'formula', text: '\\text{Average} = \\frac{f(b)-f(a)}{b-a} , \\quad \\text{Instant} = f\'(a)' }
                        ],
                        questions: [
                            {
                                id: 'q_deriv_1',
                                date: 'خرداد ۱۴۰۲',
                                q: 'معادله حرکت $f(t)=t^2+2t$. الف) سرعت متوسط در $[2,3]$. ب) در چه لحظه‌ای سرعت لحظه‌ای با متوسط برابر است؟',
                                steps: [
                                    { t: 'سرعت متوسط', d: '$f(3)=15, f(2)=8 \\Rightarrow (15-8)/(3-2) = 7$.' },
                                    { t: 'سرعت لحظه‌ای', d: '$f\'(t) = 2t+2$.' },
                                    { t: 'برابر قرار دادن', d: '$2t+2=7 \\Rightarrow 2t=5 \\Rightarrow t=2.5$. (دقیقا وسط بازه)' }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'l_tangent',
                        title: 'معادله خط مماس',
                        summary: '$y-y_0 = m(x-x_0)$',
                        content: [
                            { type: 'steps', items: ['عرض نقطه ($y_0$) را با جاگذاری $x_0$ در تابع بیابید.', 'مشتق بگیرید و $x_0$ را در آن بگذارید تا شیب ($m$) بدست آید.', 'در فرمول خط مماس جاگذاری کنید.'] }
                        ],
                        questions: [
                            {
                                id: 'q_tan_1',
                                date: 'دی ۱۴۰۰',
                                q: 'معادله خط مماس بر $f(x)=x^3-2x+1$ در $x=2$ را بنویسید.',
                                steps: [
                                    { t: 'یافتن نقطه', d: '$f(2) = 8-4+1 = 5$. نقطه $(2,5)$.' },
                                    { t: 'یافتن شیب', d: '$f\'(x)=3x^2-2 \\Rightarrow f\'(2)=12-2=10$.' },
                                    { t: 'معادله', d: '$y - 5 = 10(x - 2)$.' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'ch_opt',
                title: 'فصل ۵: کاربرد مشتق',
                icon: <Icons.Target className="w-6 h-6"/>,
                description: 'اکسترمم مطلق و بهینه‌سازی',
                lessons: [
                    {
                        id: 'l_abs_ext',
                        title: 'اکسترمم مطلق',
                        summary: 'الگوریتم جدول برای بازه بسته.',
                        content: [
                            { type: 'text', text: 'در بازه $[a,b]$، نقاط بحرانی (مشتق صفر یا تعریف نشده) را پیدا کنید.' },
                            { type: 'alert', title: 'مهم', text: 'حتما مقدار تابع را در نقاط بحرانی AND سر و ته بازه ($a,b$) حساب کنید.' }
                        ],
                        questions: [
                            {
                                id: 'q_opt_1',
                                date: 'دی ۱۴۰۰',
                                q: 'اکسترمم‌های مطلق $f(x)=2x^3-3x^2-12x$ را در $[-2,3]$ بیابید.',
                                steps: [
                                    { t: 'مشتق', d: '$f\'(x)=6x^2-6x-12 = 6(x-2)(x+1)$. ریشه‌ها: $2, -1$.' },
                                    { t: 'جدول', d: 'مقادیر را برای $x=-2, -1, 2, 3$ حساب می‌کنیم.' },
                                    { t: 'نتیجه', d: 'بزرگترین مقدار Max مطلق و کوچکترین Min مطلق است.' }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'l_opt_real',
                        title: 'بهینه‌سازی (مسائل کلامی)',
                        summary: 'تابع هدف و رابطه کمکی.',
                        content: [
                            { type: 'steps', items: ['شکل بکشید و متغیرها را نامگذاری کنید.', 'رابطه کمکی (عدد ثابت سوال) را پیدا کنید.', 'تابع هدف (چیزی که باید ماکزیمم شود) را بنویسید.', 'تک متغیره کنید و مشتق بگیرید.'] }
                        ],
                        questions: [
                            {
                                id: 'q_opt_2',
                                date: 'خرداد ۱۴۰۱',
                                q: 'از مقوای مربعی به ضلع ۳۰، با برش گوشه‌ها (x) جعبه روباز می‌سازیم. x چقدر باشد تا حجم ماکزیمم شود؟',
                                steps: [
                                    { t: 'ابعاد', d: 'طول و عرض: $30-2x$، ارتفاع: $x$.' },
                                    { t: 'تابع حجم', d: '$V(x) = x(30-2x)^2$.' },
                                    { t: 'مشتق', d: 'با مشتق‌گیری و برابر صفر قرار دادن، $x=5$ بدست می‌آید.' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'ch_geo',
                title: 'فصل ۶: هندسه',
                icon: <Icons.BookOpen className="w-6 h-6"/>,
                description: 'دایره و بیضی',
                lessons: [
                    {
                        id: 'l_conic',
                        title: 'مقاطع مخروطی',
                        summary: 'فرمول‌های دایره و بیضی.',
                        content: [
                            { type: 'formula', text: '\\text{دایره: } (x-\\alpha)^2 + (y-\\beta)^2 = R^2' },
                            { type: 'formula', text: '\\text{بیضی: } a^2 = b^2 + c^2' },
                            { type: 'text', text: '$a$: نصف قطر بزرگ، $b$: نصف قطر کوچک، $c$: نصف فاصله کانونی.' }
                        ],
                        questions: [
                            {
                                id: 'q_geo_1',
                                date: 'دی ۱۴۰۲',
                                q: 'مرکز و شعاع دایره $x^2+y^2-2x+4y-6=0$ را بیابید.',
                                steps: [
                                    { t: 'مرکز', d: 'نصف ضرایب با علامت قرینه: $O(1, -2)$.' },
                                    { t: 'شعاع', d: '$R = \\sqrt{1^2 + (-2)^2 - (-6)} = \\sqrt{1+4+6} = \\sqrt{11}$.' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'ch_prob',
                title: 'فصل ۷: احتمال',
                icon: <Icons.Target className="w-6 h-6"/>,
                description: 'احتمال کل و نمودار درختی',
                lessons: [
                    {
                        id: 'l_prob_tree',
                        title: 'قانون احتمال کل',
                        summary: 'رسم نمودار درختی.',
                        content: [
                            { type: 'text', text: 'احتمال هر شاخه را در مسیر ضرب کنید و شاخه‌های نهایی مطلوب را با هم جمع کنید.' },
                            { type: 'formula', text: 'P(B) = P(A_1)P(B|A_1) + P(A_2)P(B|A_2)' }
                        ],
                        questions: [
                            {
                                id: 'q_prob_1',
                                date: 'خرداد ۱۴۰۲',
                                q: 'دو جعبه داریم. اولی ۹ سالم ۳ معیوب، دومی ۵ سالم ۱ معیوب. به تصادف یک جعبه و سپس یک لامپ انتخاب می‌کنیم. احتمال سالم بودن؟',
                                steps: [
                                    { t: 'شاخه ۱ (جعبه ۱)', d: '$1/2 \\times 9/12 = 3/8$.' },
                                    { t: 'شاخه ۲ (جعبه ۲)', d: '$1/2 \\times 5/6 = 5/12$.' },
                                    { t: 'جمع', d: '$3/8 + 5/12 = 19/24$.' }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        // ==========================================
        // 🔹 APP COMPONENTS
        // ==========================================

        const Header = ({ setView }) => (
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
                        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-200">E</div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">انرژی نوین</h1>
                            <p className="text-[10px] text-brand-600 font-medium hidden sm:block">مرجع تخصصی امتحان نهایی</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                        <span className="cursor-pointer hover:text-brand-600 transition">آزمون‌ها</span>
                        <span className="cursor-pointer hover:text-brand-600 transition">کلاس‌ها</span>
                    </nav>
                    <button className="bg-brand-50 text-brand-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-100 transition">ورود</button>
                </div>
            </header>
        );

        const LessonContent = ({ lesson }) => (
            <div className="space-y-6 animate-fadeIn">
                <div className="bg-brand-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                        <p className="opacity-90 text-sm">{lesson.summary}</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-700 to-transparent opacity-30"></div>
                </div>

                <div className="space-y-4">
                    {lesson.content.map((block, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                            {block.type === 'text' && <p className="text-gray-700 leading-relaxed math-container">{block.text}</p>}
                            {block.type === 'alert' && (
                                <div className="bg-warn-50 border-r-4 border-warn-500 p-4 rounded-r-sm">
                                    <h4 className="font-bold text-warn-500 mb-1 text-sm">{block.title}</h4>
                                    <p className="text-gray-700 text-sm math-container">{block.text}</p>
                                </div>
                            )}
                            {block.type === 'formula' && (
                                <div className="bg-gray-50 p-4 rounded-lg text-center math-block text-gray-800 font-mono text-sm md:text-base">
                                    {`$$${block.text}$$`}
                                </div>
                            )}
                            {block.type === 'steps' && (
                                <ul className="space-y-3">
                                    {block.items.map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                            <span className="text-gray-700 text-sm math-container">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );

        const QuestionsContent = ({ questions }) => {
            const [currentQIndex, setCurrentQIndex] = useState(0);
            const [showSolution, setShowSolution] = useState(false);
            
            const question = questions[currentQIndex];

            const nextQ = () => {
                if(currentQIndex < questions.length - 1) {
                    setCurrentQIndex(prev => prev + 1);
                    setShowSolution(false);
                }
            };
            
            const prevQ = () => {
                if(currentQIndex > 0) {
                    setCurrentQIndex(prev => prev - 1);
                    setShowSolution(false);
                }
            };

            return (
                <div className="animate-fadeIn">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold bg-brand-100 text-brand-700 px-3 py-1 rounded-full">
                            سوال {currentQIndex + 1} از {questions.length}
                        </span>
                        <div className="flex gap-2">
                            <button onClick={prevQ} disabled={currentQIndex === 0} className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 transition">
                                <Icons.ChevronRight className="w-4 h-4"/>
                            </button>
                            <button onClick={nextQ} disabled={currentQIndex === questions.length - 1} className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 transition">
                                <Icons.ChevronLeft className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-600">امتحان {question.date}</span>
                            <Icons.BookOpen className="w-4 h-4 text-gray-400"/>
                        </div>
                        <div className="p-6">
                            <div className="text-gray-800 font-medium leading-relaxed mb-6 math-container">
                                {question.q}
                            </div>

                            {!showSolution ? (
                                <button 
                                    onClick={() => setShowSolution(true)}
                                    className="w-full py-3 border-2 border-brand-100 text-brand-600 rounded-xl font-bold hover:bg-brand-50 transition flex items-center justify-center gap-2"
                                >
                                    <Icons.Eye className="w-5 h-5"/>
                                    مشاهده پاسخ تشریحی
                                </button>
                            ) : (
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 animate-fadeIn">
                                    <div className="space-y-4">
                                        {question.steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-3">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                                                    {idx < question.steps.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1"></div>}
                                                </div>
                                                <div className="pb-2 w-full">
                                                    <h5 className="text-sm font-bold text-gray-800 mb-1">{step.t}</h5>
                                                    <p className="text-sm text-gray-600 math-container">{step.d}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setShowSolution(false)} className="mt-4 text-xs text-red-500 hover:underline w-full text-center">بستن پاسخ</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        };

        const App = () => {
            const [view, setView] = useState('home'); // home, course
            const [activeChapter, setActiveChapter] = useState(null);
            const [activeLesson, setActiveLesson] = useState(null);
            const [tab, setTab] = useState('lesson'); // lesson, questions

            // Trigger MathJax on renders
            useEffect(() => {
                if (window.MathJax && window.MathJax.Hub) {
                    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
                }
            });

            return (
                <div className="min-h-screen flex flex-col bg-[#f8fafc]">
                    <Header setView={setView} />

                    <main className="flex-grow container mx-auto px-4 py-6 max-w-5xl">
                        {view === 'home' && (
                            <div className="animate-fadeIn">
                                <div className="text-center mb-10 mt-4">
                                    <h2 className="text-3xl font-extrabold text-gray-800 mb-3">ریاضی ۳ دوازدهم تجربی</h2>
                                    <p className="text-gray-500">پکیج کامل شب امتحان: درسنامه خلاصه + سوالات نهایی طبقه‌بندی شده</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {CHAPTERS.map(chapter => (
                                        <div 
                                            key={chapter.id}
                                            onClick={() => { setActiveChapter(chapter); setView('course'); setActiveLesson(null); }}
                                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-brand-300 transition cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition duration-300">
                                                    {chapter.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 group-hover:text-brand-700 transition">{chapter.title}</h3>
                                                    <span className="text-xs text-gray-400">{chapter.lessons.length} درس</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">{chapter.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {view === 'course' && activeChapter && !activeLesson && (
                            <div className="animate-fadeIn">
                                <button onClick={() => setView('home')} className="mb-6 flex items-center text-gray-500 hover:text-brand-600 transition">
                                    <Icons.ChevronLeft className="w-4 h-4 ml-1"/> بازگشت به فصل‌ها
                                </button>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                                        {activeChapter.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{activeChapter.title}</h2>
                                        <p className="text-gray-500">{activeChapter.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {activeChapter.lessons.map(lesson => (
                                        <div 
                                            key={lesson.id}
                                            onClick={() => { setActiveLesson(lesson); setTab('lesson'); }}
                                            className="bg-white p-4 rounded-xl border border-gray-200 hover:border-brand-400 cursor-pointer flex justify-between items-center group transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold group-hover:bg-brand-600 group-hover:text-white transition">
                                                    <Icons.Play className="w-3 h-3 fill-current"/>
                                                </span>
                                                <span className="font-bold text-gray-700">{lesson.title}</span>
                                            </div>
                                            <Icons.ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-brand-500"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {view === 'course' && activeLesson && (
                            <div className="animate-fadeIn max-w-3xl mx-auto">
                                <button onClick={() => setActiveLesson(null)} className="mb-4 flex items-center text-gray-500 hover:text-brand-600 transition text-sm">
                                    <Icons.ChevronLeft className="w-4 h-4 ml-1"/> بازگشت به لیست درس‌ها
                                </button>

                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                                    <div className="flex border-b border-gray-100">
                                        <button 
                                            onClick={() => setTab('lesson')}
                                            className={`flex-1 py-4 font-bold text-sm transition flex items-center justify-center gap-2 ${tab === 'lesson' ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-600' : 'text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            <Icons.BookOpen className="w-4 h-4"/> درسنامه
                                        </button>
                                        <button 
                                            onClick={() => setTab('questions')}
                                            className={`flex-1 py-4 font-bold text-sm transition flex items-center justify-center gap-2 ${tab === 'questions' ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-600' : 'text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            <Icons.Layout className="w-4 h-4"/> نمونه سوالات ({activeLesson.questions.length})
                                        </button>
                                    </div>

                                    <div className="p-6 flex-grow overflow-y-auto">
                                        {tab === 'lesson' ? (
                                            <LessonContent lesson={activeLesson} />
                                        ) : (
                                            <QuestionsContent questions={activeLesson.questions} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
