// ========== التطبيق الرئيسي ==========
const dualTaro = new DualTaroSystem();

// إدارة التنقل
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // إزالة النشاط من جميع الأزرار والأقسام
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // إضافة النشاط للزر والقسم الحالي
            button.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// إدارة تبويبات الطاقة
function initEnergyTabs() {
    const energyTabs = document.querySelectorAll('.energy-tab');
    
    energyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // إزالة النشاط من جميع التبويبات
            energyTabs.forEach(t => t.classList.remove('active'));
            
            // إضافة النشاط للتبويب الحالي
            this.classList.add('active');
            
            // تحديث عرض الطاقة حسب النوع
            updateEnergyDisplay(type);
        });
    });
}

function updateEnergyDisplay(type) {
    const student = document.getElementById('studentName').value.trim();
    const mother = document.getElementById('motherName').value.trim();
    const father = document.getElementById('fatherName').value.trim();
    
    if (!student) return;
    
    const studentDual = dualTaro.calculateNameDual(student);
    const motherDual = mother ? dualTaro.calculateNameDual(mother) : { large: { sum: 0 }, small: { sum: 0 } };
    const fatherDual = father ? dualTaro.calculateNameDual(father) : { large: { sum: 0 }, small: { sum: 0 } };
    
    const isMonth = type === 'months';
    
    // تحديث النتائج
    displayEnergyResults('motherEnergyResults', studentDual, motherDual, null, isMonth);
    displayEnergyResults('fatherEnergyResults', studentDual, null, fatherDual, isMonth);
    displayEnergyResults('parentsEnergyResults', studentDual, motherDual, fatherDual, isMonth);
}

// 🔧 دالة لعرض الإشعارات
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // إضافة الأنماط إذا لم تكن موجودة
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--card-border);
                border-radius: 8px;
                padding: 15px 20px;
                box-shadow: var(--glow);
                z-index: 10000;
                transform: translateX(0);
                transition: transform 0.3s ease;
            }
            .notification.fade-out {
                transform: translateX(100%);
            }
            .notification-success {
                border-color: var(--success-color);
                background: linear-gradient(135deg, rgba(220, 252, 231, 0.1), rgba(187, 247, 208, 0.1));
            }
            .notification-info {
                border-color: var(--info-color);
                background: linear-gradient(135deg, rgba(219, 234, 254, 0.1), rgba(191, 219, 254, 0.1));
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text);
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 3 ثوان
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 🔧 دالة مساعدة لعرض النتائج بشكل آمن
function displayResult(containerId, content) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container not found: ${containerId}`);
        return;
    }
    
    container.innerHTML = content || createNoResultsHTML('لا توجد نتائج لعرضها');
}

// 🔧 دالة موحدة للنتائج الفارغة
function createNoResultsHTML(message = 'لا توجد بيانات كافية') {
    return `
        <div class="no-results">
            <i class="fas fa-info-circle"></i>
            <h3>${message}</h3>
            <p>يرجى إدخال البيانات المطلوبة</p>
        </div>
    `;
}

// ========== الدوال الرئيسية للتحليل ==========

function calculateAllResults() {
    const student = document.getElementById('studentName').value.trim();
    const studentBirth = document.getElementById('studentBirth').value;
    const mother = document.getElementById('motherName').value.trim();
    const father = document.getElementById('fatherName').value.trim();
    const target = document.getElementById('targetName').value.trim();
    const targetBirth = document.getElementById('targetBirth').value;
    const targetMother = document.getElementById('targetMotherName').value.trim();
    const targetFather = document.getElementById('targetFatherName').value.trim();

    if (!student) {
        showNotification('⚠️ يرجى إدخال اسم الطالب على الأقل', 'info');
        return;
    }

    try {
        // إضافة مؤشر تحميل
        const calculateBtn = document.getElementById('calculateBtn');
        const originalText = calculateBtn.innerHTML;
        calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل...';
        calculateBtn.disabled = true;

        // استخدام setTimeout للسماح بواجهة المستخدم بالتحديث
        setTimeout(() => {
            try {
                // حساب جميع النتائج
                showSystem4Results(student, mother, father);
                showZodiacAnalysis(student, studentBirth, target, targetBirth);
                
                if (target) {
                    showDominanceAnalysis(student, target);
                    showCompatibilityResults(student, mother, father, target, targetMother, targetFather);
                } else {
                    showCompatibilityNoTarget();
                }
                
                calculateAndDisplayEnergyResults(student, mother, father);
                
                showNotification('✓ تم الانتهاء من التحليل بنجاح', 'success');
                
                // الانتقال إلى قسم القرعة
                document.querySelector('.nav-btn[data-target="system4"]').click();
                
            } catch (error) {
                console.error('خطأ في التحليل:', error);
                showNotification('❌ حدث خطأ أثناء التحليل', 'info');
            } finally {
                // إعادة زر الحساب إلى وضعه الطبيعي
                calculateBtn.innerHTML = originalText;
                calculateBtn.disabled = false;
            }
        }, 100);
        
    } catch (error) {
        console.error('خطأ في التحليل:', error);
        showNotification('❌ حدث خطأ أثناء التحليل', 'info');
    }
}

function showSystem4Results(student, mother, father) {
    if (!student) {
        displayResult('system4Content', null);
        return;
    }

    try {
        const results = [];
        
        // الطالب (إجباري)
        results.push({ 
            name: student, 
            type: 'الطالب', 
            result: dualTaro.calculateSystem4Result(student) 
        });
        
        // الأم (اختياري)
        if (mother && mother.trim() !== '') {
            results.push({ 
                name: mother, 
                type: 'الأم', 
                result: dualTaro.calculateSystem4Result(mother) 
            });
        } else {
            results.push({ 
                name: '----', 
                type: 'الأم', 
                result: { stone: '𐩱', stoneName: 'غير مدخل' } 
            });
        }
        
        // الأب (اختياري)
        if (father && father.trim() !== '') {
            results.push({ 
                name: father, 
                type: 'الأب', 
                result: dualTaro.calculateSystem4Result(father) 
            });
        } else {
            results.push({ 
                name: '----', 
                type: 'الأب', 
                result: { stone: '𐩱', stoneName: 'غير مدخل' } 
            });
        }

        const finalSequence = results.map(person => person.result.stone).join('-');
        const quranResult = getQuranResultBySequence(finalSequence);

        let content = `
            <div class="system4-results">
                <div class="stones-container">
                    ${results.map(person => `
                        <div class="stone-card">
                            <div class="stone-name">${person.type}</div>
                            <div class="stone-char">${person.result.stone}</div>
                            <div class="stone-type">${person.name}</div>
                            <div style="font-size: 0.9rem; margin-top: 10px; color: var(--text-secondary);">
                                ${person.result.stoneName}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="final-sequence">
                    ${finalSequence.replace(/-/g, ' - ')}
                </div>
                
                ${quranResult ? `
                    <div class="quran-result">
                        <div class="quran-reference">${quranResult.reference}</div>
                        <div class="quran-text">${quranResult.text}</div>
                    </div>
                ` : `
                    <div class="no-results">
                        <p>لا توجد نتيجة قرآنية لهذا التسلسل</p>
                    </div>
                `}
            </div>
        `;

        displayResult('system4Content', content);
        
    } catch (error) {
        console.error('Error in system4:', error);
        displayResult('system4Content', createNoResultsHTML('حدث خطأ في حساب نظام القرعة'));
    }
}

function showZodiacAnalysis(student, studentBirth, target, targetBirth) {
    if (!student) {
        displayResult('zodiacContent', null);
        return;
    }

    try {
        const studentSign = dualTaro.getZodiacSign(studentBirth);
        const studentZodiacData = studentSign ? dualTaro.zodiacData[studentSign] : null;

        const targetSign = dualTaro.getZodiacSign(targetBirth);
        const targetZodiacData = targetSign ? dualTaro.zodiacData[targetSign] : null;

        const compatibility = targetSign ? dualTaro.getZodiacCompatibility(studentSign, targetSign) : "غير محدد";

        let content = `
            <div class="zodiac-grid">
                <div class="zodiac-card">
                    <div class="zodiac-person">الطالب: ${student}</div>
                    ${studentSign ? `
                        <div class="zodiac-details">
                            <div class="zodiac-detail">
                                <span class="zodiac-label">البرج</span>
                                <span class="zodiac-value">${studentSign}</span>
                            </div>
                            <div class="zodiac-detail">
                                <span class="zodiac-label">الكوكب</span>
                                <span class="zodiac-value">${studentZodiacData.planet}</span>
                            </div>
                            <div class="zodiac-detail">
                                <span class="zodiac-label">المعدن</span>
                                <span class="zodiac-value">${studentZodiacData.metal}</span>
                            </div>
                            <div class="zodiac-detail">
                                <span class="zodiac-label">اليوم</span>
                                <span class="zodiac-value">${studentZodiacData.day}</span>
                            </div>
                        </div>
                    ` : `
                        <div class="no-results" style="padding: 20px;">
                            <p>أدخل تاريخ ميلاد الطالب</p>
                        </div>
                    `}
                </div>
                
                <div class="zodiac-card">
                    <div class="zodiac-person">${target ? `المطلوب: ${target}` : 'المطلوب: غير محدد'}</div>
                    ${targetSign ? `
                        <div class="zodiac-details">
                            <div class="zodiac-detail">
                                <span class="zodiac-label">البرج</span>
                                <span class="zodiac-value">${targetSign}</span>
                            </div>
                            <div class="zodiac-detail">
                                <span class="zodiac-label">الكوكب</span>
                                <span class="zodiac-value">${targetZodiacData.planet}</span>
                            </div>
                            <div class="zodiac-detail">
                                <span class="zodiac-label">المعدن</span>
                                <span class="zodiac-value">${targetZodiacData.metal}</span>
                            </div>
                            <div class="zodiac-detail">
                                <span class="zodiac-label">اليوم</span>
                                <span class="zodiac-value">${targetZodiacData.day}</span>
                            </div>
                        </div>
                    ` : `
                        <div class="no-results" style="padding: 20px;">
                            <p>${target ? 'أدخل تاريخ ميلاد المطلوب' : 'أدخل بيانات المطلوب'}</p>
                        </div>
                    `}
                </div>
            </div>
            
            ${studentSign && targetSign ? `
                <div class="compatibility-result">
                    <div class="compatibility-title">تحليل التوافق بين البرجين</div>
                    <div class="compatibility-text">
                        ${compatibility}
                    </div>
                </div>
            ` : ''}
        `;

        displayResult('zodiacContent', content);
        
    } catch (error) {
        console.error('Error in zodiac:', error);
        displayResult('zodiacContent', createNoResultsHTML('حدث خطأ في تحليل الإبراج'));
    }
}

function showDominanceAnalysis(student, target) {
    if (!student || !target) {
        displayResult('dominanceContent', createNoResultsHTML('أدخل اسم الطالب والمطلوب لعرض نتائج الحلبة'));
        return;
    }

    try {
        const studentDual = dualTaro.calculateNameDual(student);
        const targetDual = dualTaro.calculateNameDual(target);
        const dominanceResult = dualTaro.calculateDominance(studentDual.large.sum, targetDual.large.sum);
        
        if (!dominanceResult) {
            displayResult('dominanceContent', createNoResultsHTML('لا توجد نتائج للحلبة'));
            return;
        }

        const studentClass = dominanceResult.studentStatus === 'غالب' ? 'winner' : 'loser';
        const targetClass = dominanceResult.targetStatus === 'غالب' ? 'winner' : 'loser';
        const studentStatusClass = dominanceResult.studentStatus === 'غالب' ? 'status-dominant' : 'status-dominated';
        const targetStatusClass = dominanceResult.targetStatus === 'غالب' ? 'status-dominant' : 'status-dominated';

        const content = `
            <div class="dominance-grid">
                <div class="dominance-player ${studentClass}">
                    <div class="player-role">الطالب</div>
                    <div class="player-name">${student}</div>
                    <div class="player-number">${dominanceResult.studentNumber}</div>
                    <div class="player-status ${studentStatusClass}">
                        ${dominanceResult.studentStatus}
                    </div>
                </div>
                
                <div class="dominance-player ${targetClass}">
                    <div class="player-role">المطلوب</div>
                    <div class="player-name">${target}</div>
                    <div class="player-number">${dominanceResult.targetNumber}</div>
                    <div class="player-status ${targetStatusClass}">
                        ${dominanceResult.targetStatus}
                    </div>
                </div>
            </div>
            
            <div class="dominance-final">
                <div class="final-result">${dominanceResult.dominant} يغلب</div>
                <div class="final-description">${dominanceResult.description}</div>
            </div>
        `;

        displayResult('dominanceContent', content);
        
    } catch (error) {
        console.error('Error in dominance:', error);
        displayResult('dominanceContent', createNoResultsHTML('حدث خطأ في تحليل الحلبة'));
    }
}

function showCompatibilityResults(student, mother, father, target, targetMother, targetFather) {
    try {
        const studentDual = dualTaro.calculateNameDual(student);
        const motherDual = mother ? dualTaro.calculateNameDual(mother) : { large: { sum: 0 }, small: { sum: 0 } };
        const fatherDual = father ? dualTaro.calculateNameDual(father) : { large: { sum: 0 }, small: { sum: 0 } };
        const targetDual = dualTaro.calculateNameDual(target);
        const targetMotherDual = targetMother ? dualTaro.calculateNameDual(targetMother) : { large: { sum: 0 }, small: { sum: 0 } };
        const targetFatherDual = targetFather ? dualTaro.calculateNameDual(targetFather) : { large: { sum: 0 }, small: { sum: 0 } };

        const combinations = [
            { title: "أصــــــل التـــوافـق", key: "origin" },
            { title: "بـــاب الـام", key: "mother" },
            { title: "بـــاب الـاب", key: "father" },
            { title: "الـــوالدين", key: "parents" }
        ];

        // حساب النتائج لجميع المجموعات
        const largeResults = combinations.map(combo => {
            let result;
            switch(combo.key) {
                case "origin":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, 0, 0, 0, 0,
                        targetDual.large.sum, targetDual.small.sum, 0, 0, 0, 0
                    ).large;
                    break;
                case "mother":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, motherDual.large.sum, motherDual.small.sum, 0, 0,
                        targetDual.large.sum, targetDual.small.sum, targetMotherDual.large.sum, targetMotherDual.small.sum, 0, 0
                    ).large;
                    break;
                case "father":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, 0, 0, fatherDual.large.sum, fatherDual.small.sum,
                        targetDual.large.sum, targetDual.small.sum, 0, 0, targetFatherDual.large.sum, targetFatherDual.small.sum
                    ).large;
                    break;
                case "parents":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, motherDual.large.sum, motherDual.small.sum, fatherDual.large.sum, fatherDual.small.sum,
                        targetDual.large.sum, targetDual.small.sum, targetMotherDual.large.sum, targetMotherDual.small.sum, targetFatherDual.large.sum, targetFatherDual.small.sum
                    ).large;
                    break;
            }
            return { ...combo, result };
        });

        const smallResults = combinations.map(combo => {
            let result;
            switch(combo.key) {
                case "origin":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, 0, 0, 0, 0,
                        targetDual.large.sum, targetDual.small.sum, 0, 0, 0, 0
                    ).small;
                    break;
                case "mother":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, motherDual.large.sum, motherDual.small.sum, 0, 0,
                        targetDual.large.sum, targetDual.small.sum, targetMotherDual.large.sum, targetMotherDual.small.sum, 0, 0
                    ).small;
                    break;
                case "father":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, 0, 0, fatherDual.large.sum, fatherDual.small.sum,
                        targetDual.large.sum, targetDual.small.sum, 0, 0, targetFatherDual.large.sum, targetFatherDual.small.sum
                    ).small;
                    break;
                case "parents":
                    result = dualTaro.calculateCompatibility(
                        studentDual.large.sum, studentDual.small.sum, motherDual.large.sum, motherDual.small.sum, fatherDual.large.sum, fatherDual.small.sum,
                        targetDual.large.sum, targetDual.small.sum, targetMotherDual.large.sum, targetMotherDual.small.sum, targetFatherDual.large.sum, targetFatherDual.small.sum
                    ).small;
                    break;
            }
            return { ...combo, result };
        });

        // عرض النتائج للجمل الكبير
        const largeContainer = document.getElementById('largeCompatibilityResults');
        largeContainer.innerHTML = largeResults.map(item => createCompactCompatibilityItem(item)).join('');

        // عرض النتائج للجمل الصغير
        const smallContainer = document.getElementById('smallCompatibilityResults');
        smallContainer.innerHTML = smallResults.map(item => createCompactCompatibilityItem(item)).join('');
        
    } catch (error) {
        console.error('Error in compatibility:', error);
        displayResult('compatibilityContent', createNoResultsHTML('حدث خطأ في حساب التوافق'));
    }
}

function createCompactCompatibilityItem(item) {
    const result = item.result;
    
    // حساب النسب
    const normalized9 = (result.mod9.percent * 0.66).toFixed(1);
    const normalized8 = (result.mod8.percent * 0.66).toFixed(1);
    const system5Percent = result.mod5.percent;
    
    const twoDTotal = (result.mod9.percent + result.mod8.percent).toFixed(1);
    const threeDTotal = (parseFloat(normalized9) + parseFloat(normalized8) + system5Percent).toFixed(1);

    // تحديد لون المؤشر بناءً على النسبة الثلاثية
    const totalPercentage = parseFloat(threeDTotal);
    let percentageClass = 'compatibility-percentage-low';
    let totalClass = 'compatibility-total-low';
    
    if (totalPercentage >= 60) {
        percentageClass = 'compatibility-percentage-high';
        totalClass = 'compatibility-total-high';
    } else if (totalPercentage >= 40) {
        percentageClass = 'compatibility-percentage-medium';
        totalClass = 'compatibility-total-medium';
    }

    return `
        <div class="compatibility-item">
            <div class="item-header">
                <div class="item-title">${item.title}</div>
                <div class="item-percentage ${percentageClass}">
                    ${twoDTotal}% ثنائي
                </div>
            </div>
            
            <div class="systems-compact">
                <!-- نظام 9 -->
                <div class="system-row">
                    <div class="system-info">
                        <div class="system-name">
                            <i class="fas fa-hashtag"></i>
                            نظام 9
                        </div>
                        <div class="system-description">
                            ${result.mod9Value} - ${result.mod9.text}
                        </div>
                    </div>
                    <div class="system-values">
                        <div class="system-percent system-original">${result.mod9.percent}%</div>
                        <div class="system-percent system-normalized">→ ${normalized9}%</div>
                    </div>
                </div>
                
                <!-- نظام 8 -->
                <div class="system-row">
                    <div class="system-info">
                        <div class="system-name">
                            <i class="fas fa-hashtag"></i>
                            نظام 8
                        </div>
                        <div class="system-description">
                            ${result.mod8Value} - ${result.mod8.text}
                        </div>
                    </div>
                    <div class="system-values">
                        <div class="system-percent system-original">${result.mod8.percent}%</div>
                        <div class="system-percent system-normalized">→ ${normalized8}%</div>
                    </div>
                </div>
                
                <!-- نظام 5 -->
                <div class="system-row">
                    <div class="system-info">
                        <div class="system-name">
                            <i class="fas fa-hashtag"></i>
                            نظام 5
                        </div>
                        <div class="system-description">
                            ${result.mod5.text}
                        </div>
                        <div class="system-status">
                            <div class="status-indicator ${result.mod5.meets ? 'status-meets' : 'status-not-meets'}"></div>
                            <div class="status-text">${result.mod5.meets ? 'يجتمعان' : 'لا يجتمعان'}</div>
                        </div>
                    </div>
                    <div class="system-values">
                        <div class="system-percent system-original">${system5Percent}%</div>
                        <div class="system-total">قيمة ثابتة</div>
                    </div>
                </div>
            </div>
            
            <div class="final-total ${totalClass}">
                <div class="total-label">المجموع النهائي</div>
                <div class="total-value">${threeDTotal}%</div>
                <div class="total-type">نسبة ثلاثية</div>
            </div>
        </div>
    `;
}

function showCompatibilityNoTarget() {
    const largeContainer = document.getElementById('largeCompatibilityResults');
    const smallContainer = document.getElementById('smallCompatibilityResults');
    
    const message = createNoResultsHTML('أدخل اسم المطلوب لعرض تحليل التوافق');
    
    largeContainer.innerHTML = message;
    smallContainer.innerHTML = message;
}

function calculateAndDisplayEnergyResults(student, mother, father) {
    if (!student) return;
    
    const studentDual = dualTaro.calculateNameDual(student);
    const motherDual = mother ? dualTaro.calculateNameDual(mother) : { large: { sum: 0 }, small: { sum: 0 } };
    const fatherDual = father ? dualTaro.calculateNameDual(father) : { large: { sum: 0 }, small: { sum: 0 } };
    
    // عرض النتائج المفصلة (الأيام أولاً)
    displayEnergyResults('motherEnergyResults', studentDual, motherDual, null, false);
    displayEnergyResults('fatherEnergyResults', studentDual, null, fatherDual, false);
    displayEnergyResults('parentsEnergyResults', studentDual, motherDual, fatherDual, false);
}

function displayEnergyResults(containerId, studentDual, motherDual, fatherDual, isMonth) {
    const container = document.getElementById(containerId);
    const results = [];
    const times = isMonth ? dualTaro.months : dualTaro.days;

    times.forEach(time => {
        const energy = dualTaro.calculateEnergy(
            studentDual.large.sum, studentDual.small.sum,
            motherDual ? motherDual.large.sum : 0, motherDual ? motherDual.small.sum : 0,
            fatherDual ? fatherDual.large.sum : 0, fatherDual ? fatherDual.small.sum : 0,
            time.value, isMonth
        );
        
        const energyData = isMonth ? energy.small : energy.large;
        results.push({
            ...energyData,
            timeType: isMonth ? 'شهر' : 'يوم',
            fullTimeName: time.name,
            order: time.order
        });
    });

    results.sort((a, b) => a.order - b.order);
    
    if (results.length === 0) {
        container.innerHTML = createNoResultsHTML('لا توجد نتائج للطاقة');
        return;
    }

    container.innerHTML = results.map(energy => {
        // تحديد لون المؤشر بناءً على نسبة الطاقة (معكوس)
        let valueClass = 'energy-value-low';
        
        if (energy.ratio >= 60) {
            valueClass = 'energy-value-high';
        } else if (energy.ratio >= 30) {
            valueClass = 'energy-value-medium';
        }

        return `
            <div class="energy-card">
                <div class="energy-header">
                    <div class="energy-title">
                        ${energy.fullTimeName}
                        <span class="time-badge">
                            ${energy.timeType} ${energy.order}
                        </span>
                    </div>
                    <div class="energy-value ${valueClass}">${energy.ratio.toFixed(1)}%</div>
                </div>
                <div class="energy-details">
                    <div class="energy-detail">
                        <span class="energy-label">نوع الطاقة</span>
                        <span class="energy-text">${energy.energyType}</span>
                    </div>
                    <div class="energy-detail">
                        <span class="energy-label">التأثير</span>
                        <span class="energy-text">${energy.energyEffect}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// دوال مساعدة
function clearForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('studentBirth').value = '';
    document.getElementById('motherName').value = '';
    document.getElementById('fatherName').value = '';
    document.getElementById('targetName').value = '';
    document.getElementById('targetBirth').value = '';
    document.getElementById('targetMotherName').value = '';
    document.getElementById('targetFatherName').value = '';
    
    // مسح جميع النتائج
    document.querySelectorAll('.results-content').forEach(container => {
        container.innerHTML = '';
    });
    
    showNotification('✓ تم مسح جميع البيانات', 'success');
}

function loadSampleData() {
    document.getElementById('studentName').value = 'شذى';
    document.getElementById('studentBirth').value = '1991-12-10';
    document.getElementById('motherName').value = 'مريم';
    document.getElementById('fatherName').value = 'حسن';
    document.getElementById('targetName').value = 'بوينص';
    document.getElementById('targetBirth').value = '2000-10-10';
    document.getElementById('targetMotherName').value = 'مريم ';
    document.getElementById('targetFatherName').value = 'عبدالله ';
    
    showNotification('✓ تم تحميل البيانات التجريبية', 'success');
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
        '𐩨-𐩴-𐩴': { reference: 'التوبة 188', text: 'لِيَجْزِيَ اللَّهُ كُلَّ نَفْسٍ mَّا كَسَبَتْ' },
        '𐩨-𐩴-𐩵': { reference: 'الأحقاف 35', text: 'فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ مِنَ الرُّسُلِ' },
        '𐩨-𐩵-𐩱': { reference: 'يوسف 24', text: 'وَلَقَدْ هَمَّتْ بِهِ وَهَمَّ بِهَا لَوْلَا أَن رَّأَىٰ بُرْهَانَ رَبِّهِ' },
        '𐩨-𐩵-𐩨': { reference: 'الطلاق 9', text: 'فَاتَّقُوا اللَّهَ يَا أُولِي الْأَلْبَابِ لَعَلَّكُمْ تُفْلِحُونَ' },
        '𐩨-𐩵-𐩴': { reference: 'الحج 65', text: 'أَلَمْ تَرَ أَنَّ اللَّهَ سَخَّرَ لَكُم mَّا فِي الْأَرْضِ' },
        '𐩨-𐩵-𐩵': { reference: 'الكهف 110', text: 'فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحدًا' },
        '𐩴-𐩱-𐩱': { reference: 'النور 55 - طه 77', text: 'وَعَدَ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَعَمِلُوا الصَّالِحَاتِ لَيَسْتَخْلِفَنَّهُمْ فِي الْأَرْضِ' },
        '𐩴-𐩱-𐩨': { reference: 'النور 38 - الروم 32', text: 'لِيَجْزِيَهُمُ اللَّهُ أَحْسَنَ مَا عَمِلُوا وَيَزِيدَهُم mِّن فَضْلِهِ' },
        '𐩴-𐩱-𐩴': { reference: 'يوسف 87', text: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ' },
        '𐩴-𐩱-𐩵': { reference: 'الأحزاب 25', text: 'وَرَدَّ اللَّهُ الَّذِينَ كَفَرُوا بِغَيْظِهِمْ لَمْ يَنَالُوا خَيْرًا' },
        '𐩴-𐩨-𐩱': { reference: 'البقرة 17', text: 'مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ ذَهَبَ اللَّهُ بِنُورِهِمْ' },
        '𐩴-𐩨-𐩨': { reference: 'القمر 11-14', text: 'فَفَتَحْنَا أَبْوَابَ السَّمَاءِ بِمَاءٍ mُّنْهَمِرٍ' },
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
        '𐩵-𐩨-𐩱': { reference: 'القمر 11', text: 'فَفَتَحْنَا أَبْوَابَ السَّمَاءِ بِمَاءٍ mُّنْهَمِرٍ' },
        '𐩵-𐩨-𐩨': { reference: 'يونس 23', text: 'فَلَمَّا أَنْجَاهُمْ إِذَا هُمْ يَبْغُونَ فِي الْأَرْضِ بِغَيْرِ الْحَقِّ' },
        '𐩵-𐩨-𐩴': { reference: 'الحجر 22', text: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ' },
        '𐩵-𐩨-𐩵': { reference: 'الأنفال 19', text: 'إِن تَسْتَفْتِحُوا فَقَدْ جَاءَكُمُ الْفَتْحُ' },
        '𐩵-𐩴-𐩱': { reference: 'الحديد 20', text: 'اعْلَمُوا أَنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ وَزِينَةٌ وَتَفَاخُرٌ بَيْنَكُمْ' },
        '𐩵-𐩴-𐩨': { reference: 'المنافقون 9', text: 'يَا أَيُّhَا الَّذِينَ آمَنُوا لَا تُلْهِكُمْ أَمْوَالُكُمْ وَلَا أَوْلَادُكُمْ عَن ذِكْرِ اللَّهِ' },
        '𐩵-𐩴-𐩴': { reference: 'الحديد 25', text: 'لَقَدْ أَرْسَلْنَا رُسُلَنَا بِالْبَيِّنَاتِ وَأَنزَلْنَا مَعَهُمُ الْكِتَابَ وَالْمِيزانَ' },
        '𐩵-𐩴-𐩵': { reference: 'يونس 57', text: 'يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم mَّوْعِظَةٌ مِّن رَّبِّكُمْ وَشِفَاءٌ لِّمَا فِي الصُّدُورِ' },
        '𐩵-𐩵-𐩱': { reference: 'لقمان 7 - البقرة 286', text: 'وَإِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا وَلَّىٰ مُسْتَكْبِرًا كَأَن لَّمْ يَسْمَعْهَا' },
        '𐩵-𐩵-𐩨': { reference: 'آل عمران 160 - الفتح 5', text: 'إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ' },
        '𐩵-𐩵-𐩴': { reference: 'الكهف 157', text: 'وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنزَلَ اللَّهُ قَالُوا بَلْ نَتَّبِعُ مَا وَجَدْنَا عَلَيْهِ آبَاءَنَا' },
        '𐩵-𐩵-𐩵': { reference: 'الروم 4-5', text: 'فِي بِضْعِ سِنِينَ ۗ لِلَّهِ الْأَمْرُ مِن قَبْلُ وَمِن بَعْدُ ۚ وَيَوْمَئِذٍ يَفْرَحُ الْمُؤْمِنُونَ' }
    };

    return quranResults[sequence] || null;
}

// أحداث الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إدارة التنقل
    initNavigation();
    
    // إدارة تبويبات الطاقة
    initEnergyTabs();

    // الأحداث الرئيسية
    document.getElementById('calculateBtn').addEventListener('click', calculateAllResults);
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('sampleBtn').addEventListener('click', loadSampleData);

    // تفعيل Enter
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateAllResults();
    });
});