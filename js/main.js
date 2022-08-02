const navCountry = document.querySelector('.navigation__country');
const footerCounty = document.querySelector('.footer__country');
const countryList = document.querySelector('.country-list');
const countryItems = document.querySelectorAll('.country-list__item');

navCountry.addEventListener('mouseover', function () {
    listActive();
})

navCountry.addEventListener('mouseout', function () {
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
    countryList.style.display = 'none';
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
        countryList.style.display = '';
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
const navigation = document.querySelector('.navigation');
const nav = navigation.querySelector('nav');
const overlay = navigation.querySelector('.overlay');
const megamenu = navigation.querySelector('.megamenu');
const menuLinks = nav.querySelectorAll('a.with-arrow');

menuLinks.forEach(link => link.addEventListener('mouseover', function () {
    let json = link.dataset.link;
    let data = JSON.parse(json);
    dataMegamenu(data);

    const allLinks = megamenu.querySelectorAll('a');
    allLinks.forEach(link => {
        link.onclick = megamenuNotActive;
    });

    megamenuActive();
    const linkWrapper = link.closest('.navigation__link');
    linkWrapper.addEventListener('mouseleave', function (e) {
        if (!(e.relatedTarget === megamenu)) {
            megamenuNotActive();
        };
    })
}));

megamenu.addEventListener('mouseleave', function () {
    megamenuNotActive();
})


function megamenuActive() {
    overlay.classList.add('active');
    megamenu.classList.add('active');
}

function megamenuNotActive() {
    overlay.classList.remove('active');
    megamenu.classList.remove('active');
}

function dataMegamenu(data) {
    const collumns = megamenu.querySelectorAll('.megamenu__collumn');
    collumns.forEach(collumn => {
        collumn.innerHTML = ``;
    });
    for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const links = data[i].links;
        let innerHTML = `
        <a href="#">
            <h2 class="megamenu__title">
                ${title}
            </h2>
        </a>`;
        links.forEach(link => {
            innerHTML += `
            <div class="megamenu__link-wrapper">
                <a href="#" class="megamenu__link">
                    ${link}
                </a>
            </div>
            `;
        });
        collumns[i].innerHTML = innerHTML;
    }
}

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

next.addEventListener('dblclick', function (e) {
    e.preventDefault();
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

prev.addEventListener('dblclick', function (e) {
    e.preventDefault();
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


