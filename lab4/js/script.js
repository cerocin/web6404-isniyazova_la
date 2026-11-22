const courses = [
    new ExamCourse('Математика', 'Продвинутый', 6, 12000, 'ЕГЭ', 'images/course1.jpg'),
    new ExamCourse('Физика', 'Базовый', 4, 8000, 'ОГЭ', 'images/course2.jpg'),
    new ExamCourse('Информатика', 'Продвинутый', 5, 10000, 'ЕГЭ', 'images/course3.jpg'),
    new IntensiveCourse('Математика', 2, 7000, 'images/course4.jpg')
];

function renderCatalogTable(container) {
    if (!container) return;
    const rows = courses.map(c => `
        <tr>
            <td class="table__cell--left">${c.title}</td>
            <td class="table__cell--center">${c.level}</td>
            <td class="table__cell--center">${c.months} мес.</td>
            <td class="table__cell--right">${c.price.toLocaleString('ru-RU')} ₽</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <table class="table">
            <caption class="table__caption">Доступные направления</caption>
            <thead>
                <tr>
                    <th class="table__cell--left">Курс</th>
                    <th class="table__cell--center">Уровень</th>
                    <th class="table__cell--center">Длительность</th>
                    <th class="table__cell--right">Цена</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function renderCards(container) {
    if (!container) return;
    container.innerHTML = courses.map(c => `
        <article class="card animate-in">
            <div class="card__image-wrapper">
                <img src="${c.img}" alt="${c.title}" class="card__image">
            </div>
            <div class="card__content">
                <h3 class="card__title">${c.title}</h3>
                <p class="card__desc">${c.getInfo()}</p>
                <p class="card__price">${c.getPricePerMonth()} ₽ <span>/ мес.</span></p>
            </div>
        </article>
    `).join('');
}

function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const errorEl   = document.getElementById('form-error');
    const successEl = document.getElementById('form-success');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        errorEl.textContent = '';
        successEl.classList.remove('form__success--visible');

        const data = {
            name:    form.name.value.trim(),
            email:   form.email.value.trim(),
            course:  form.course.value,
            comment: form.comment.value.trim(),
            agree:   form.agree.checked
        };

        if (!data.name)  { errorEl.textContent = 'Введите имя.'; return; }
        if (!data.email) { errorEl.textContent = 'Введите email.'; return; }
        if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errorEl.textContent = 'Некорректный email.';
            return;
        }
        if (!data.agree) {
            errorEl.textContent = 'Нужно согласие на обработку данных.';
            return;
        }

        const application = new Application(data);
        application.printFormatted();

        successEl.classList.add('form__success--visible');
        form.reset();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    renderCatalogTable(document.getElementById('catalog-table'));
    renderCards(document.getElementById('catalog-cards'));
    initForm();

    
    if (!window.__jsDemoShown) {
        window.__jsDemoShown = true;
        if (typeof demonstrateJS === 'function') demonstrateJS();
    }
});