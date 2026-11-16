(()=>{const header=document.getElementById('site-header'),menu=document.getElementById('menu-button'),mobile=document.getElementById('mobile-menu');if(header){const update=()=>header.classList.toggle('scrolled',window.scrollY>16);update();window.addEventListener('scroll',update,{passive:true})}if(menu&&mobile){menu.addEventListener('click',()=>{let open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false')}))}if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>{for(const e of es){if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}}},{threshold:.06,rootMargin:'0px 0px 30px 0px'});document.querySelectorAll('[data-reveal]').forEach(e=>ob.observe(e))}else document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('visible'));const form=document.getElementById('contact-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const get=id=>document.getElementById(id).value.trim();let body=`Name: ${get('contact-name')}
Email: ${get('contact-email')}
Inquiry: ${get('contact-topic')}

${get('contact-message')}`;document.getElementById('form-status').textContent='Opening your email app. Please send the prepared email to complete your inquiry.';window.location.href='mailto:info@korzenhealth.com?subject='+encodeURIComponent('Korzen Health website inquiry: '+get('contact-topic'))+'&body='+encodeURIComponent(body)})})();
;(()=>{
  const navDropdown=document.querySelector('.nav-dropdown');
  if(navDropdown){
    document.addEventListener('click',e=>{if(!navDropdown.contains(e.target))navDropdown.removeAttribute('open')});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navDropdown.open){navDropdown.open=false;navDropdown.querySelector('summary')?.focus()}});
  }
  document.querySelectorAll('.team-card').forEach(card=>{
    const bio=card.querySelector('.team-details p'); if(!bio)return;
    const btn=document.createElement('button');btn.type='button';btn.className='team-bio-more';
    btn.textContent='Read full bio';btn.setAttribute('aria-expanded','false');
    bio.insertAdjacentElement('afterend',btn);
    btn.addEventListener('click',()=>{const full=card.classList.toggle('expanded');btn.textContent=full?'Show less':'Read full bio';btn.setAttribute('aria-expanded',String(full))});
  });
  const homeForm=document.getElementById('home-inquiry-form');if(!homeForm)return;
  const tabs=[...document.querySelectorAll('.inquiry-tab')];
  const company=document.getElementById('inquiry-company');
  const label=document.getElementById('inquiry-company-label');
  const message=document.getElementById('inquiry-message');
  const status=document.getElementById('home-inquiry-status');
  tabs.forEach(btn=>btn.addEventListener('click',()=>{
    const mode=btn.dataset.inquiry;homeForm.dataset.inquiryType=mode;
    tabs.forEach(t=>{const active=t===btn;t.classList.toggle('active',active);t.setAttribute('aria-pressed',String(active))});
    const job=mode==='job';
    label.innerHTML=job?'Specialty / role <span aria-hidden="true">*</span>':'Company <span aria-hidden="true">*</span>';
    company.placeholder=job?'e.g. Family Medicine, Nurse Practitioner':'Your company name';
    company.setAttribute('autocomplete',job?'off':'organization');
    message.placeholder=job?'Tell us what kind of opportunity you are interested in...':'Tell us about your hiring needs...';
    status.textContent='';
  }));
  homeForm.addEventListener('submit',e=>{
    e.preventDefault();if(!homeForm.reportValidity())return;
    const val=id=>document.getElementById(id).value.trim();
    const job=homeForm.dataset.inquiryType==='job';
    const subject=job?'Career inquiry from Korzen Health website':'Hiring inquiry from Korzen Health website';
    const body=[`Inquiry type: ${job?'Looking for a job':'Looking to hire'}`,
      `Name: ${val('inquiry-name')}`,
      `${job?'Specialty / role':'Company'}: ${val('inquiry-company')}`,
      `Email: ${val('inquiry-email')}`,
      `Phone: ${val('inquiry-phone')}`,'',val('inquiry-message')].join('\n');
    status.textContent='Your email app will open with the inquiry filled in. Please press Send there to complete your request.';
    window.location.href='mailto:info@korzenhealth.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });
})();
