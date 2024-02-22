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

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    console.log(formData);

    let response = await fetch('http://127.0.0.1:8000/api/booking/', {
        method: 'POST',
        body: formData
      });
  
      let result = await response.json();
  
      alert(result.message);
})
// $calendar.setStartMonth()