const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let meassageArea=document.querySelector('.message_area');

do{
   name= prompt('Please enter your name to start your chat:')
}while(!name)


// Sending msg by client

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
            sendMessage(e.target.value);
     
    }
})

function sendMessage(message){
  let  msg={
        user:name,
        message:message.trim()
    }

    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollTobottom();
    // send to server
  
    socket.emit('message',msg)
}

function appendMessage(msg,type)
{
    let maindiv=document.createElement('div');
    let className=type
    maindiv.classList.add(className,'message');

    let markup=
    `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML=markup
    meassageArea.appendChild(maindiv);
}

//RECEIVE the msg by all client again

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
scrollTobottom();
})
function scrollTobottom(){
    meassageArea.scrollTop=meassageArea.scrollHeight
}