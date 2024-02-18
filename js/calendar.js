const $calendar = {
    html: `<div class='calendar'>
                <div class='days'>
                    <div class='day'>Пн</div>
                    <div class='day'>Вт</div>
                    <div class='day'>Ср</div>
                    <div class='day'>Чт</div>
                    <div class='day'>Пт</div>
                    <div class='day day-off'>Сб</div>
                    <div class='day day-off'>Вс</div>
                </div>
                <div class='months'>
                    
                </div>
            </div>`,
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    currentDate: new Date(),
    render(htmlElement) {
        htmlElement.insertAdjacentHTML('afterbegin', this.html)
        this.createMonths()
    },
    getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
        let day = date.getDay();
        if (day == 0) day = 7; // сделать воскресенье (0) последним днем
        return day - 1;
      },
    getMonthDays(month, year) {
        let days = `<div class='week'>`
        d = new Date(year, month)
        for (let i = 0; i < this.getDay(d); i++) {
            days += `<div class='day'> </div>`
        }
        while (d.getMonth() === month) {
            days += `<div class='day'> ${d.getDate()} </div>`
            if (this.getDay(d) === 6) {
                days += `</div> <div class='week'>`
            }
            d.setDate(d.getDate() +1)
        }
        if (this.getDay(d) !== 0) {
            for (let i = this.getDay(d); i < 7; i ++) {
                days += `<div class='day'></div>`
            }
        }
        
        days += '</div>'
        return days;
    },
    createMonth(date) {
        const monthString = this.months[date.getMonth()]
        let month = `<div class='month'> <div class='month-label'> ${monthString} ${date.getFullYear()} </div>`
        month += this.getMonthDays(date.getMonth(), date.getFullYear())
        month += '</div>'
        document.body.querySelector('.months').insertAdjacentHTML('beforeend', month)
    },

    createMonths() {
        let currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth())
        for(let i = 0; i < 12; i ++) {
            this.createMonth(currentDate)
            currentDate.setMonth(currentDate.getMonth() +1)
        }
    }
}

const html = ``