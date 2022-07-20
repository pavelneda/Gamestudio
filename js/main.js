const navCountry = document.querySelector('.navigation__country');
const footerCounty = document.querySelector('.footer__country');
const countryList = document.querySelector('.country-list');
const countryItems = document.querySelectorAll('.country-list__item');

navCountry.addEventListener('pointerover', function () {
    listActive();
})

navCountry.addEventListener('click', function () {
    if (countryList.style.display) {
        countryList.classList.remove('active');
        countryList.style.display = '';
    } else {
        countryList.style.display = 'block';
    }
})

navCountry.addEventListener('pointerout', function () {
    listNotActive();
})

countryList.addEventListener('pointerout', function () {
    listNotActive();
})

countryItems.forEach(item => item.addEventListener('click', function () {
    footerCounty.innerHTML = item.innerHTML;
    let buffer = item.innerHTML;
    item.innerHTML = navCountry.innerHTML;
    navCountry.classList.remove(nameCountry());
    navCountry.innerHTML = buffer;
    setFlag()
    sortCountry();
}));

footerCounty.onclick = () => {
    window.scrollTo(pageYOffset, 0);
    listActive();
    setTimeout(() => {
        listNotActive();
    }, 3000);
}

function listActive() {
    setTimeout(() => {
        countryList.classList.add('active');
    }, 100);
}

function listNotActive() {
    setTimeout(() => {
        countryList.classList.remove('active');
    }, 200);
}

function sortCountry() {
    let arr = [];
    countryItems.forEach(item => {
        arr.push(item.innerHTML);
    });
    arr.sort();
    for (const key in countryItems) {
        countryItems[key].innerHTML = arr[key];
    }
}

function nameCountry() {
    let name = navCountry.innerHTML.toLowerCase();
    name = name.replace(/ /g, "-");
    return name;
}

function setFlag() {
    navCountry.classList.add(nameCountry());
}



setFlag();
sortCountry();
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


