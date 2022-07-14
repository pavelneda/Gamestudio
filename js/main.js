
const slider = document.querySelector('.whoWeAre__slider');
const prev = slider.querySelector('.prev');
const next = slider.querySelector('.next');
const slides = slider.querySelectorAll('.whoWeAre__slide');
const wrapper = slider.querySelectorAll('.whoWeAre__wrapper');
const person = document.querySelector('.whoWeAre__person');

function wrapperWidth(activeEl) {
    const w = slider.clientWidth - parseInt(getComputedStyle(slider).paddingLeft) * 2 - parseInt(getComputedStyle(activeEl.offsetParent).marginLeft) * 2;
    return w;
}

function wrapperFullWidth(activeEl) {
    const margin = parseInt(getComputedStyle(activeEl).marginLeft);
    const w = (activeEl.clientWidth + margin) * activeEl.offsetParent.childElementCount - margin;
    return w;
}

function firstAndLast(el){
    if(!el.nextSibling){
        next.classList.add('not-active');
    }else{
        next.classList.remove('not-active');
    }

    if(!el.previousSibling){
        prev.classList.add('not-active');
    }else{
        prev.classList.remove('not-active');
    }
}


next.addEventListener('click', function () {
    const activeEl = slider.querySelector('.active');
    if (activeEl.nextSibling) {
        activeEl.classList.remove('active');
        activeEl.nextSibling.classList.add('active');
        firstAndLast(activeEl.nextSibling)
        
        if (activeEl.nextSibling.offsetLeft >= wrapperWidth(activeEl) / 2) {
            const margin = parseInt(getComputedStyle(activeEl).marginLeft);
            activeEl.offsetParent.scrollLeft += activeEl.clientWidth + margin;
        }
    }
})

prev.addEventListener('click', function () {
    const activeEl = slider.querySelector('.active');
    if (activeEl.previousSibling) {
        activeEl.classList.remove('active');
        activeEl.previousSibling.classList.add('active');
        firstAndLast(activeEl.previousSibling)

        if (wrapperFullWidth(activeEl) - activeEl.offsetLeft >= wrapperWidth(activeEl) / 2) {
            const margin = parseInt(getComputedStyle(activeEl).marginLeft);
            activeEl.offsetParent.scrollLeft -= activeEl.clientWidth + margin;
        }
    }
})

slides.forEach(slide => slide.addEventListener('click', function () {
    const activeEl = slider.querySelector('.active');
    activeEl.classList.remove('active');
    slide.classList.add('active');
    firstAndLast(slide);
}));

slider.addEventListener('click', function () {
    const activeElImg = slider.querySelector('.active').querySelector('img');
    let json = activeElImg.dataset.person;
    let data = JSON.parse(json);
    person.firstChild.innerHTML = data.name + ','; 
    person.lastChild.innerHTML = data.job;
})


