const accordionHeaders= document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header=> {
  header.addEventListener('click', () => {
   const  accordionItem = header.parentElement;
    accordionItem.classList.toggle('active');
    });
});
let sortOrder = ['', '']; // Initialize sort order
function sortTable(columnIndex) {
//Simple sorting logic
let table= document.querySelector('table');
let rows = Array.from(table.rows).slice(1);//To exclude header row from being sorted
rows.sort((a,b) => {
  let aValue = a.cells[columnIndex].textContent.trim();
  let bValue = b.cells[columnIndex].textContent.trim();
  
  if(sortOrder[columnIndex] === 'asc'){
    return aValue.localeCompare(bValue);
  } else{
    return bValue.localeCompare(aValue);
  }
});
 
//Clear table body
let tbody= table.querySelector('tbody');
tbody.innerHTML ='';
//append sorted rows
rows.forEach(row => tbody.appendChild(row));
//Update sort order
  let arrowElement = document.getElementById('arrow' + columnIndex);

    if (sortOrder[columnIndex] === 'asc') {
      sortOrder[columnIndex] ='desc';
      arrowElement.className='desc';
    } else {
     sortOrder[columnIndex] ='asc'
     arrowElement.className='asc';
    }
  //Reset other arrows
  for(let i =0; i<2; i++){
    if(i !== columnIndex){
      document.getElementById('arrow' + i).className ='inactive';
      sortOrder[i] = '';
        }
       }
     }
  

