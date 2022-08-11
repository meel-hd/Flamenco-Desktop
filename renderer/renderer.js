const validation = new RegExp(
  "^((http|https|ftp)://){1}([a-zA-Z0-9.-]+.(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$"
);

function startManager() {
  const URL = document.getElementById("urlInput").value;
  if (validation.test(URL)) {
    fetch(URL).then(data => {
      if(data.url == `${URL}app/` || data.url == `${URL}/app/` )
      {
          window.location.href = URL;
      }else{
        document.getElementById("alert").style.opacity = "100%";
      }
    })
  } else {
    document.getElementById("alert").style.opacity = "100%";
  }
}

function checkValidation() {
  const URL = document.getElementById("urlInput").value;
  if (validation.test(URL)) {
    document.getElementById("alert").style.opacity = "0%";
  }
}

setInterval(checkValidation, 200);
