const calendarBtn = document.body.querySelector('.calendar-btn')
const calendarDialog = document.body.querySelector('.dialog')
const overlay = document.body.querySelector('.dialog--overlay')
const dialogCLoseBtn = document.body.querySelector('.dialog--close-btn')
const dialogContent = document.body.querySelector('.dialog')

calendarBtn.addEventListener('click', showDialog)
function showDialog(event) {
    overlay.classList.add('open')
}

dialogCLoseBtn.addEventListener('click', closeDialog)
function closeDialog(event) {
    overlay.classList.remove('open')
}

overlay.addEventListener('click',(e) =>{
    if (e.target === overlay) {
        closeDialog()
    }
})