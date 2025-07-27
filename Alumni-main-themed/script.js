// Job Portal Functionality
class JobPortal {
  constructor() {
    this.jobs = [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        type: "Full-Time",
        salary: "$120,000 - $160,000",
        description: "We are looking for an experienced software engineer to join our team and work on cutting-edge technologies.",
        requirements: ["5+ years experience", "JavaScript, React, Node.js", "Bachelor's degree in CS"],
        datePosted: "2024-07-20",
        postedBy: "alumni@techcorp.com"
      },
      {
        id: 2,
        title: "Product Manager",
        company: "Innovation Labs",
        location: "New York, NY",
        type: "Full-Time",
        salary: "$100,000 - $140,000",
        description: "Join our product team to drive innovation and deliver exceptional user experiences.",
        requirements: ["3+ years PM experience", "Agile methodologies", "Strong analytical skills"],
        datePosted: "2024-07-18",
        postedBy: "hr@innovationlabs.com"
      },
      {
        id: 3,
        title: "Data Science Intern",
        company: "DataTech Solutions",
        location: "Austin, TX",
        type: "Internship",
        salary: "$25/hour",
        description: "Great opportunity for students to gain hands-on experience in data science and machine learning.",
        requirements: ["Currently enrolled in university", "Python, R, SQL", "Statistics background"],
        datePosted: "2024-07-15",
        postedBy: "internships@datatech.com"
      },
      {
        id: 4,
        title: "UX Designer",
        company: "Design Studio Pro",
        location: "Los Angeles, CA",
        type: "Part-Time",
        salary: "$50/hour",
        description: "Create amazing user experiences for our diverse client portfolio.",
        requirements: ["Portfolio required", "Figma, Sketch, Adobe Creative Suite", "2+ years experience"],
        datePosted: "2024-07-12",
        postedBy: "design@designstudiopro.com"
      }
    ];
    this.filteredJobs = [...this.jobs];
    this.init();
  }

  init() {
    this.renderJobs();
    this.setupEventListeners();
    this.setupFormValidation();
  }

  setupEventListeners() {
    // Search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.searchJobs();
      });

      // Real-time search
      const searchInputs = searchForm.querySelectorAll('input, select');
      searchInputs.forEach(input => {
        input.addEventListener('input', () => {
          this.searchJobs();
        });
      });
    }

    // Job posting form
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
      jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.postJob();
      });
    }

    // Reset filters button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Filters';
    resetBtn.type = 'button';
    resetBtn.className = 'reset-btn';
    resetBtn.style.cssText = `
      margin-left: 1rem;
      padding: 0.75em;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    `;
    resetBtn.addEventListener('click', () => this.resetFilters());
    
    if (searchForm) {
      searchForm.appendChild(resetBtn);
    }
  }

  setupFormValidation() {
    const jobForm = document.getElementById('job-form');
    if (!jobForm) return;

    const inputs = jobForm.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const errorClass = 'field-error';
    const errorMsgClass = 'error-message';
    
    // Remove existing error
    field.classList.remove(errorClass);
    const existingError = field.parentNode.querySelector(`.${errorMsgClass}`);
    if (existingError) {
      existingError.remove();
    }

    // Check if field is valid
    if (!field.value.trim()) {
      this.showFieldError(field, 'This field is required');
      return false;
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        this.showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    return true;
  }

  showFieldError(field, message) {
    field.classList.add('field-error');
    field.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #e74c3c;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    `;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }

  clearFieldError(field) {
    field.classList.remove('field-error');
    field.style.borderColor = '';
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  searchJobs() {
    const searchTitle = document.getElementById('search-title')?.value.toLowerCase() || '';
    const searchLocation = document.getElementById('search-location')?.value.toLowerCase() || '';
    const searchType = document.getElementById('search-type')?.value || '';

    this.filteredJobs = this.jobs.filter(job => {
      const matchesTitle = !searchTitle || job.title.toLowerCase().includes(searchTitle) || 
                          job.company.toLowerCase().includes(searchTitle);
      const matchesLocation = !searchLocation || job.location.toLowerCase().includes(searchLocation);
      const matchesType = !searchType || job.type === searchType;

      return matchesTitle && matchesLocation && matchesType;
    });

    this.renderJobs();
    this.showSearchResults();
  }

  showSearchResults() {
    const jobsContainer = document.getElementById('jobs');
    if (!jobsContainer) return;

    const resultText = document.createElement('div');
    resultText.className = 'search-results';
    resultText.style.cssText = `
      padding: 1rem;
      background: var(--card-bg, #fff);
      border-radius: 8px;
      margin-bottom: 1rem;
      border-left: 4px solid var(--primary, #004d40);
    `;
    resultText.innerHTML = `
      <strong>Search Results:</strong> ${this.filteredJobs.length} job${this.filteredJobs.length !== 1 ? 's' : ''} found
    `;

    // Remove existing search results text
    const existingResults = jobsContainer.querySelector('.search-results');
    if (existingResults) {
      existingResults.remove();
    }

    jobsContainer.insertBefore(resultText, jobsContainer.firstChild);
  }

  resetFilters() {
    document.getElementById('search-title').value = '';
    document.getElementById('search-location').value = '';
    document.getElementById('search-type').value = '';
    
    this.filteredJobs = [...this.jobs];
    this.renderJobs();

    // Remove search results text
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
      existingResults.remove();
    }
  }

  renderJobs() {
    const jobsContainer = document.getElementById('jobs');
    if (!jobsContainer) return;

    // Keep search results text if it exists
    const searchResults = jobsContainer.querySelector('.search-results');
    
    if (this.filteredJobs.length === 0) {
      jobsContainer.innerHTML = `
        <div class="no-jobs" style="text-align: center; padding: 2rem; color: #666;">
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria to find more opportunities.</p>
        </div>
      `;
      if (searchResults) {
        jobsContainer.insertBefore(searchResults, jobsContainer.firstChild);
      }
      return;
    }

    const jobsHTML = this.filteredJobs.map(job => this.createJobHTML(job)).join('');
    jobsContainer.innerHTML = jobsHTML;
    
    if (searchResults) {
      jobsContainer.insertBefore(searchResults, jobsContainer.firstChild);
    }

    // Add apply button event listeners
    this.setupApplyButtons();
  }

  createJobHTML(job) {
    const daysAgo = this.getDaysAgo(job.datePosted);
    
    return `
      <div class="job" data-job-id="${job.id}" style="
        border: 2px solid var(--primary, #004d40);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        background: var(--card-bg, #fff);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      ">
        <div class="job-header" style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <h3 style="color: var(--primary, #004d40); margin: 0 0 0.5rem 0; font-size: 1.3rem;">${job.title}</h3>
            <p style="color: var(--foreground, #333); font-weight: 600; margin: 0 0 0.25rem 0;">${job.company}</p>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">📍 ${job.location} • 💼 ${job.type}</p>
          </div>
          <div class="job-meta" style="text-align: right;">
            <div style="color: var(--primary, #004d40); font-weight: 600; margin-bottom: 0.25rem;">${job.salary}</div>
            <div style="color: #666; font-size: 0.8rem;">${daysAgo} days ago</div>
          </div>
        </div>
        
        <div class="job-description" style="margin-bottom: 1rem;">
          <p style="color: var(--foreground, #333); line-height: 1.6; margin: 0 0 1rem 0;">${job.description}</p>
          
          <div class="job-requirements">
            <strong style="color: var(--primary, #004d40);">Requirements:</strong>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
              ${job.requirements.map(req => `<li style="color: var(--foreground, #333); margin-bottom: 0.25rem;">${req}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="job-actions" style="display: flex; gap: 1rem; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.9rem; color: #666;">
            Posted by: ${job.postedBy}
          </div>
          <div>
            <button class="apply-btn" data-job-id="${job.id}" style="
              background: var(--primary, #004d40);
              color: white;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.3s ease, transform 0.2s ease;
              margin-right: 0.5rem;
            ">Apply Now</button>
            <button class="save-btn" data-job-id="${job.id}" style="
              background: transparent;
              color: var(--primary, #004d40);
              border: 2px solid var(--primary, #004d40);
              padding: 0.6rem 1.2rem;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
            ">Save Job</button>
          </div>
        </div>
      </div>
    `;
  }

  setupApplyButtons() {
    document.querySelectorAll('.apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.dataset.jobId);
        this.applyForJob(jobId);
      });

      btn.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0, 77, 64, 0.3)';
      });

      btn.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.dataset.jobId);
        this.saveJob(jobId, e.target);
      });

      btn.addEventListener('mouseenter', (e) => {
        e.target.style.background = 'var(--primary, #004d40)';
        e.target.style.color = 'white';
      });

      btn.addEventListener('mouseleave', (e) => {
        if (!e.target.classList.contains('saved')) {
          e.target.style.background = 'transparent';
          e.target.style.color = 'var(--primary, #004d40)';
        }
      });
    });
  }

  applyForJob(jobId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return;

    // Create application modal
    this.showApplicationModal(job);
  }

  showApplicationModal(job) {
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    modal.innerHTML = `
      <div class="modal-content" style="
        background: var(--card-bg, white);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      ">
        <h3 style="color: var(--primary, #004d40); margin-bottom: 1rem;">Apply for ${job.title}</h3>
        <p style="color: var(--foreground, #333); margin-bottom: 1.5rem;">at ${job.company}</p>
        
        <form id="applicationForm">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name *</label>
            <input type="text" name="fullName" required style="width: 100%; padding: 0.8rem; border: 2px solid #ddd; border-radius: 6px;" />
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
            <input type="email" name="email" required style="width: 100%; padding: 0.8rem; border: 2px solid #ddd; border-radius: 6px;" />
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone</label>
            <input type="tel" name="phone" style="width: 100%; padding: 0.8rem; border: 2px solid #ddd; border-radius: 6px;" />
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Cover Letter *</label>
            <textarea name="coverLetter" required rows="4" style="width: 100%; padding: 0.8rem; border: 2px solid #ddd; border-radius: 6px; resize: vertical;"></textarea>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Resume (URL or note)</label>
            <input type="text" name="resume" placeholder="Link to your resume or note about attached file" style="width: 100%; padding: 0.8rem; border: 2px solid #ddd; border-radius: 6px;" />
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="cancel-btn" style="
              padding: 0.8rem 1.5rem;
              border: 2px solid #ccc;
              background: transparent;
              color: #666;
              border-radius: 6px;
              cursor: pointer;
            ">Cancel</button>
            <button type="submit" style="
              padding: 0.8rem 1.5rem;
              background: var(--primary, #004d40);
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
            ">Submit Application</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for modal
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    modal.querySelector('#applicationForm').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const applicationData = Object.fromEntries(formData);
      
      // Simulate application submission
      this.submitApplication(job, applicationData);
      document.body.removeChild(modal);
    });
  }

  submitApplication(job, applicationData) {
    // Show loading state
    const loadingToast = this.showToast('Submitting application...', 'info');
    
    setTimeout(() => {
      loadingToast.remove();
      this.showToast(`Application submitted for ${job.title} at ${job.company}!`, 'success');
      
      // You could send this data to a server here
      console.log('Application submitted:', { job, applicationData });
    }, 2000);
  }

  saveJob(jobId, buttonElement) {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return;

    buttonElement.classList.toggle('saved');
    
    if (buttonElement.classList.contains('saved')) {
      buttonElement.textContent = '✓ Saved';
      buttonElement.style.background = 'var(--primary, #004d40)';
      buttonElement.style.color = 'white';
      this.showToast(`${job.title} saved to your favorites!`, 'success');
    } else {
      buttonElement.textContent = 'Save Job';
      buttonElement.style.background = 'transparent';
      buttonElement.style.color = 'var(--primary, #004d40)';
      this.showToast(`${job.title} removed from favorites.`, 'info');
    }
  }

  postJob() {
    const form = document.getElementById('job-form');
    const formData = new FormData(form);
    
    // Validate form
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showToast('Please fill in all required fields correctly.', 'error');
      return;
    }

    // Create new job object
    const newJob = {
      id: this.jobs.length + 1,
      title: formData.get('job-title'),
      company: formData.get('company'),
      location: formData.get('location'),
      type: formData.get('job-type'),
      salary: formData.get('salary') || 'Competitive',
      description: formData.get('job-description'),
      requirements: formData.get('requirements') ? formData.get('requirements').split('\n').filter(req => req.trim()) : [],
      datePosted: new Date().toISOString().split('T')[0],
      postedBy: formData.get('contact-email') || 'alumni@company.com'
    };

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Posting Job...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      this.jobs.unshift(newJob); // Add to beginning of array
      this.filteredJobs = [...this.jobs];
      this.renderJobs();
      
      // Reset form
      form.reset();
      
      // Show success message
      this.showToast('Job posted successfully!', 'success');
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Scroll to job listings
      document.getElementById('job-listings').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 10001;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;

    const colors = {
      success: '#27ae60',
      error: '#e74c3c',
      info: '#3498db',
      warning: '#f39c12'
    };

    toast.style.background = colors[type] || colors.info;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);

    return toast;
  }

  getDaysAgo(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

// Initialize the job portal when the page loads
document.addEventListener('DOMContentLoaded', function() {
  new JobPortal();
  
  // Add some additional styling for better UX
  const style = document.createElement('style');
  style.textContent = `
    .field-error {
      border-color: #e74c3c !important;
      box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1) !important;
    }
    
    .job:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
    
    .apply-btn:hover {
      background: #00332a !important;
    }
    
    .save-btn.saved {
      background: var(--primary, #004d40) !important;
      color: white !important;
    }
    
    .modal-content {
      animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .reset-btn:hover {
      background-color: #5a6268 !important;
    }
    
    @media (max-width: 768px) {
      .job-header {
        flex-direction: column !important;
        gap: 1rem;
      }
      
      .job-actions {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0.5rem !important;
      }
      
      .job-actions > div:last-child {
        display: flex;
        gap: 0.5rem;
      }
      
      .modal-content {
        margin: 1rem !important;
        padding: 1.5rem !important;
      }
    }
  `;
  document.head.appendChild(style);
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JobPortal;
}
