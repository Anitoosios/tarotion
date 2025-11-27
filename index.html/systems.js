// ========== الأنظمة الأساسية مع التحسينات ==========
class DualTaroSystem {
    constructor() {
        this.largeAbjad = {
            'ا':1, 'أ':1, 'إ':1, 'آ':1, 'ب':2, 'ج':3, 'د':4, 'ه':5, 
            'و':6, 'ز':7, 'ح':8, 'ط':9, 'ي':10, 'ك':20, 'ل':30, 'م':40,
            'ن':50, 'س':60, 'ع':70, 'ف':80, 'ص':90, 'ق':100, 'ر':200,
            'ش':300, 'ت':400, 'ث':500, 'خ':600, 'ذ':700, 'ض':800,
            'ظ':900, 'غ':1000, 'ة':400, 'ى':10, 'ؤ':6, 'ئ':6, 'ء':6, ' ':0
        };

        this.smallAbjad = {
            'ا':111, 'أ':13, 'إ':13, 'آ':13, 'ب':3, 'ج':53, 'د':35, 'ه':6, 
            'و':13, 'ز':18, 'ح':9, 'ط':10, 'ي':11, 'ك':101, 'ل':71, 'م':90,
            'ن':106, 'س':120, 'ع':130, 'ف':81, 'ص':95, 'ق':181, 'ر':201,
            'ش':360, 'ت':401, 'ث':501, 'خ':601, 'ذ':731, 'ض':801,
            'ظ':901, 'غ':1060, 'ة':401, 'ى':11, 'ؤ':13, 'ئ':13, 'ء':13, ' ':0
        };

        this.system4Stones = {
            1: { stone: '𐩱', name: 'الحجر الأول' },
            2: { stone: '𐩨', name: 'الحجر الثاني' },
            3: { stone: '𐩴', name: 'الحجر الثالث' },
            4: { stone: '𐩵', name: 'الحجر الرابع' }
        };

        this.dominanceRules = {
            "1-3": true, "1-5": true, "1-7": true, "1-9": true,
            "2-1": true, "2-4": true, "2-6": true, "2-8": true,
            "3-2": true, "3-5": true, "3-7": true, "3-9": true,
            "4-1": true, "4-3": true, "4-6": true, "4-8": true,
            "5-2": true, "5-4": true, "5-7": true, "5-9": true,
            "6-1": true, "6-3": true, "6-5": true, "6-8": true,
            "7-2": true, "7-4": true, "7-6": true, "7-9": true,
            "8-1": true, "8-3": true, "8-5": true, "8-7": true,
            "9-2": true, "9-4": true, "9-6": true, "9-8": true
        };

        this.equalNumberRules = {
            1: "الطالب", 2: "المطلوب", 3: "الطالب", 4: "المطلوب",
            5: "الطالب", 6: "المطلوب", 7: "الطالب", 8: "المطلوب", 9: "الطالب"
        };

        this.zodiacData = {
            "الجدي": { dates: "23.12 - 20.1", element: "earth", planet: "زحل", metal: "الرصاص", day: "السبت", workingSigns: "الميزان - الدلو - الجدي" },
            "الدلو": { dates: "21.1 - 19.2", element: "air", planet: "زحل", metal: "الرصاص", day: "السبت", workingSigns: "الميزان - الدلو - الجدي" },
            "الحوت": { dates: "20.2 - 21.3", element: "water", planet: "المشتري", metal: "القصدير", day: "الخميس", workingSigns: "السرطان - الحوت - القوس" },
            "الحمل": { dates: "22.3 - 20.4", element: "fire", planet: "المريخ", metal: "النحاس", day: "الثلاثاء", workingSigns: "الأسد - الجدي - العقرب - الحمل" },
            "الثور": { dates: "21.4 - 21.5", element: "earth", planet: "الزهرة", metal: "الحديد", day: "الجمعة", workingSigns: "الدلو - الحوت - الميزان - الثور" },
            "الجوزاء": { dates: "22.5 - 21.6", element: "air", planet: "عطارد", metal: "الزئبق", day: "الأربعاء", workingSigns: "الجوزاء - العذراء" },
            "السرطان": { dates: "22.6 - 23.7", element: "water", planet: "القمر", metal: "الفضة", day: "الاثنين", workingSigns: "السرطان - الحوت - القوس" },
            "الأسد": { dates: "24.7 - 23.8", element: "fire", planet: "الشمس", metal: "الذهب", day: "الأحد", workingSigns: "الحمل - الأسد" },
            "العذراء": { dates: "24.8 - 23.9", element: "earth", planet: "عطارد", metal: "الزئبق", day: "الأربعاء", workingSigns: "الجوزاء - العذراء" },
            "الميزان": { dates: "24.9 - 23.10", element: "air", planet: "الزهرة", metal: "الحديد", day: "الجمعة", workingSigns: "الدلو - الحوت - الميزان - الثور" },
            "العقرب": { dates: "24.10 - 22.11", element: "water", planet: "المريخ", metal: "النحاس", day: "الثلاثاء", workingSigns: "الأسد - الجدي - العقرب - الحمل" },
            "القوس": { dates: "23.11 - 22.12", element: "fire", planet: "المشتري", metal: "القصدير", day: "الخميس", workingSigns: "السرطان - الحوت - القوس" }
        };

        this.elementLetters = {
            "fire": "ا ه ط م ف ش ذ",
            "earth": "ب و ي ن ص ت ض", 
            "air": "ج ز ك س ق ث ظ",
            "water": "د ح ل ع ر خ غ"
        };

        this.elementCompatibility = {
            "fire": { good: ["air", "fire"], bad: ["water", "earth"] },
            "earth": { good: ["water", "earth"], bad: ["air", "fire"] },
            "air": { good: ["fire", "air"], bad: ["earth", "water"] },
            "water": { good: ["earth", "water"], bad: ["fire", "air"] }
        };

        // النسب الأصلية محفوظة كما هي
        this.desc9 = [
            {}, 
            {text: "فهو وطيء لا خير فيه", percent: 20},
            {text: "فهو طيب", percent: 37.2},
            {text: "أوله وطيء آخره رديء يتبعها فرج", percent: 18.6},
            {text: "فيه قوة بمن وتوفيقه وطيء", percent: 24.8},
            {text: "بيت البنين", percent: 43.4},
            {text: "أوله طيب وآخره هم وغم", percent: 0.4},
            {text: "بيت الفراش ووقت لك وآخر عليك", percent: 31},
            {text: "بيت الاتكاء فهو جيد ونيل مطلب", percent: 49.5},
            {text: "فرحيل ونزاع وفرار", percent: 0.1}
        ];

        this.desc8 = [
            {},
            {text: "فيه خير ورزق", percent: 33},
            {text: "يتزوجها ويلد منها", percent: 27.5},
            {text: "لا يتزوجها ولا خير فيه", percent: 0.3},
            {text: "يتزوجها بطلب منها", percent: 22},
            {text: "اول زواجهما ضيق يتبعها وسع", percent: 12.4},
            {text: "يتزوجها ويلد منها وتحبه الناس والسلاطين", percent: 44},
            {text: "يتزوجها ويلد منها", percent: 38.5},
            {text: "يتزوجها وتحبه ويحبها وتلد منه", percent: 49.6}
        ];

        // إضافة نظام 5 الجديد
        this.desc5 = [
            {},
            {text: "يجتمعان - توافق جيد", percent: 10},
            {text: "لا يجتمعان - عدم توافق", percent: 1.5},
            {text: "يجتمعان - توافق متوسط", percent: 10}, 
            {text: "لا يجتمعان - عدم توافق", percent: 1.5},
            {text: "يجتمعان - توافق ممتاز", percent: 10}
        ];

        this.energyTable = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 98, 7.8, 6.8, 7.4, 88, 5.8, 94, 6.6, 6.2, 90, 98, 5.5],
            [0, 5.75, 3.75, 2.75, 3.35, 47.5, 17.5, 5.35, 2.55, 2.15, 4.95, 57.5, 10],
            [0, 94, 7.4, 6.4, 7, 84, 5.4, 90, 4.1, 5.8, 86, 94, 4.65],
            [0, 7.3, 53, 4.3, 49, 63, 3.3, 6.9, 4.1, 3.7, 6.5, 73, 2.5],
            [0, 6.6, 4.6, 36, 4.2, 56, 2.6, 6.2, 34, 30, 5.8, 66, 1.8],
            [0, 6.2, 4.2, 32, 3.8, 52, 2.2, 5.8, 30, 26, 5.4, 62, 1.4],
            [0, 5.5, 3.5, 2.5, 3.1, 45, 15, 5.1, 2.3, 1.9, 4.7, 55, 7.5]
        ];

        this.days = [
            {name: "الأحد", value: 44, order: 1},
            {name: "الإثنين", value: 642, order: 2},
            {name: "الثلاثاء", value: 1069, order: 3},
            {name: "الأربعاء", value: 311, order: 4},
            {name: "الخميس", value: 741, order: 5},
            {name: "الجمعة", value: 544, order: 6},
            {name: "السبت", value: 493, order: 7}
        ];

        this.months = [
            {name: "محرم", value: 288, order: 1},
            {name: "صفر", value: 370, order: 2},
            {name: "ربيع الأول", value: 319, order: 3},
            {name: "ربيع الثاني", value: 1083, order: 4},
            {name: "جمادى الأولى", value: 85, order: 5},
            {name: "جمادى الآخرة", value: 849, order: 6},
            {name: "رجب", value: 205, order: 7},
            {name: "شعبان", value: 423, order: 8},
            {name: "رمضان", value: 1091, order: 9},
            {name: "شوال", value: 337, order: 10},
            {name: "ذو القعدة", value: 1311, order: 11},
            {name: "ذو الحجة", value: 1148, order: 12}
        ];

        this.energyTypes = ["", "الجن", "الهواء", "السحر", "العين", "الدم", "الصفراء", "الكرب"];
        this.energyEffects = ["", "الجن", "عين انثى", "عضال", "عين رجل", "قرين", "ريح", "ارضي", "الدم", "الصفراء", "سحر ادمي", "قرينة", "الغم"];

        // 🔧 تحسين: إضافة نظام الكاش
        this.cache = {
            nameDual: new Map(),
            system4: new Map(),
            compatibility: new Map(),
            energy: new Map()
        };

        // 🔧 تحسين: تنظيف الكاش تلقائياً كل 5 دقائق
        setInterval(() => {
            this.clearExpiredCache();
        }, 5 * 60 * 1000);
    }

    // 🔧 تحسين: دالة لإنشاء مفتاح كاش فريد
    createCacheKey(...args) {
        return args.map(arg => 
            typeof arg === 'string' ? arg : JSON.stringify(arg)
        ).join('|');
    }

    // 🔧 تحسين: تنظيف الكاش المنتهي
    clearExpiredCache() {
        const now = Date.now();
        for (const [cacheType, cacheMap] of Object.entries(this.cache)) {
            for (const [key, value] of cacheMap.entries()) {
                if (now - value.timestamp > 10 * 60 * 1000) { // 10 دقائق
                    cacheMap.delete(key);
                }
            }
        }
    }

    // 🔧 تحسين: دالة مسح الكاش يدوياً
    clearCache(cacheType = null) {
        if (cacheType && this.cache[cacheType]) {
            this.cache[cacheType].clear();
            console.log(`✓ تم تنظيف كاش ${cacheType}`);
        } else {
            // مسح كل الكاش
            Object.values(this.cache).forEach(cacheMap => cacheMap.clear());
            console.log('✓ تم تنظيف كل الذاكرة المؤقتة');
        }
    }

    reduceToSingleDigit(number) {
        let num = number;
        while (num > 9) {
            let sum = 0;
            const numStr = num.toString();
            for (let i = 0; i < numStr.length; i++) {
                sum += parseInt(numStr[i]);
            }
            num = sum;
        }
        return num;
    }

    calculateDominance(studentLarge, targetLarge) {
        if (!studentLarge || !targetLarge) {
            return null;
        }

        const studentReduced = this.reduceToSingleDigit(studentLarge);
        const targetReduced = this.reduceToSingleDigit(targetLarge);
        
        let dominant, description, studentStatus, targetStatus;

        if (studentReduced === targetReduced) {
            dominant = this.equalNumberRules[studentReduced];
            description = `الطالب والمطلوب نفس الرقم (${studentReduced}) - ${dominant} يغلب`;
            studentStatus = dominant === "الطالب" ? "غالب" : "مغلوب";
            targetStatus = dominant === "المطلوب" ? "غالب" : "مغلوب";
        }
        else if (this.dominanceRules[`${studentReduced}-${targetReduced}`]) {
            dominant = "الطالب";
            description = `الطالب (${studentReduced}) يغلب المطلوب (${targetReduced})`;
            studentStatus = "غالب";
            targetStatus = "مغلوب";
        }
        else if (this.dominanceRules[`${targetReduced}-${studentReduced}`]) {
            dominant = "المطلوب";
            description = `المطلوب (${targetReduced}) يغلب الطالب (${studentReduced})`;
            studentStatus = "مغلوب";
            targetStatus = "غالب";
        }
        else {
            dominant = studentReduced > targetReduced ? "الطالب" : "المطلوب";
            description = dominant === "الطالب" ? 
                `الطالب (${studentReduced}) يغلب المطلوب (${targetReduced})` :
                `المطلوب (${targetReduced}) يغلب الطالب (${studentReduced})`;
            studentStatus = dominant === "الطالب" ? "غالب" : "مغلوب";
            targetStatus = dominant === "المطلوب" ? "غالب" : "مغلوب";
        }
        
        return {
            studentNumber: studentReduced,
            targetNumber: targetReduced,
            dominant: dominant,
            description: description,
            studentStatus: studentStatus,
            targetStatus: targetStatus
        };
    }

    getZodiacSign(birthDate) {
        if (!birthDate) return null;
        
        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        
        if ((month === 12 && day >= 23) || (month === 1 && day <= 20)) return "الجدي";
        if ((month === 1 && day >= 21) || (month === 2 && day <= 19)) return "الدلو";
        if ((month === 2 && day >= 20) || (month === 3 && day <= 21)) return "الحوت";
        if ((month === 3 && day >= 22) || (month === 4 && day <= 20)) return "الحمل";
        if ((month === 4 && day >= 21) || (month === 5 && day <= 21)) return "الثور";
        if ((month === 5 && day >= 22) || (month === 6 && day <= 21)) return "الجوزاء";
        if ((month === 6 && day >= 22) || (month === 7 && day <= 23)) return "السرطان";
        if ((month === 7 && day >= 24) || (month === 8 && day <= 23)) return "الأسد";
        if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "العذراء";
        if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "الميزان";
        if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "العقرب";
        if ((month === 11 && day >= 23) || (month === 12 && day <= 22)) return "القوس";
        
        return null;
    }

    getLetterElement(char) {
        for (const [element, letters] of Object.entries(this.elementLetters)) {
            if (letters.includes(char)) {
                return element;
            }
        }
        return null;
    }

    analyzeNameElements(name) {
        if (!name) return { elements: [], dominantElement: null };
        
        const elements = [];
        for (let char of name) {
            if (char !== ' ') {
                const element = this.getLetterElement(char);
                if (element) {
                    elements.push({ char, element });
                }
            }
        }
        
        const elementCount = {};
        elements.forEach(item => {
            elementCount[item.element] = (elementCount[item.element] || 0) + 1;
        });
        
        let dominantElement = null;
        let maxCount = 0;
        for (const [element, count] of Object.entries(elementCount)) {
            if (count > maxCount) {
                maxCount = count;
                dominantElement = element;
            }
        }
        
        return { elements, dominantElement };
    }

    getZodiacCompatibility(sign1, sign2) {
        if (!sign1 || !sign2) return "غير محدد";
        
        const element1 = this.zodiacData[sign1]?.element;
        const element2 = this.zodiacData[sign2]?.element;
        
        if (!element1 || !element2) return "غير محدد";
        
        if (this.elementCompatibility[element1].good.includes(element2)) {
            return `توافق جيد - برج ${sign1} ${this.getElementName(element1)} وبرج ${sign2} ${this.getElementName(element2)}`;
        } else if (this.elementCompatibility[element1].bad.includes(element2)) {
            return `توافق ضعيف - برج ${sign1} ${this.getElementName(element1)} وبرج ${sign2} ${this.getElementName(element2)}`;
        } else {
            return `توافق متوسط - برج ${sign1} ${this.getElementName(element1)} وبرج ${sign2} ${this.getElementName(element2)}`;
        }
    }

    getElementName(element) {
        const names = {
            "fire": "الناري",
            "earth": "الترابي", 
            "air": "الهوائي",
            "water": "المائي"
        };
        return names[element] || element;
    }

    // 🔧 تحسين: دالة حساب الاسم مع الكاش
    calculateNameDual(name) {
        if (!name) return { 
            large: {sum: 0, details: []}, 
            small: {sum: 0, details: []}
        };
        
        const cacheKey = this.createCacheKey('nameDual', name);
        const cached = this.cache.nameDual.get(cacheKey);
        
        if (cached) {
            return cached.result;
        }
        
        // الحساب العادي مع تحسين الأداء
        let largeSum = 0;
        let smallSum = 0;
        let largeDetails = [];
        let smallDetails = [];
        
        // استخدام for...of مع تحسين الأداء
        const nameArray = Array.from(name);
        for (let i = 0; i < nameArray.length; i++) {
            const char = nameArray[i];
            const largeValue = this.largeAbjad[char] || 0;
            const smallValue = this.smallAbjad[char] || 0;
            
            largeSum += largeValue;
            smallSum += smallValue;
            
            if (largeValue > 0) {
                largeDetails.push({char, value: largeValue});
            }
            if (smallValue > 0) {
                smallDetails.push({char, value: smallValue});
            }
        }
        
        const result = {
            large: { sum: largeSum, details: largeDetails },
            small: { sum: smallSum, details: smallDetails }
        };
        
        // حفظ في الكاش
        this.cache.nameDual.set(cacheKey, {
            result: result,
            timestamp: Date.now()
        });
        
        return result;
    }

    // 🔧 تحسين: دالة نظام القرعة مع الكاش
    calculateSystem4Result(name) {
        if (!name) return { 
            sum: 0, details: [], reduction: 0, stone: '----',
            stoneName: 'غير محسوب', reductionSteps: []
        };
        
        const cacheKey = this.createCacheKey('system4', name);
        const cached = this.cache.system4.get(cacheKey);
        
        if (cached) {
            return cached.result;
        }
        
        // الحساب العادي
        let sum = 0;
        let details = [];
        
        for (let char of name) {
            const value = this.largeAbjad[char] || 0;
            sum += value;
            if (value > 0 && char !== ' ') {
                details.push({char, value});
            }
        }
        
        let reductionResult = this.reduceToSingleDigitWithSteps(sum);
        const stoneNumber = (reductionResult.final % 4 === 0) ? 4 : (reductionResult.final % 4);
        const stoneInfo = this.system4Stones[stoneNumber] || { stone: '----', name: 'غير معروف' };
        
        const result = {
            sum,
            details,
            reduction: reductionResult.final,
            stone: stoneInfo.stone,
            stoneName: stoneInfo.name,
            stoneNumber,
            reductionSteps: reductionResult.steps
        };
        
        // حفظ في الكاش
        this.cache.system4.set(cacheKey, {
            result: result,
            timestamp: Date.now()
        });
        
        return result;
    }

    reduceToSingleDigitWithSteps(number) {
        let steps = [];
        let current = number;
        
        while (current > 9) {
            let numStr = current.toString();
            let sum = 0;
            let step = '';
            
            for (let i = 0; i < numStr.length; i++) {
                sum += parseInt(numStr[i]);
                step += numStr[i];
                if (i < numStr.length - 1) {
                    step += ' + ';
                }
            }
            step += ' = ' + sum;
            steps.push(step);
            current = sum;
        }
        
        return {
            final: current,
            steps: steps
        };
    }

    calculateMod5Compatibility(studentLarge, studentSmall, parent1Large, parent1Small, 
                             parent2Large, parent2Small, targetLarge, targetSmall, 
                             targetParent1Large, targetParent1Small, targetParent2Large, targetParent2Small) {
        
        const largeTotal = studentLarge + parent1Large + parent2Large + 
                         targetLarge + targetParent1Large + targetParent2Large;
        const smallTotal = studentSmall + parent1Small + parent2Small + 
                         targetSmall + targetParent1Small + targetParent2Small;
        
        const largeMod5 = (largeTotal % 5) || 5;
        const smallMod5 = (smallTotal % 5) || 5;
        
        // التحقق من النطاق
        const safeLargeMod5 = Math.max(1, Math.min(5, largeMod5));
        const safeSmallMod5 = Math.max(1, Math.min(5, smallMod5));
        
        return {
            large: {
                totalValue: largeTotal,
                mod5Value: safeLargeMod5,
                meets: (safeLargeMod5 === 1 || safeLargeMod5 === 3 || safeLargeMod5 === 5),
                ...this.desc5[safeLargeMod5]
            },
            small: {
                totalValue: smallTotal,
                mod5Value: safeSmallMod5,
                meets: (safeSmallMod5 === 1 || safeSmallMod5 === 3 || safeSmallMod5 === 5),
                ...this.desc5[safeSmallMod5]
            }
        };
    }

    // 🔧 تحسين: دالة التوافق مع الكاش
    calculateCompatibility(studentLarge, studentSmall, studentParent1Large, studentParent1Small, 
                          studentParent2Large, studentParent2Small, targetLarge, targetSmall, 
                          targetParent1Large, targetParent1Small, targetParent2Large, targetParent2Small) {
        
        const cacheKey = this.createCacheKey('compatibility', 
            studentLarge, studentSmall, studentParent1Large, studentParent1Small,
            studentParent2Large, studentParent2Small, targetLarge, targetSmall,
            targetParent1Large, targetParent1Small, targetParent2Large, targetParent2Small
        );
        
        const cached = this.cache.compatibility.get(cacheKey);
        if (cached) {
            return cached.result;
        }
        
        // الحساب العادي
        const largeTotal = studentLarge + studentParent1Large + studentParent2Large + 
                         targetLarge + targetParent1Large + targetParent2Large + 7;
        const smallTotal = studentSmall + studentParent1Small + studentParent2Small + 
                         targetSmall + targetParent1Small + targetParent2Small + 7;
        
        const largeMod9 = (largeTotal % 9) || 9;
        const largeMod8 = (largeTotal % 8) || 8;
        const smallMod9 = (smallTotal % 9) || 9;
        const smallMod8 = (smallTotal % 8) || 8;
        
        const mod5Result = this.calculateMod5Compatibility(
            studentLarge, studentSmall, studentParent1Large, studentParent1Small, 
            studentParent2Large, studentParent2Small, targetLarge, targetSmall, 
            targetParent1Large, targetParent1Small, targetParent2Large, targetParent2Small
        );
        
        const result = {
            large: {
                mod9: { ...this.desc9[largeMod9], value: largeMod9 },
                mod8: { ...this.desc8[largeMod8], value: largeMod8 },
                mod5: mod5Result.large,
                totalValue: largeTotal,
                mod9Value: largeMod9,
                mod8Value: largeMod8,
                mod5Value: mod5Result.large.mod5Value
            },
            small: {
                mod9: { ...this.desc9[smallMod9], value: smallMod9 },
                mod8: { ...this.desc8[smallMod8], value: smallMod8 },
                mod5: mod5Result.small,
                totalValue: smallTotal,
                mod9Value: smallMod9,
                mod8Value: smallMod8,
                mod5Value: mod5Result.small.mod5Value
            }
        };
        
        // حفظ في الكاش
        this.cache.compatibility.set(cacheKey, {
            result: result,
            timestamp: Date.now()
        });
        
        return result;
    }

    // 🔧 تحسين: دالة الطاقة مع التحقق المحسن
    calculateEnergy(studentLarge, studentSmall, parent1Large, parent1Small, 
                   parent2Large, parent2Small, timeValue, isMonth = false) {
        
        const largeTotal = studentLarge + parent1Large + parent2Large + timeValue;
        const smallTotal = studentSmall + parent1Small + parent2Small + timeValue;
        
        const largeMod7 = (largeTotal % 7) || 7;
        const largeMod12 = (largeTotal % 12) || 12;
        const smallMod7 = (smallTotal % 7) || 7;
        const smallMod12 = (smallTotal % 12) || 12;
        
        // 🔧 تحسين: تحقق مزدوج من النطاق
        const safeLargeMod7 = Math.max(1, Math.min(7, Math.floor(largeMod7)));
        const safeLargeMod12 = Math.max(1, Math.min(12, Math.floor(largeMod12)));
        const safeSmallMod7 = Math.max(1, Math.min(7, Math.floor(smallMod7)));
        const safeSmallMod12 = Math.max(1, Math.min(12, Math.floor(smallMod12)));
        
        // 🔧 تحسين: تحقق من وجود القيم في الجدول
        const getEnergyValue = (mod7, mod12) => {
            if (!this.energyTable[mod7] || this.energyTable[mod7][mod12] === undefined) {
                console.warn(`قيمة طاقة غير موجودة: [${mod7}][${mod12}]`);
                return 0; // قيمة افتراضية آمنة
            }
            return this.energyTable[mod7][mod12];
        };
        
        const largeRatio = getEnergyValue(safeLargeMod7, safeLargeMod12);
        const smallRatio = getEnergyValue(safeSmallMod7, safeSmallMod12);
        
        // 🔧 تحسين: تحقق من صحة أنواع الطاقة والتأثيرات
        const getSafeEnergyType = (mod7) => {
            return this.energyTypes[mod7] || "غير محدد";
        };
        
        const getSafeEnergyEffect = (mod12) => {
            return this.energyEffects[mod12] || "غير محدد";
        };
        
        const timeName = isMonth ? 
            this.months.find(m => m.value === timeValue)?.name || "غير معروف" :
            this.days.find(d => d.value === timeValue)?.name || "غير معروف";
        
        const timeOrder = isMonth ? 
            this.months.find(m => m.value === timeValue)?.order || 0 :
            this.days.find(d => d.value === timeValue)?.order || 0;
        
        return {
            large: {
                timeName: timeName,
                timeOrder: timeOrder,
                energyType: getSafeEnergyType(safeLargeMod7),
                energyEffect: getSafeEnergyEffect(safeLargeMod12),
                ratio: Math.max(0, Math.min(100, largeRatio)), // 🔧 تأكد من النطاق 0-100
                total: largeTotal,
                mod7: safeLargeMod7,
                mod12: safeLargeMod12,
                energyClass: largeRatio >= 60 ? 'high' : largeRatio >= 30 ? 'medium' : 'low'
            },
            small: {
                timeName: timeName,
                timeOrder: timeOrder,
                energyType: getSafeEnergyType(safeSmallMod7),
                energyEffect: getSafeEnergyEffect(safeSmallMod12),
                ratio: Math.max(0, Math.min(100, smallRatio)), // 🔧 تأكد من النطاق 0-100
                total: smallTotal,
                mod7: safeSmallMod7,
                mod12: safeSmallMod12,
                energyClass: smallRatio >= 60 ? 'high' : smallRatio >= 30 ? 'medium' : 'low'
            }
        };
    }
}

// دالة للحصول على النتيجة القرآنية بناء على التسلسل
function getQuranResultBySequence(sequence) {
    const quranResults = {
        '𐩱-𐩱-𐩱': { reference: 'المدثر 12', text: 'مَا سَلَكَكُمْ فِي سَقَرَ' },
        '𐩱-𐩱-𐩨': { reference: 'المنافقون 5', text: 'وَإِذَا قِيلَ لَهُمْ تَعَالَوْا يَسْتَغْفِرْ لَكُمْ رَسُولُ اللَّهِ لَوَّوْا رُءُوسَهُمْ' },
        '𐩱-𐩱-𐩴': { reference: 'آل عمران 170', text: 'فَرِحِينَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ' },
        '𐩱-𐩱-𐩵': { reference: 'التوبة 51', text: 'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا' },
        '𐩱-𐩨-𐩱': { reference: 'آل عمران 30', text: 'يَوْمَ تَجِدُ كُلُّ نَفْسٍ مَّا عَمِلَتْ مِنْ خَيْرٍ مُّحْضَرًا' },
        '𐩱-𐩨-𐩨': { reference: 'الحجر 45-46', text: 'إِنَّ الْمُتَّقِينَ فِي جَنَّاتٍ وَعُيُونٍ ادْخُلُوهَا بِسَلَامٍ آمِنِينَ' },
        '𐩱-𐩨-𐩴': { reference: 'مريم 62', text: 'لَّا يَسْمَعُونَ فِيهَا لَغْوًا إِلَّا سَلَامًا' },
        '𐩱-𐩨-𐩵': { reference: 'الطلاق 2-3', text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ' },
        '𐩱-𐩴-𐩱': { reference: 'الروم 46', text: 'وَمِنْ آيَاتِهِ أَن يُرْسِلَ الرِّيَاحَ مُبَشِّرَاتٍ' },
        '𐩱-𐩴-𐩨': { reference: 'الأعراف 192-193', text: 'وَلَا يَسْتَطِيعُونَ لَهُمْ نَصْرًا وَلَا أَنفُسَهُمْ يَنصُرُونَ' },
        '𐩱-𐩴-𐩴': { reference: 'فصلت 46 - آل عمران 120', text: 'مَنْ عَمِلَ صَالِحًا فَلِنَفْسِهِ وَمَنْ أَسَاءَ فَعَلَيْهَا' },
        '𐩱-𐩴-𐩵': { reference: 'آل عمران 103', text: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا' },
        '𐩱-𐩵-𐩱': { reference: 'المائدة 90', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ' },
        '𐩱-𐩵-𐩨': { reference: 'آل عمران 13', text: 'قَدْ كَانَ لَكُمْ آيَةٌ فِي فِئَتَيْنِ الْتَقَتَا' },
        '𐩱-𐩵-𐩴': { reference: 'البقرة 208', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً' },
        '𐩱-𐩵-𐩵': { reference: 'النساء 71', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا خُذُوا حِذْرَكُمْ' },
        '𐩨-𐩱-𐩱': { reference: 'لقمان 20', text: 'أَلَمْ تَرَوْا أَنَّ اللَّهَ سَخَّرَ لَكُم مَّا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ' },
        '𐩨-𐩱-𐩨': { reference: 'النور 38', text: 'لِيَجْزِيَهُمُ اللَّهُ أَحْسَنَ مَا عَمِلُوا وَيَزِيدَهُم مِّن فَضْلِهِ' },
        '𐩨-𐩱-𐩴': { reference: 'المائدة 23', text: 'قَالَ رَجُلَانِ مِنَ الَّذِينَ يَخَافُونَ أَنْعَمَ اللَّهُ عَلَيْهِمَا' },
        '𐩨-𐩱-𐩵': { reference: 'الأنبياء 76', text: 'وَنُوحًا إِذْ نَادَىٰ مِن قَبْلُ فَاسْتَجَبْنَا لَهُ فَنَجَّيْنَاهُ وَأَهْلَهُ مِنَ الْكَرْبِ الْعَظِيمِ' },
        '𐩨-𐩨-𐩱': { reference: 'ق 34-35', text: 'ادْخُلُوهَا بِسَلَامٍ ذَٰلِكَ يَوْمُ الْخُلُودِ لَهُم مَّا يَشَاءُونَ فِيهَا وَلَدَيْنَا مَزِيدٌ' },
        '𐩨-𐩨-𐩨': { reference: 'المائدة 3', text: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي' },
        '𐩨-𐩨-𐩴': { reference: 'الإسراء 82 - يونس 57 - التوبة 14 - الشعراء 80', text: 'وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ' },
        '𐩨-𐩨-𐩵': { reference: 'الأنفال 66', text: 'الْآنَ خَفَّفَ اللَّهُ عَنكُمْ وَعَلِمَ أَنَّ فِيكُمْ ضَعفًا' },
        '𐩨-𐩴-𐩱': { reference: 'الحديد 20', text: 'اعْلَمُوا أَنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ وَزِينَةٌ وَتَفَاخُرٌ بَيْنَكُمْ' },
        '𐩨-𐩴-𐩨': { reference: 'لقمان 27', text: 'وَلَوْ أَنَّمَا فِي الْأَرْضِ مِن شَجَرَةٍ أَقْلَامٌ وَالْبَحْرُ يَمُدُّهُ مِن بَعْدِهِ سَبْعَةُ أَبْحُرٍ مَّا نَفِدَتْ كَلِمَاتُ اللَّهِ' },
        '𐩨-𐩴-𐩴': { reference: 'التوبة 188', text: 'لِيَجْزِيَ اللَّهُ كُلَّ نَفْسٍ مَّا كَسَبَتْ' },
        '𐩨-𐩴-𐩵': { reference: 'الأحقاف 35', text: 'فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ مِنَ الرُّسُلِ' },
        '𐩨-𐩵-𐩱': { reference: 'يوسف 24', text: 'وَلَقَدْ هَمَّتْ بِهِ وَهَمَّ بِهَا لَوْلَا أَن رَّأَىٰ بُرْهَانَ رَبِّهِ' },
        '𐩨-𐩵-𐩨': { reference: 'الطلاق 9', text: 'فَاتَّقُوا اللَّهَ يَا أُولِي الْأَلْبَابِ لَعَلَّكُمْ تُفْلِحُونَ' },
        '𐩨-𐩵-𐩴': { reference: 'الحج 65', text: 'أَلَمْ تَرَ أَنَّ اللَّهَ سَخَّرَ لَكُم مَّا فِي الْأَرْضِ' },
        '𐩨-𐩵-𐩵': { reference: 'الكهف 110', text: 'فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحدًا' },
        '𐩴-𐩱-𐩱': { reference: 'النور 55 - طه 77', text: 'وَعَدَ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَعَمِلُوا الصَّالِحَاتِ لَيَسْتَخْلِفَنَّهُمْ فِي الْأَرْضِ' },
        '𐩴-𐩱-𐩨': { reference: 'النور 38 - الروم 32', text: 'لِيَجْزِيَهُمُ اللَّهُ أَحْسَنَ مَا عَمِلُوا وَيَزِيدَهُم mِّن فَضْلِهِ' },
        '𐩴-𐩱-𐩴': { reference: 'يوسف 87', text: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ' },
        '𐩴-𐩱-𐩵': { reference: 'الأحزاب 25', text: 'وَرَدَّ اللَّهُ الَّذِينَ كَفَرُوا بِغَيْظِهِمْ لَمْ يَنَالُوا خَيْرًا' },
        '𐩴-𐩨-𐩱': { reference: 'البقرة 17', text: 'مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ ذَهَبَ اللَّهُ بِنُورِهِمْ' },
        '𐩴-𐩨-𐩨': { reference: 'القمر 11-14', text: 'فَفَتَحْنَا أَبْوَابَ السَّمَاءِ بِمَاءٍ مُّنْهَمِرٍ' },
        '𐩴-𐩨-𐩴': { reference: 'الزخرف 11 - النحل 11', text: 'وَالَّذِي نَزَّلَ مِنَ السَّمَاءِ مَاءً بِقَدَرٍ' },
        '𐩴-𐩨-𐩵': { reference: 'البقرة 286 - الطلاق 7', text: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا' },
        '𐩴-𐩴-𐩱': { reference: 'الزمر 10', text: 'قُلْ يَا عِبَادِ الَّذِينَ آمَنُوا اتَّقُوا رَبَّكُمْ ۚ لِلَّذِينَ أَحسَنُوا فِي هَٰذِهِ الدُّنْيَا حَسَنَةٌ' },
        '𐩴-𐩴-𐩨': { reference: 'طه 97', text: 'قَالَ فَاذْهَبْ فَإِنَّ لَكَ فِي الْحَيَاةِ أَن تَقُولَ لَا مِسَاسَ' },
        '𐩴-𐩴-𐩴': { reference: 'يونس 58', text: 'قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا' },
        '𐩴-𐩴-𐩵': { reference: 'النحل 37', text: 'إِن تَحْرِصْ عَلَىٰ هُدَاهُمْ فَإِنَّ اللَّهَ لَا يَهْدِي مَن يُضِلُّ' },
        '𐩴-𐩵-𐩱': { reference: 'إبراهيم 7', text: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ' },
        '𐩴-𐩵-𐩨': { reference: 'التوبة 80', text: 'اسْتَغْفِرْ لَهُمْ أَوْ لَا تَسْتَغْفِرْ لَهُمْ إِن تَسْتَغْفِرْ لَهُمْ سَبْعِينَ مَرَّةً فَلَن يَغْفِرَ اللَّهُ لَهُمْ' },
        '𐩴-𐩵-𐩴': { reference: 'إبراهيم 21', text: 'وَبَرَزُوا لِلَّهِ جَمِيعًا فَقَالَ الضُّعَفَاءُ لِلَّذِينَ اسْتَكْبَرُوا إِنَّا كُنَّا لَكُمْ تَبَعًا' },
        '𐩴-𐩵-𐩵': { reference: 'الأنبياء 103', text: 'لَا يَحْزُنُهُمُ الْفَزَعُ الْأَكْبَرُ وَتَتَلَقَّاهُمُ الْمَلَائِكَةُ هَٰذَا يَوْمُكُمُ الَّذِي كُنتُمْ تُوعَدُونَ' },
        '𐩵-𐩱-𐩱': { reference: 'ص 26', text: 'وَمَا خَلَقْنَا السَّمَاءَ وَالْأَرْضَ وَمَا بَيْنَهُمَا بَاطِلًا' },
        '𐩵-𐩱-𐩨': { reference: 'الصافات 143', text: 'فَلَوْلَا أَنَّهُ كَانَ مِنَ الْمُسَبِّحِينَ' },
        '𐩵-𐩱-𐩴': { reference: 'يوسف 101 - غافر 44', text: 'فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ' },
        '𐩵-𐩱-𐩵': { reference: 'هود 123', text: 'وَلِلَّهِ غَيْبُ السَّمَاوَاتِ وَالْأَرْضِ وَإِلَيْهِ يُرْجَعُ الْأَمْرُ كُلُّهُ' },
        '𐩵-𐩨-𐩱': { reference: 'القمر 11', text: 'فَفَتَحْنَا أَبْوَابَ السَّمَاءِ بِمَاءٍ مُّنْهَمِرٍ' },
        '𐩵-𐩨-𐩨': { reference: 'يونس 23', text: 'فَلَمَّا أَنْجَاهُمْ إِذَا هُمْ يَبْغُونَ فِي الْأَرْضِ بِغَيْرِ الْحَقِّ' },
        '𐩵-𐩨-𐩴': { reference: 'الحشر 22', text: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ' },
        '𐩵-𐩨-𐩵': { reference: 'الأنفال 19', text: 'إِن تَسْتَفْتِحُوا فَقَدْ جَاءَكُمُ الْفَتْحُ' },
        '𐩵-𐩴-𐩱': { reference: 'الحديد 20', text: 'اعْلَمُوا أَنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ وَزِينَةٌ وَتَفَاخُرٌ بَيْنَكُمْ' },
        '𐩵-𐩴-𐩨': { reference: 'المنافقون 9', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُلْهِكُمْ أَمْوَالُكُمْ وَلَا أَوْلَادُكُمْ عَن ذِكْرِ اللَّهِ' },
        '𐩵-𐩴-𐩴': { reference: 'الحديد 25', text: 'لَقَدْ أَرْسَلْنَا رُسُلَنَا بِالْبَيِّنَاتِ وَأَنزَلْنَا مَعَهُمُ الْكِتَابَ وَالْمِيزانَ' },
        '𐩵-𐩴-𐩵': { reference: 'يونس 57', text: 'يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم مَّوْعِظَةٌ مِّن رَّبِّكُمْ وَشِفَاءٌ لِّمَا فِي الصُّدُورِ' },
        '𐩵-𐩵-𐩱': { reference: 'لقمان 7 - البقرة 286', text: 'وَإِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا وَلَّىٰ مُسْتَكْبِرًا كَأَن لَّمْ يَسْمَعْهَا' },
        '𐩵-𐩵-𐩨': { reference: 'آل عمران 160 - الفتح 5', text: 'إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ' },
        '𐩵-𐩵-𐩴': { reference: 'الكهف 157', text: 'وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنزَلَ اللَّهُ قَالُوا بَلْ نَتَّبِعُ مَا وَجَدْنَا عَلَيْهِ آبَاءَنَا' },
        '𐩵-𐩵-𐩵': { reference: 'الروم 4-5', text: 'فِي بِضْعِ سِنِينَ ۗ لِلَّهِ الْأَمْرُ مِن قَبْلُ وَمِن بَعْدُ ۚ وَيَوْمَئِذٍ يَفْرَحُ الْمُؤْمِنُونَ' }
    };

    return quranResults[sequence] || null;
}