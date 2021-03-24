// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdOe_JssV-5HlVYM0GhFwKlT_G_d-8q2M",
    authDomain: "notes-app-a51b7.firebaseapp.com",
    projectId: "notes-app-a51b7",
    storageBucket: "notes-app-a51b7.appspot.com",
    messagingSenderId: "415019923323",
    appId: "1:415019923323:web:601a346c65aca6fee42fde"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const notePrev = document.querySelector('#notes');  // notePrev is the container in which we will add notes
const addNote = document.querySelector('#addnote');
const signOut = document.querySelector('#signout');
const userName = document.querySelector('#username')
const userid = localStorage.getItem('ID');
const docRef = firestore.collection(userid);


const editDoc = (note, id) => {

    localStorage.setItem('currNote', note);
    localStorage.setItem('docId', id);
    window.location.replace("editNote.html");

};

const createNote = (doc) => {
    let note = doc.get('note');
    let docId = doc.id;


    // creating elements
    const box = document.createElement('div');
    const btndiv = document.createElement('div');
    const btn1 = document.createElement('a');
    btn1.classList.add('btns');
    const btn2 = document.createElement('a');
    btn1.classList.add('btns');


    // adding class to elements
    box.classList.add('prevClass', 'capital', 'container');
    btndiv.classList.add('btndiv');
    btn1.classList.add('btn', 'btn-light', 'btn-sm');
    btn2.classList.add('btn', 'btn-light', 'btn-sm');
    btn1.innerText = 'Delete'
    btn1.href = '#';
    btn1.setAttribute('onclick', `deleteDoc("${docId}")`);

    btn2.innerText = 'Edit'
    btn2.href = '#';
    btn2.setAttribute('onclick', `editDoc("${note}", "${docId}")`)

    // appending element to body
    btndiv.append(btn2, btn1);
    box.append(note);
    box.append(btndiv);
    notePrev.append(box);
};

const deleteDoc = (id) => {

    docRef.doc(id).delete()
        .then(() => {
            window.alert('Note deleted sucessfully !!!');
            window.location.reload(true);
            return;
        }).catch((error) => {
            console.log(error);
            window.alert("Something went wrong !!!");
        });

    setTimeout(() => {
        console.log('wait !!!');
    }, 1000);

    return false;
};


window.addEventListener('load', () => {

    var database = firebase.database().ref('User/' + userid);

    database.on('value', (snapshot) => {
        const username = snapshot.val().firstName + ' ' + snapshot.val().lastName;
        // console.log(username);
        userName.innerText = 'Welcome ' + username + '  !';
        userName.classList.add('capital');
    });


    docRef.get()
        .then((collSnapshot) => {


            //                              <-- USING FIRESTORE ARRAY--/> 
            // console.log("Document data:", doc.data());
            // let messArray = doc.data().messages;
            // messArray is an array containing all the notes of the user
            // let i = 0;
            // for (let mess of messArray) {
            //     // creating elements
            //     const box = document.createElement('div');
            //     // box.id = i;
            //     const btndiv = document.createElement('div');
            //     btndiv.id = i;
            //     const btn1 = document.createElement('button');
            //     btn1.classList.add('btns');
            //     const btn2 = document.createElement('button');
            //     btn1.classList.add('btns');
            //     // adding class to elements
            //     box.classList.add('prevClass', 'capital', 'container');
            //     btndiv.classList.add('btndiv');
            //     btn1.classList.add('btn', 'btn-light', 'btn-sm');
            //     btn2.classList.add('btn', 'btn-light', 'btn-sm');
            //     btn1.innerText = 'Delete'
            //     btn1.addEventListener('click', del(mess));
            //     btn2.innerText = 'Edit'
            //     // appending element to body
            //     btndiv.append(btn2, btn1);
            //     box.append(mess);
            //     box.append(btndiv);
            //     notePrev.append(box);
            //     i++;
            // }


            // console.dir(collSnapshot);

            collSnapshot.forEach((doc) => {
                createNote(doc);
            })
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });

})

addNote.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "addNote.html";
})

signOut.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.replace("loginPage.html");
            window.alert('Logout Successfully !')

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorCode, errorMessage);
        });
})


//                              <-- FIRESTOREARRAY METHOD--/>
// function del(currdiv) {
//     firestore.collection('users').doc(userid).update({
//         messages: firebase.firestore.FieldValue.arrayRemove(currdiv)
//     })
//         .then(() => {
//             window.alert("Note Successfully Deleted !");
//         });
// }
