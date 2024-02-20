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
                <button class='continue-btn' id='continue-btn' disabled>Продолжить</button>
                <div class='months'>
                    
                </div>
            </div>`,
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    render(htmlElement) {
        this.currentDate = new Date()
        this.currentDate.setHours(0,0,0,0)
        htmlElement.insertAdjacentHTML('afterbegin', this.html)
        this.createMonths()
        this.addEvents()
        document.body.querySelector('#continue-btn').addEventListener('click', ()=>{
            this.onOk(this.dateStart, this.dateEnd)
        })
    },
    addEvents(){
        this.notDisableDays = Array.from(document.body.querySelectorAll(".day:not(.disable)"))
        this.notDisableDays.forEach(day => {
            day.addEventListener('click',this.clickOnDay.bind(this))
            day.addEventListener('mouseover', this.hoverOnDay.bind(this))
        })
    },
    removeStartEnd() {
        this.dateStart = null
        this.dateEnd = null
        document.body.querySelector('#continue-btn').disabled = true
        this.notDisableDays.forEach((item) =>{
            item.classList.remove('range-start')
            item.classList.remove('range-end')
            item.classList.remove('hovered')
        })
    },
    clickOnDay(event) {
        if (!this.dateStart) {
            this.dateStart = new Date(event.target.dataset['date'])
            event.target.classList.add('range-start')
            return;
        }
        if(this.dateStart && !this.dateEnd) {
            if (new Date(event.target.dataset['date']) > this.dateStart) {
                this.dateEnd = new Date(event.target.dataset['date'])
                event.target.classList.add('range-end')
                document.body.querySelector('#continue-btn').disabled = false
            }
            return;
        }
        if (this.dateStart && this.dateEnd) {
            this.removeStartEnd()
            this.dateStart = new Date(event.target.dataset['date'])
            event.target.classList.add('range-start')
            return;
        }
    },
    hoverOnDay(event) {
        const currentDate = new Date(event.target.dataset['date'])
        if (this.dateStart && !this.dateEnd) {
            this.notDisableDays.forEach((item)=>{
                const itemDate = new Date(item.dataset['date'])
                if ( itemDate <= currentDate && itemDate > this.dateStart ) {
                    item.classList.add('hovered')
                } else {
                    item.classList.remove('hovered')
                }
            })
        } else {
            return
        }
    },
    getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
        let day = date.getDay();
        if (day == 0) day = 7; // сделать воскресенье (0) последним днем
        return day - 1;
    },
    isSameDate(d1, d2) {
        return d1.getTime() === d2.getTime()
    },
    createDayHTML(d) {
        if (d < this.currentDate) {
            return `<div class='day disable'> ${d.getDate()} </div>`
        } 
        if (this.isSameDate(d, this.currentDate)) {
            return `<div class='day today' data-date='${d}'> ${d.getDate()} </div>`
        }
        else {
            return `<div class='day' data-date='${d}'> ${d.getDate()} </div>`
        }
    },

    getMonthDays(month, year) {
        let days = `<div class='week'>`
        d = new Date(year, month)
        for (let i = 0; i < this.getDay(d); i++) { //Дополнить пустыми днями до начала недели
            days += `<div class='day disable'> </div>`
        }
        while (d.getMonth() === month) { // основной цикл по заполнению месяца
            days += this.createDayHTML(d)
            if (this.getDay(d) === 6) {
                days += `</div> <div class='week'>`
            }
            d.setDate(d.getDate() +1)
        }
        if (this.getDay(d) !== 0) { // Закончить пустыми днями до конца недели
            for (let i = this.getDay(d); i < 7; i ++) {
                days += `<div class='day disable'></div>`
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
