/* var userId
var userDisplayName
var ui = new firebaseui.auth.AuthUI(firebase.auth())
firebase.auth().onAuthStateChanged(function (user) {
	if (user !== null) {
    document.getElementById('auth').setAttribute('style', 'display: none')
    document.getElementById('loader').setAttribute('style', '')
    document.getElementById('logout').addEventListener('click', onLogout)
    document.getElementById('logout').setAttribute('style', '')
    userId = user.uid
    userDisplayName = user.displayName
		loadContent()
	} else {
    document.getElementById('loader').setAttribute('style', 'display: none')
  }
})
ui.start(document.getElementById('auth'), {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: location.href
})  
function loadContent () {
  firebase.database().ref('/msgs').on('value', function (snapshot) {
    var data = snapshot.val()
    onContentLoaded(data)
  }, function (err) {
    console.log(err)
    onContentLoaded({})
  })
}
function onContentLoaded (data) {
  document.getElementById('content').innerHTML = ''
  if (data[userId] === undefined) {
    data[userId] = {
      name: userDisplayName,
      message: ''
    }
  }
  for (uid in data) {
    var clone = document.importNode(document.getElementById('user-template').content, true)
    clone.querySelector('.name').innerText = data[uid].name
    clone.querySelector('.message').innerText = data[uid].message
    clone.querySelector('.message').setAttribute('id', uid)
    clone.querySelector('.save').addEventListener('click', onContentChange)
    clone.querySelector('.save').setAttribute('data-uid', uid)
    document.getElementById('content').appendChild(clone)
  }
  document.getElementById('loader').setAttribute('style', 'display: none')
}
function onContentChange () {
  var uid = event.target.getAttribute('data-uid')
  var value = document.getElementById(uid).value
  document.getElementById('loader').setAttribute('style', '')
  firebase.database().ref('/msgs/' + uid).set({ message: value, name: userDisplayName }, contentAfterSave)
}
function contentAfterSave (err) {
  document.getElementById('loader').setAttribute('style', 'display: none')
  if (err) {
    document.getElementById('message').innerText = err.message
  } else {
    document.getElementById('message').innerText = ''
  }
}
function onLogout () {
  document.getElementById('content').innerHTML = ''
  firebase.auth().signOut()
  document.getElementById('logout').setAttribute('style', 'display: none')
  document.getElementById('auth').setAttribute('style', '')
} */

var userId = null


firebase.auth().onAuthStateChanged(onAuth);
var ui = new firebaseui.auth.AuthUI(firebase.auth())
startAuth()

function startAuth(){
	ui.start(document.getElementById('auth-ui'), {
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		signInSuccessUrl: 'http://' + location.hostname + ''
	})
}		

function onAuth (user) {
	if (user !== null) {
		userId = user.uid
		document.getElementById('login-name').innerText=user.displayName
		document.getElementById('login').setAttribute('style', 'display:none')
		document.getElementById('logout').setAttribute('style', '')
		document.getElementById('auth-ui').setAttribute('style', 'display:none')
		router.resolve()
	} else {
		userId = null
		document.getElementById('login-name').innerText=''
		document.getElementById('login').setAttribute('style', '')
		document.getElementById('logout').setAttribute('style', 'display:none')
	}
	
}

