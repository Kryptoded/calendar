const dialog = document.querySelector('.calendar-wrapper')
const dateStartInput = document.querySelector('#dateStart')
const dateEndInput = document.querySelector('#dateEnd')
const form = document.querySelector('.form')

$calendar.render(dialog)
$calendar.onOk = (dateStart, dateEnd) => {
    dateStartInput.value = dateStart.toLocaleString('ru').split(',')[0];
    dateEndInput.value = dateEnd.toLocaleString('ru').split(',')[0];
    closeDialog()
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(e.target);
})
// $calendar.setStartMonth()