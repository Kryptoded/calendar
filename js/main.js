const dialog = document.querySelector('.calendar-wrapper')
const dateStartInput = document.querySelector('#dateStart')
const dateEndInput = document.querySelector('#dateEnd')

$calendar.render(dialog)
$calendar.onOk = (dateStart, dateEnd)=>{
    dateStartInput.value = dateStart.toLocaleString('ru').split(',')[0];
    dateEndInput.value = dateEnd.toLocaleString('ru').split(',')[0];
}

// $calendar.setStartMonth()