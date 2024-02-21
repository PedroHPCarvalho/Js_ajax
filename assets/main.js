const request = obj => {
  const xhr = new XMLHttpRequest();
  xhr.open(obj.methid, obj.url , true);
  xhr.send();

  xhr.addEventListener('load', () =>{
    
  })
}


