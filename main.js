function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    const obj = {
        name,
        email,
        phonenumber
    }
   axios.post("https://crudcrud.com/api/94b17470dcf64187816372b9dafc6e3d/appointmentData",obj)
   .then((res)=>{
    showListofRegisteredUser(res.data)
   // console.log(res)
   })
   .catch((err)=>{
    console.log(err)
   })
   
   // localStorage.setItem(obj.email, JSON.stringify(obj))
   // showListofRegisteredUser(obj)
}

window.addEventListener('DOMContentLoaded', (event) => {
    axios.get("https://crudcrud.com/api/94b17470dcf64187816372b9dafc6e3d/appointmentData")
   .then((res)=>{
    for(var i=0; i<res.data.length; i++)
    {
        showListofRegisteredUser(res.data[i])
    }
   // console.log(res)
   })
   .catch((err)=>{
    console.log(err)
   })
    // Object.keys(localStorage).forEach(key => {
    //     const user = JSON.parse(localStorage.getItem(key))
    //     showListofRegisteredUser(user)
    // })
})

function showListofRegisteredUser(user){
    const parentNode = document.getElementById('listOfitems');
    const createNewUserHtml = `<li id='${user._id}'>${user.name} - ${user.email} - ${user.phonenumber}
                                    <button onclick=deleteUser('${user._id}')>Delete</button><button onclick=edituser('${user._id}')>Edit</button>
                                </li>
                                `
    console.log(createNewUserHtml)
    parentNode.innerHTML +=  createNewUserHtml;
    console.log(parentNode.innerHTML)
}

function deleteUser(userid) {
    axios.delete(`https://crudcrud.com/api/94b17470dcf64187816372b9dafc6e3d/appointmentData/${userid}`)
    .then((res)=>{
        removeItemFromScreen(userid);
    })
    .catch((err)=>{
        console.log(err)
    })
   // localStorage.removeItem(email)
   // removeItemFromScreen(email)
}

function removeItemFromScreen(userid){
    const parentNode = document.getElementById('listOfitems');
    const elem = document.getElementById(userid)
    parentNode.removeChild(elem);
}

function edituser(userid){
    axios.get(`https://crudcrud.com/api/4f9826ee7acb42bab3794ad23ddf0959/appointmentData/${userid}`)
.then((res)=>{
    document.getElementById('name').value=res.user.name;
    document.getElementById('email').value=res.user.email;
    document.getElementById('id').value=res.user._id;
})
.catch((err)=>{
    console.log(err)
})
}