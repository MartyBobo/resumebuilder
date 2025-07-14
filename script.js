
document.addEventListener('DOMContentLoaded', function() {
    
    // --- STATE MANAGEMENT ---
    let resumeState = {
        personal: {
            name: 'John Doe',
            jobTitle: 'Senior Web Developer',
            email: 'john.doe@example.com',
            phone: '(123) 456-7890',
            location: 'San Francisco, CA'
        },
        sections: [
            { id: Date.now() + 1, type: 'summary', title: 'Professional Summary', content: '<p>Dynamic and results-oriented developer with 10+ years of experience...</p>' },
            { id: Date.now() + 2, type: 'experience', title: 'Work Experience', company: 'Tech Solutions Inc.', position: 'Lead Developer', dates: '2018 - Present', description: '<ul><li>Leading front-end development for major client projects.</li><li>Mentoring junior developers.</li></ul>' },
            { id: Date.now() + 3, type: 'education', title: 'Education', institution: 'State University', degree: 'B.S. in Computer Science', dates: '2010 - 2014' },
            { id: Date.now() + 4, type: 'skills', title: 'Skills', skills: 'HTML, CSS, JavaScript, React, Node.js, Python, SQL' },
        ],
        design: {
            accentColor: '#0d6efd',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: 16
        }
    };
    
    // --- QUILL.JS OPTIONS ---
    const quillOptions = {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        }
    };

    // --- DOM ELEMENT SELECTORS ---
    const editorList = document.getElementById('section-editor-list');
    const previewList = document.getElementById('resume-body-sortable');
    const resumeOutput = document.getElementById('resume-output');

    // --- RENDER FUNCTIONS ---

    function renderAll() {
        renderPersonal();
        renderSections();
        applyDesign();
    }
    
    function renderPersonal() {
        const p = resumeState.personal;
        document.getElementById('name').value = p.name;
        document.getElementById('job-title').value = p.jobTitle;
        document.getElementById('email').value = p.email;
        document.getElementById('phone').value = p.phone;
        document.getElementById('location').value = p.location;
        
        document.getElementById('resume-name').textContent = p.name;
        document.getElementById('resume-job-title').textContent = p.jobTitle;
        document.getElementById('resume-email').textContent = p.email;
        document.getElementById('resume-phone').textContent = p.phone;
        document.getElementById('resume-location').textContent = p.location;
    }

    function renderSections() {
        editorList.innerHTML = '';
        previewList.innerHTML = '';
        
        resumeState.sections.forEach(section => {
            // Create Editor Card
            const editorCard = createEditorCard(section);
            editorList.appendChild(editorCard);

            // Create Preview Section
            const previewSection = createPreviewSection(section);
            previewList.appendChild(previewSection);
        });
        
        // Initialize Quill on all new editors
        editorList.querySelectorAll('.quill-editor').forEach(editorEl => {
            const sectionId = parseInt(editorEl.dataset.id);
            const section = resumeState.sections.find(s => s.id === sectionId);
            const quill = new Quill(editorEl, quillOptions);
            
            let dataField = editorEl.dataset.field;
            quill.root.innerHTML = section[dataField] || '';
            
            quill.on('text-change', () => {
                section[dataField] = quill.root.innerHTML;
                renderPreviewSection(section.id); // Re-render only the changed preview
            });
        });
    }
    
    function renderPreviewSection(sectionId) {
        const section = resumeState.sections.find(s => s.id === sectionId);
        const newPreview = createPreviewSection(section);
        const oldPreview = previewList.querySelector(`[data-id='${sectionId}']`);
        if(oldPreview) {
            oldPreview.replaceWith(newPreview);
        }
    }
    
    function applyDesign() {
        const d = resumeState.design;
        document.documentElement.style.setProperty('--accent-color', d.accentColor);
        document.documentElement.style.setProperty('--accent-color-light', d.accentColor + '20');
        document.documentElement.style.setProperty('--resume-font-family', d.fontFamily);
        document.documentElement.style.setProperty('--resume-font-size', d.fontSize + 'px');
        
        document.getElementById('color-picker').value = d.accentColor;
        document.getElementById('font-select').value = d.fontFamily;
        document.getElementById('font-size-slider').value = d.fontSize;
        document.getElementById('font-size-value').textContent = d.fontSize;
    }

    // --- HTML TEMPLATE FUNCTIONS ---

    function createEditorCard(section) {
        const card = document.createElement('div');
        card.className = 'card editor-section-card mb-3';
        card.setAttribute('data-id', section.id);
        
        let content = '';
        switch(section.type) {
            case 'summary':
            case 'custom':
                content = `
                    <input type="text" class="form-control mb-2" value="${section.title}" data-field="title" placeholder="Section Title">
                    <div class="quill-editor" data-id="${section.id}" data-field="content"></div>
                `;
                break;
            case 'experience':
                content = `
                    <input type="text" class="form-control mb-2" value="${section.position}" data-field="position" placeholder="Position">
                    <input type="text" class="form-control mb-2" value="${section.company}" data-field="company" placeholder="Company">
                    <input type="text" class="form-control mb-2" value="${section.dates}" data-field="dates" placeholder="Dates (e.g., 2018 - Present)">
                    <div class="quill-editor" data-id="${section.id}" data-field="description"></div>
                `;
                break;
            case 'education':
                 content = `
                    <input type="text" class="form-control mb-2" value="${section.degree}" data-field="degree" placeholder="Degree / Certificate">
                    <input type="text" class="form-control mb-2" value="${section.institution}" data-field="institution" placeholder="Institution">
                    <input type="text" class="form-control mb-2" value="${section.dates}" data-field="dates" placeholder="Dates (e.g., 2010 - 2014)">
                `;
                break;
            case 'skills':
                content = `
                    <textarea class="form-control" rows="3" data-field="skills" placeholder="Comma-separated skills...">${section.skills}</textarea>
                `;
                break;
        }

        card.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <span><i class="bi bi-grip-vertical me-2"></i>${section.type.charAt(0).toUpperCase() + section.type.slice(1)}</span>
                <button class="btn-close remove-section"></button>
            </div>
            <div class="card-body">${content}</div>
        `;
        return card;
    }

    function createPreviewSection(section) {
        const div = document.createElement('div');
        div.className = 'resume-section';
        div.setAttribute('data-id', section.id);

        let content = '';
        switch(section.type) {
            case 'summary':
            case 'custom':
                content = `
                    <h2 class="section-title">${section.title}</h2>
                    <div class="section-content">${section.content || ''}</div>
                `;
                break;
            case 'experience':
                content = `
                    <h2 class="section-title">Work Experience</h2>
                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="job-title">${section.position || ''}</div>
                            <div class="company">${section.company || ''}</div>
                        </div>
                        <div class="dates">${section.dates || ''}</div>
                    </div>
                    <div class="section-content">${section.description || ''}</div>
                `;
                break;
             case 'education':
                content = `
                    <h2 class="section-title">Education</h2>
                     <div class="d-flex justify-content-between">
                        <div>
                            <div class="degree">${section.degree || ''}</div>
                            <div class="institution">${section.institution || ''}</div>
                        </div>
                        <div class="dates">${section.dates || ''}</div>
                    </div>
                `;
                break;
            case 'skills':
                const skillsHtml = (section.skills || '').split(',')
                    .map(s => s.trim())
                    .filter(s => s)
                    .map(s => `<span class="skill-badge">${s}</span>`)
                    .join('');
                content = `
                    <h2 class="section-title">Skills</h2>
                    <div class="skill-list">${skillsHtml}</div>
                `;
                break;
        }
        div.innerHTML = content;
        return div;
    }

    // --- EVENT LISTENERS ---
    
    // Personal Info & Design Controls
    document.getElementById('editor-pane').addEventListener('input', e => {
        const target = e.target;
        if(target.closest('.card-body')?.parentElement.id !== 'section-editor-list') {
             // Handle personal info
            if(resumeState.personal.hasOwnProperty(target.id)) {
                resumeState.personal[target.id] = target.value;
                renderPersonal();
            }
            // Handle design controls
            if(resumeState.design.hasOwnProperty(target.id.replace('-slider','').replace('-picker','').replace('-select',''))) {
                const key = target.id.split('-')[0] + 'Family'; // hack for font-family
                if(target.id === 'font-select') resumeState.design.fontFamily = target.value;
                if(target.id === 'color-picker') resumeState.design.accentColor = target.value;
                if(target.id === 'font-size-slider') resumeState.design.fontSize = target.value;
                applyDesign();
            }
        }
    });

    // Section Editor Changes (for non-Quill inputs)
    editorList.addEventListener('input', e => {
        const card = e.target.closest('.editor-section-card');
        if(!card) return;
        
        const sectionId = parseInt(card.dataset.id);
        const section = resumeState.sections.find(s => s.id === sectionId);
        const field = e.target.dataset.field;
        
        if(field && section.hasOwnProperty(field)) {
            section[field] = e.target.value;
            renderPreviewSection(sectionId);
        }
    });

    // Add & Remove Sections
    document.querySelector('.dropdown-menu').addEventListener('click', e => {
        if(e.target.classList.contains('add-section')) {
            e.preventDefault();
            const type = e.target.dataset.type;
            const newSection = { id: Date.now(), type: type };
            
            // Add default values
            if (type === 'summary') { newSection.title = 'Professional Summary'; newSection.content = ''; }
            if (type === 'experience') { newSection.title = 'Work Experience'; newSection.position = ''; newSection.company = ''; newSection.dates = ''; newSection.description = ''; }
            if (type === 'education') { newSection.title = 'Education'; newSection.degree = ''; newSection.institution = ''; newSection.dates = '';}
            if (type === 'skills') { newSection.title = 'Skills'; newSection.skills = '';}
            if (type === 'custom') { newSection.title = 'New Section'; newSection.content = ''; }
            
            resumeState.sections.push(newSection);
            renderSections();
        }
    });
    
    editorList.addEventListener('click', e => {
        if(e.target.classList.contains('remove-section')) {
            const card = e.target.closest('.editor-section-card');
            const sectionId = parseInt(card.dataset.id);
            resumeState.sections = resumeState.sections.filter(s => s.id !== sectionId);
            renderSections();
        }
    });

    // Download PDF
    document.getElementById('download-pdf').addEventListener('click', () => window.print());
    
    // --- DRAG-AND-DROP INITIALIZATION ---
    new Sortable(editorList, {
        animation: 150,
        handle: '.card-header',
        ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
            const sectionId = parseInt(evt.item.dataset.id);
            const section = resumeState.sections.find(s => s.id === sectionId);
            // Remove from old position, insert into new
            resumeState.sections = resumeState.sections.filter(s => s.id !== sectionId);
            resumeState.sections.splice(evt.newDraggableIndex, 0, section);
            renderSections(); // Re-render to update previews as well
        }
    });
     new Sortable(previewList, {
        animation: 150,
        handle: '.resume-section',
        ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
            const sectionId = parseInt(evt.item.dataset.id);
            const section = resumeState.sections.find(s => s.id === sectionId);
            resumeState.sections = resumeState.sections.filter(s => s.id !== sectionId);
            resumeState.sections.splice(evt.newDraggableIndex, 0, section);
            renderSections();
        }
    });

    // --- INITIAL RENDER ---
    renderAll();
});
