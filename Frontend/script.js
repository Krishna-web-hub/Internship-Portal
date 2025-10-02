// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Skills Tag Management
const skillsInput = document.getElementById('skills');
const skillsTagsContainer = document.getElementById('skillsTags');
let skillsArray = [];

skillsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const skill = skillsInput.value.trim();
        if (skill && !skillsArray.includes(skill)) {
            skillsArray.push(skill);
            addSkillTag(skill);
            skillsInput.value = '';
        }
    }
});

function addSkillTag(skill) {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.innerHTML = `${skill} <i class="fas fa-times" onclick="removeSkill('${skill}')"></i>`;
    skillsTagsContainer.appendChild(tag);
}

function removeSkill(skill) {
    skillsArray = skillsArray.filter(s => s !== skill);
    renderSkillTags();
}

function renderSkillTags() {
    skillsTagsContainer.innerHTML = '';
    skillsArray.forEach(skill => addSkillTag(skill));
}

// AI Recommendations Form Handler
const profileForm = document.querySelector('.profile-form');
const recommendationCards = document.getElementById('recommendationCards');

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const course = document.getElementById('course').value;
    const interests = document.getElementById('interests').value;
    
    if (course && skillsArray.length > 0) {
        generateRecommendations(course, skillsArray, interests);
    } else {
        alert('Please select a course and add at least one skill.');
    }
});

function generateRecommendations(course, skills, interests) {
    // Simulate AI recommendation logic
    const mockInternships = [
        {
            title: 'Full Stack Developer Intern',
            company: 'TechStart Solutions',
            duration: '6 months',
            match: '92%',
            requiredSkills: ['JavaScript', 'React', 'Node.js'],
            description: 'Build modern web applications'
        },
        {
            title: 'Data Science Intern',
            company: 'Analytics Pro',
            duration: '4 months',
            match: '88%',
            requiredSkills: ['Python', 'Machine Learning', 'SQL'],
            description: 'Work on predictive analytics projects'
        },
        {
            title: 'Mobile App Developer',
            company: 'AppCraft Studios',
            duration: '3 months',
            match: '85%',
            requiredSkills: ['React Native', 'JavaScript', 'Mobile UI'],
            description: 'Create cross-platform mobile applications'
        }
    ];

    // Filter based on user skills (simple matching)
    const filteredInternships = mockInternships.filter(internship => 
        internship.requiredSkills.some(skill => 
            skills.some(userSkill => 
                userSkill.toLowerCase().includes(skill.toLowerCase()) || 
                skill.toLowerCase().includes(userSkill.toLowerCase())
            )
        )
    );

    displayRecommendations(filteredInternships.length > 0 ? filteredInternships : mockInternships.slice(0, 2));
}

function displayRecommendations(internships) {
    recommendationCards.innerHTML = '';
    
    internships.forEach(internship => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <div class="card-header">
                <h4>${internship.title}</h4>
                <span class="match-score">${internship.match} Match</span>
            </div>
            <p><strong>Company:</strong> ${internship.company}</p>
            <p><strong>Duration:</strong> ${internship.duration}</p>
            <p><strong>Description:</strong> ${internship.description}</p>
            <div class="required-skills">
                ${internship.requiredSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <button class="btn btn-outline" onclick="applyToInternship('${internship.title}')">Apply Now</button>
        `;
        recommendationCards.appendChild(card);
    });
}

function applyToInternship(title) {
    alert(`Application submitted for: ${title}\n\nNext steps:\n1. Complete your profile\n2. Upload your resume\n3. Wait for employer response`);
}

// Certificate Verification
const verifyButton = document.querySelector('.verify-form .btn');
const certInput = document.querySelector('.cert-input');
const verificationResult = document.getElementById('verificationResult');

verifyButton.addEventListener('click', () => {
    const certId = certInput.value.trim();
    if (certId) {
        verifyCertificate(certId);
    } else {
        alert('Please enter a certificate ID');
    }
});

function verifyCertificate(certId) {
    // Simulate blockchain verification
    setTimeout(() => {
        const isValid = Math.random() > 0.3; // 70% chance of valid certificate
        
        if (isValid) {
            verificationResult.innerHTML = `
                <div class="result-card verified">
                    <i class="fas fa-check-circle"></i>
                    <h4>Certificate Verified ✓</h4>
                    <p><strong>Student:</strong> ${generateRandomName()}</p>
                    <p><strong>Company:</strong> ${generateRandomCompany()}</p>
                    <p><strong>Duration:</strong> ${generateRandomDuration()}</p>
                    <p><strong>Blockchain Hash:</strong> 0x${generateRandomHash()}</p>
                    <p><strong>Verification Time:</strong> ${new Date().toLocaleString()}</p>
                </div>
            `;
        } else {
            verificationResult.innerHTML = `
                <div class="result-card invalid" style="border-color: #ef4444; background: #fef2f2;">
                    <i class="fas fa-times-circle" style="color: #ef4444;"></i>
                    <h4>Certificate Not Found ✗</h4>
                    <p>The certificate ID "${certId}" could not be verified on the blockchain.</p>
                    <p>Please check the ID and try again.</p>
                </div>
            `;
        }
    }, 1500);
    
    // Show loading state
    verificationResult.innerHTML = `
        <div class="result-card" style="border-color: #fbbf24; background: #fffbeb;">
            <i class="fas fa-spinner fa-spin" style="color: #fbbf24;"></i>
            <h4>Verifying Certificate...</h4>
            <p>Please wait while we check the blockchain...</p>
        </div>
    `;
}

// Helper functions for certificate verification
function generateRandomName() {
    const names = ['Priya Sharma', 'Rahul Kumar', 'Anjali Patel', 'Vikash Singh', 'Neha Gupta'];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomCompany() {
    const companies = ['Tech Solutions Inc.', 'Digital Innovations Ltd.', 'StartUp Hub', 'Future Tech Corp.', 'CodeCraft Studios'];
    return companies[Math.floor(Math.random() * companies.length)];
}

function generateRandomDuration() {
    const durations = ['June 2024 - August 2024', 'January 2024 - March 2024', 'September 2024 - November 2024', 'April 2024 - June 2024'];
    return durations[Math.floor(Math.random() * durations.length)];
}

function generateRandomHash() {
    return Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
}

// Marketplace Filters
const filterSelects = document.querySelectorAll('.filter-select');
filterSelects.forEach(select => {
    select.addEventListener('change', filterMarketplace);
});

function filterMarketplace() {
    const categoryFilter = filterSelects[0].value;
    const durationFilter = filterSelects[1].value;
    
    // Simple filter simulation - in real app, this would filter actual data
    console.log('Filtering marketplace:', { category: categoryFilter, duration: durationFilter });
    
    // Add visual feedback
    const cards = document.querySelectorAll('.marketplace-card');
    cards.forEach(card => {
        card.style.opacity = '0.7';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 300);
    });
}

// Course Interaction
document.querySelectorAll('.course-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseTitle = e.target.closest('.course-card').querySelector('h3').textContent;
        startCourse(courseTitle);
    });
});

function startCourse(courseTitle) {
    alert(`Starting course: ${courseTitle}\n\nYou will be redirected to the learning module.\n\nCourse features:\n• Interactive content\n• Progress tracking\n• Certificate upon completion`);
}

// Dashboard Real-time Updates
function updateDashboardStats() {
    const statCards = document.querySelectorAll('.stat-card h3');
    statCards.forEach((stat, index) => {
        const currentValue = parseInt(stat.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
        const newValue = Math.max(0, currentValue + change);
        
        if (change !== 0) {
            stat.textContent = newValue;
            stat.style.color = change > 0 ? '#10b981' : '#ef4444';
            setTimeout(() => {
                stat.style.color = '#1e293b';
            }, 2000);
        }
    });
}

// Update dashboard stats every 30 seconds
setInterval(updateDashboardStats, 30000);

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Animate progress bars when page loads
window.addEventListener('load', () => {
    setTimeout(animateProgressBars, 500);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to Student Tracking - Real-time Status Updates
function updateStudentStatus() {
    const statusElements = document.querySelectorAll('.student-status');
    const statuses = ['Active', 'In Progress', 'Completed', 'Reviewing'];
    const colors = {
        'Active': { bg: '#dcfce7', color: '#166534' },
        'In Progress': { bg: '#fef3c7', color: '#92400e' },
        'Completed': { bg: '#dbeafe', color: '#1e40af' },
        'Reviewing': { bg: '#fce7f3', color: '#be185d' }
    };
    
    statusElements.forEach(status => {
        if (Math.random() > 0.8) { // 20% chance to update status
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            status.textContent = newStatus;
            status.style.background = colors[newStatus].bg;
            status.style.color = colors[newStatus].color;
        }
    });
}

// Update student status every minute
setInterval(updateStudentStatus, 60000);

// WhatsApp Integration Simulation (Rural Access Feature)
function simulateWhatsAppIntegration() {
    const whatsappButton = document.createElement('button');
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp Support';
    whatsappButton.className = 'whatsapp-button';
    whatsappButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 20px;
        font-size: 1rem;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    // Add hover effects
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'translateY(-2px)';
        whatsappButton.style.boxShadow = '0 6px 25px rgba(37, 211, 102, 0.6)';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'translateY(0px)';
        whatsappButton.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
    });
    
    whatsappButton.addEventListener('click', () => {
        alert('WhatsApp Integration:\n\n• Apply via WhatsApp: +91-98765-43210\n• Track status via SMS\n• Get updates without internet\n• Voice call support available\n\n(Connecting rural students to opportunities)');
    });
    
    document.body.appendChild(whatsappButton);
}

// Initialize WhatsApp button
simulateWhatsAppIntegration();

// Offline Mode Simulation
let isOffline = false;

function simulateOfflineMode() {
    isOffline = !isOffline;
    const offlineIndicator = document.getElementById('offlineIndicator') || createOfflineIndicator();
    
    if (isOffline) {
        offlineIndicator.style.display = 'block';
        offlineIndicator.textContent = '📴 Offline Mode - Data will sync when online';
        document.body.style.filter = 'grayscale(20%)';
    } else {
        offlineIndicator.style.display = 'none';
        document.body.style.filter = 'none';
        // Simulate data sync
        setTimeout(() => {
            alert('✅ Data synced successfully!\n\nOffline actions:\n• Profile updates saved\n• Applications submitted\n• Progress recorded');
        }, 1000);
    }
}

function createOfflineIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'offlineIndicator';
    indicator.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #fbbf24;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        z-index: 1001;
        display: none;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(indicator);
    return indicator;
}

// Test offline mode every 2 minutes (for demo purposes)
setInterval(simulateOfflineMode, 120000);

// Initialize demo data on page load
// window.addEventListener('load', () => {
//     console.log('InternBridge Platform Loaded Successfully!');
//     console.log('Features:');
//     console.log('• AI-powered recommendations');
//     console.log('• Blockchain certificate verification');  
//     console.log('• Real-time mentorship dashboard');
//     console.log('• Gig-based marketplace');
//     console.log('• Skill development courses');
//     console.log('• Rural access via WhatsApp/Offline mode');
    
//     // Show welcome message
//     setTimeout(() => {
//         if (confirm('Welcome to InternBridge! 🎓\n\nWould you like a quick tour of the features?\n\n• AI Recommendations\n• Blockchain Certificates\n• Skill Courses\n• Mentorship Dashboard')) {
//             document.querySelector('a[href="#recommendations"]').click();
//         }
//     }, 2000);
// });