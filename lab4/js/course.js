function Course(title, level, months, price, img) {
    this.title = title;
    this.level = level;
    this.months = months;
    this.price = price;
    this.img = img; 
}
Course.prototype.getInfo = function () {
    return `${this.title} (${this.level}, ${this.months} мес.) — ${this.price} ₽`;
};
Course.prototype.getPricePerMonth = function () {
    return Math.round(this.price / this.months);
};


function ExamCourse(title, level, months, price, examType, img) {
    Course.call(this, title, level, months, price, img);
    this.examType = examType;
}
ExamCourse.prototype = Object.create(Course.prototype);
ExamCourse.prototype.constructor = ExamCourse;
ExamCourse.prototype.getInfo = function () {
    return `${Course.prototype.getInfo.call(this)} [${this.examType}]`;
};

function IntensiveCourse(title, months, price, img) {
    ExamCourse.call(this, title, 'Интенсив', months, price, 'ЕГЭ', img);
}
IntensiveCourse.prototype = Object.create(ExamCourse.prototype);
IntensiveCourse.prototype.constructor = IntensiveCourse;
IntensiveCourse.prototype.getInfo = function () {
    return `ИНТЕНСИВ: ${ExamCourse.prototype.getInfo.call(this)}`;
};


function Application(data) {
    this.name     = data.name    || '—';
    this.email    = data.email   || '—';
    this.course   = data.course  || '—';
    this.comment  = data.comment || '—';
    this.agree    = Boolean(data.agree);
    this.createdAt = new Date();
}

Application.prototype.printFormatted = function () {
    const line = '─'.repeat(48);
    console.log(line);
    console.log('НОВАЯ ЗАЯВКА');
    console.log(`Имя:          ${this.name}`);
    console.log(`Email:        ${this.email}`);
    console.log(`Направление:  ${this.course}`);
    console.log(`Комментарий:  ${this.comment}`);
    console.log(`Согласие:     ${this.agree ? 'да' : 'нет'}`);
    console.log(`Создана:      ${this.createdAt.toLocaleString('ru-RU')}`);
    
};

window.Course = Course;
window.ExamCourse = ExamCourse;
window.IntensiveCourse = IntensiveCourse;
window.Application = Application;