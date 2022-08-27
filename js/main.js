const body = document.body;

let disableScroll = function () {
	let pagePosition = window.scrollY;
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	document.querySelector('html').style.scrollBehavior = 'auto';
	window.scroll({ top: pagePosition, left: 0 });
	document.querySelector('html').style.scrollBehavior = '';
	document.body.removeAttribute('data-position');
}

const navCountry = document.querySelector('.navigation__country');
const footerCountry = document.querySelector('.footer__country');
const navTop = document.querySelector('.navigation__top');
const countryList = navTop.querySelector('.country-list');
const countryItems = navTop.querySelectorAll('.country-list__item');

navCountry.addEventListener('mouseover', function () {
    listActive();
})

navCountry.addEventListener('mouseout', function () {
    listNotActive();
})


countryItems.forEach(item => {
    item.addEventListener('click', function () {
        footerCountry.innerHTML = item.innerHTML;
        let buffer = item.innerHTML;
        item.innerHTML = navCountry.innerHTML;


        if (window.innerWidth <= 576) {
            document.querySelector('.content.country-list').innerHTML = countryList.innerHTML;
            activateChanger();
        }
        let name = nameCountry();
        document.querySelectorAll('.navigation__country').forEach(element => {
            element.classList.remove(name);
            element.innerHTML = buffer;
        });
        setFlag()
        sortCountry();
        countryList.style.display = 'none';
    })
});




footerCountry.onclick = () => {
    if (window.innerWidth > 992) {
        window.scrollTo(pageYOffset, 0);
        listActive();
        setTimeout(() => {
            listNotActive();
        }, 3000);
    } else if (window.innerWidth > 576) {
        listActive();
        setTimeout(() => {
            listNotActive();
        }, 3000);
    } else {
        document.querySelector('.menu__btn').click();
        let btn = document.querySelector('li .navigation__country');
        if (!btn.classList.contains('active'))
            btn.click();
    }
}

function listActive() {
    if (window.innerWidth > 576) {
        setTimeout(() => {
            countryList.style.display = '';
            countryList.classList.add('active');
        }, 100);
    }
}

function listNotActive() {
    if (window.innerWidth > 576) {
        setTimeout(() => {
            countryList.classList.remove('active');
        }, 200);
        countryList.classList.remove('active');
    }
}

function sortCountry() {
    document.querySelectorAll('.country-list').forEach(element => {
        let arr = [];
        const items = element.querySelectorAll('.country-list__item');
        items.forEach(item => {
            arr.push(item.innerHTML);
        });
        arr.sort();
        for (const key in items) {
            items[key].innerHTML = arr[key];
        }
    });
}

function nameCountry() {
    let name = document.querySelector('.navigation__country').innerHTML.toLowerCase();
    name = name.replace(/ /g, "-");
    return name;
}

function setFlag() {
    document.querySelectorAll('.navigation__country').forEach(element => {
        element.classList.add(nameCountry());
    });
}



const navigation = document.querySelector('.navigation');
const nav = navigation.querySelector('nav');
const overlay = navigation.querySelector('.overlay');
const megamenu = navigation.querySelector('.megamenu');
const menuLinks = nav.querySelectorAll('a.with-arrow');
const menuLinksAll = nav.querySelectorAll('.navigation__link a');

const menuToggle = document.querySelector('#menu__toggle');
const menuBtn = document.querySelector('.menu__btn');
const menuBox = document.querySelector('.menu__box');

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


menuBtn.addEventListener('click', function () {
    if (!menuToggle.checked) {
        overlay.classList.add('active');
        disableScroll();
    } else {
        megamenuNotActive();
        enableScroll();
    }
})

overlay.addEventListener('click', function () {
    closeBurgerMenu();
})

window.onresize = checkSize;


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

function checkSize() {
    if (window.innerWidth <= 992) {

        menuBox.innerHTML = '';

        if (window.innerWidth <= 576){
            let newLi = document.createElement('li');
            let contentWrapper = document.createElement('div');
            contentWrapper.className = 'content-wrapper';
            let content = document.createElement('div');
            content.className = 'content country-list';
            content.innerHTML = countryList.innerHTML;
            contentWrapper.append(content);
            let dupNode = navCountry.cloneNode(true);
            
            newLi.append(dupNode);
            newLi.append(contentWrapper);

            menuBox.append(newLi);
        }
           
        

        let innerHTML = '';
        menuLinksAll.forEach(link => {
            let inner = '';

            if (link.dataset.link) {
                let json = link.dataset.link;
                let data = JSON.parse(json);

                for (let i = 0; i < data.length; i++) {
                    const links = data[i].links;
                    links.forEach(link => {
                        inner += `<a href="#">${link}</a>`;
                    });
                }
            }

            innerHTML += `<li>
                ${link.outerHTML}
                <div class="content-wrapper">
                    <div class="content">
                        ${inner}
                    </div>
                </div>
                </li>`;
        });
        const navMail = document.querySelector('.navigation__mail');
        const navSocial = document.querySelector('.navigation__social');
        innerHTML += `<li class='navigation__mail-wrapper'>
                        ${navMail.outerHTML}
                    </li>
                    <li class='navigation__social-wrapper'>
                        ${navSocial.outerHTML}
                    </li>`;

        menuBox.innerHTML += innerHTML;
        activateChanger();
        acordion();
    } else {
        closeBurgerMenu();
    }
}

function closeBurgerMenu() {
    if (overlay.classList.contains('active')) {
        menuToggle.checked = false;
        megamenuNotActive();
        enableScroll();
    }
}

function acordion() {
    menuBox.querySelectorAll('a').forEach(el => {
        el.addEventListener('click', function (e) {
            if (!el.classList.contains('with-arrow')) {
                closeBurgerMenu();
                el.closest('li').querySelector('.with-arrow').click();
            }
        })
    })

    menuBox.querySelectorAll('.with-arrow').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            let content = el.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = '';
                el.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                el.classList.add('active');
            }
        })
    })
}

function activateChanger() {
    menuBox.querySelectorAll('.country-list__item').forEach(item => {
        item.addEventListener('click', function(){
            item.closest('li').querySelector('.with-arrow').click();

            document.querySelector('.country-list-wrapper').querySelector('.country-list').childNodes[getNum(item)].click();
            closeBurgerMenu();
        })
    });
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



checkSize();
setFlag();
sortCountry();



function getNum(el) {
    var i = 0;
    while (el = el.previousSibling) {
        el.nodeType == 1 && i++;
    }
    return i;
}
