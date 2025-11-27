// ========== التطبيق الرئيسي مع التحسينات ==========
const dualTaro = new DualTaroSystem();

// إنشاء النجوم العشوائية
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.right = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// إدارة التنقل بين الأقسام
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            
            // إزالة النشاط من جميع العناصر
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // إضافة النشاط للعنصر الحالي
            item.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// 🔧 تحسين: دالة لعرض الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
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

// 🔧 تحسين: إضافة التنسيق تلقائياً
function injectNotificationStyles() {
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
}

// 🔧 تحسين: إضافة أزرار إدارة الكاش
function addCacheManagement() {
    const sidebarActions = document.querySelector('.sidebar-actions');
    
    const cacheBtn = document.createElement('button');
    cacheBtn.className = 'btn btn-outline btn-block';
    cacheBtn.id = 'cacheBtn';
    cacheBtn.innerHTML = '<i class="fas fa-broom"></i> تنظيف الذاكرة';
    
    cacheBtn.addEventListener('click', function() {
        dualTaro.clearCache();
        showNotification('✓ تم تنظيف الذاكرة المؤقتة', 'success');
    });
    
    sidebarActions.appendChild(cacheBtn);
}

// الدوال الرئيسية للتحليل
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

    // 🔧 تحسين: إضافة مؤشر تحميل
    const calculateBtn = document.getElementById('calculateBtn');
    const originalText = calculateBtn.innerHTML;
    calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل...';
    calculateBtn.classList.add('btn-loading');

    // استخدام setTimeout للسماح بواجهة المستخدم بالتحديث
    setTimeout(() => {
        try {
            // حساب وعرض جميع النتائج
            showSystem4Results(student, mother, father);
            showZodiacAnalysis(student, studentBirth, target, targetBirth);
            
            if (target) {
                showDominanceAnalysis(student, target);
                showCompatibilityResults(student, mother, father, target, targetMother, targetFather);
            } else {
                showCompatibilityNoTarget();
            }
            
            calculateAndDisplayAllEnergyResults(student, mother, father);
            
            // الانتقال تلقائياً إلى قسم نظام القرعة
            document.querySelector('.nav-item[data-target="system4"]').click();
            
            showNotification('✓ تم الانتهاء من التحليل بنجاح', 'success');
        } catch (error) {
            console.error('خطأ في التحليل:', error);
            showNotification('❌ حدث خطأ أثناء التحليل', 'info');
        } finally {
            // إعادة زر الحساب إلى وضعه الطبيعي
            calculateBtn.innerHTML = originalText;
            calculateBtn.classList.remove('btn-loading');
        }
    }, 100);
}

// باقي الدوال (showSystem4Results, showZodiacAnalysis, showDominanceAnalysis) تبقى كما هي
// ... [نفس الكود السابق لكل هذه الدوال]

function showSystem4Results(student, mother, father) {
    const container = document.getElementById('system4Content');
    
    if (!student) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 15px; color: var(--danger-color);"></i>
                <h3>أدخل اسم الطالب على الأقل</h3>
            </div>
        `;
        return;
    }

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
            result: { stone: '----', stoneName: 'غير مدخل' } 
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
            result: { stone: '----', stoneName: 'غير مدخل' } 
        });
    }

    // الحصول على النتيجة النهائية بناء على الترتيب
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
                        <div style="font-size: 0.8rem; margin-top: 8px; color: var(--text-secondary);">
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

    container.innerHTML = content;
}

function showZodiacAnalysis(student, studentBirth, target, targetBirth) {
    const container = document.getElementById('zodiacContent');
    
    if (!student) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 15px; color: var(--danger-color);"></i>
                <h3>أدخل اسم الطالب على الأقل</h3>
            </div>
        `;
        return;
    }

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

    container.innerHTML = content;
}

function showDominanceAnalysis(student, target) {
    const container = document.getElementById('dominanceContent');
    
    if (!student || !target) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 15px; color: var(--danger-color);"></i>
                <h3>${!student ? 'أدخل اسم الطالب' : 'أدخل اسم المطلوب'} لعرض نتائج الحلبة</h3>
            </div>
        `;
        return;
    }

    const studentDual = dualTaro.calculateNameDual(student);
    const targetDual = dualTaro.calculateNameDual(target);
    const dominanceResult = dualTaro.calculateDominance(studentDual.large.sum, targetDual.large.sum);
    
    if (!dominanceResult) {
        container.innerHTML = `
            <div class="no-results">
                <p>لا توجد نتائج للحلبة</p>
            </div>
        `;
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

    container.innerHTML = content;
}

// دالة جديدة لعرض التوافق بشكل موازي
function showCompatibilityResults(student, mother, father, target, targetMother, targetFather) {
    const studentDual = dualTaro.calculateNameDual(student);
    const motherDual = dualTaro.calculateNameDual(mother);
    const fatherDual = dualTaro.calculateNameDual(father);
    const targetDual = dualTaro.calculateNameDual(target);
    const targetMotherDual = dualTaro.calculateNameDual(targetMother);
    const targetFatherDual = dualTaro.calculateNameDual(targetFather);

    const largeContainer = document.getElementById('largeCompatibilityResults');
    const smallContainer = document.getElementById('smallCompatibilityResults');
    
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
    largeContainer.innerHTML = largeResults.map(item => createCompactCompatibilityItem(item)).join('');

    // عرض النتائج للجمل الصغير
    smallContainer.innerHTML = smallResults.map(item => createCompactCompatibilityItem(item)).join('');
}

// دالة إنشاء عنصر توافق مضغوط
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

// تحديث دالة showCompatibilityNoTarget
function showCompatibilityNoTarget() {
    const largeContainer = document.getElementById('largeCompatibilityResults');
    const smallContainer = document.getElementById('smallCompatibilityResults');
    
    const message = `
        <div class="compatibility-item">
            <div class="no-results" style="padding: 30px; text-align: center;">
                <i class="fas fa-info-circle" style="font-size: 3rem; margin-bottom: 15px; color: var(--info-color);"></i>
                <h3>بيانات غير كافية</h3>
                <p>أدخل اسم المطلوب لعرض تحليل التوافق</p>
            </div>
        </div>
    `;
    
    largeContainer.innerHTML = message;
    smallContainer.innerHTML = message;
}

function calculateAndDisplayAllEnergyResults(student, mother, father) {
    const studentDual = dualTaro.calculateNameDual(student);
    const motherDual = dualTaro.calculateNameDual(mother);
    const fatherDual = dualTaro.calculateNameDual(father);

    // عرض نتائج الطاقة لجميع المجموعات
    displayEnergyResults('student-mother-days-results', studentDual, motherDual, null, false);
    displayEnergyResults('student-father-days-results', studentDual, null, fatherDual, false);
    displayEnergyResults('student-parents-days-results', studentDual, motherDual, fatherDual, false);
    
    displayEnergyResults('student-mother-months-results', studentDual, motherDual, null, true);
    displayEnergyResults('student-father-months-results', studentDual, null, fatherDual, true);
    displayEnergyResults('student-parents-months-results', studentDual, motherDual, fatherDual, true);
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
        container.innerHTML = `
            <div class="no-results">
                <p>لا توجد نتائج للطاقة</p>
            </div>
        `;
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
    
    // العودة إلى قسم بيانات الإدخال
    document.querySelector('.nav-item[data-target="input-data"]').click();
    
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

// إدارة التبويبات الداخلية
function initInternalTabs() {
    // تبويبات التوافق
    document.querySelectorAll('.compatibility-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const systemId = this.getAttribute('data-system');
            const parent = this.closest('.results-content');
            
            parent.querySelectorAll('.compatibility-tab').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.compatibility-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(systemId + 'Compatibility').classList.add('active');
        });
    });

    // تبويبات الطاقة
    document.querySelectorAll('.energy-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const systemId = this.getAttribute('data-system');
            const parent = this.closest('.results-content');
            
            parent.querySelectorAll('.energy-tab').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.energy-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(systemId + 'Energy').classList.add('active');
        });
    });

    // تبويبات المجموعات
    document.querySelectorAll('.combination-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const combinationId = this.getAttribute('data-combination');
            const parent = this.closest('.energy-content');
            
            parent.querySelectorAll('.combination-tab').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.combination-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(combinationId + '-content').classList.add('active');
        });
    });
}

// أحداث الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة النجوم
    createStars();
    
    // إدارة التنقل
    initNavigation();
    
    // إدارة التبويبات الداخلية
    initInternalTabs();
    
    // 🔧 تحسين: إدارة الكاش والإشعارات
    injectNotificationStyles();
    addCacheManagement();

    // الوضع الليلي
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> وضع النهار';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> وضع النهار';
            showNotification('🌙 تم تفعيل الوضع الليلي', 'success');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> وضع الليل';
            showNotification('☀️ تم تفعيل وضع النهار', 'success');
        }
    });

    // الأحداث الرئيسية
    document.getElementById('calculateBtn').addEventListener('click', calculateAllResults);
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('sampleBtn').addEventListener('click', loadSampleData);

    // تفعيل Enter
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateAllResults();
    });
});