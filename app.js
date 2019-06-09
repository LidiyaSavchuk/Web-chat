const firebase=require('firebase')
  var firebaseConfig = {
    apiKey: "AIzaSyALfhk2ta_qS5D6O2Sx2ABqpkxFC2NhXnw",
    authDomain: "fir-chat-a6417.firebaseapp.com",
    databaseURL: "https://fir-chat-a6417.firebaseio.com",
    projectId: "fir-chat-a6417",
    storageBucket: "fir-chat-a6417.appspot.com",
    messagingSenderId: "342669420955",
    appId: "1:342669420955:web:0645ee8956390db6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messageScreen=document.getElementById("messages");
  const messageForm = document.getElementById("messageForm");
  const msgInput = document.getElementById("msg-btn");
  const db=firebase.database();
  const msgRef=db.ref("/msgs");
  const id=uuid();
  let name='guest;'
  messageForm.addEventListener('submit',event => {
    event.preventDefault();

    const text=msgInput.value;
    if(!text.trim()) return;

    const msg={
        id,
        name,
        text
    };


    msgRef.push(msg);
    msgInput="";
  });

const updateMsges=data=>{
   const{id: userId,name,text}=data.val(); 
   const msg= `<li class="msg $ { id==userId &&"my"}"><span>
    <i class="name">${name}:</i>${text}
    </span>
    </li>`;
   messageScreen.innerHTML += msg
    };  
msgRef.on('child_added',updateMsges)