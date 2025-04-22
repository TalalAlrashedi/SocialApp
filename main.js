//TODO:Register Button
setupUI()
const baseUrl = "https://tarmeezacademy.com/api/v1"
funcRequest()
//send request and get response
function funcRequest ()
{
axios.get(`${baseUrl}/posts?limit=10`)
.then((response) => {

    //create variable posts and 
    const posts = response.data.data

    let postTitle = ""

    document.getElementById("Posts").innerHTML = ""

    // make for loop for every post
    for(post of posts){

        if(post.title !=null){

            postTitle = post.title
        }

        let author = post.author
        let content =
        `<div class="d-flex justify-content-center pt-3">  

            <div id="Posts" class="col-9">

        <!--Post-->
            <div class="card shadow">
                
                    <div class="card-header">
                        <!--image profile and border-->
                        <img src="${author.profile_image}" style="height: 40px; width: 40px;" class="rounded-circle pt-2 border border-2">
                        <b>@${author.username}</b>
                    </div>

                <!--Pics And comments-->    
                <div class="card-body">
                    <img class="w-100" src="${post.image}" >

                    <h6 style="color: grey;" class="pt-1">${post.created_at} ago</h6>
                    <h4>${postTitle}</h4>
                    

                    <p>${post.body}</p>
                    <hr style="border-color:rgb(178, 178, 178);">

                    <!--Comments-->
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                         
                        <span>(${post.comments_count}) Comments</span>
                        
                        
                        </span>

                    </div>

                </div>
            </div>
        <!--//Post//-->
        
        </div>

            </div>`

            document.getElementById("Posts").innerHTML += content
            
            //TODO: fix tags 

            // const currentTagsID = `post-tags-${post.id}`
            // document.getElementById(currentTagsID).innerHTML = ""

            // for(tag of post.tags){

            //     let tagsContent = `
            //     <div class="btn btn-sm rounded-5" style="background-color:gray; color:white;" >
                    
            //     ${tag.name}
                
            //     </div>
            //     `   
            //     document.getElementById(currentTagsID).innerHTML += tagsContent
            // }

            
    }
    
})
}

//create function and make link bettwen onclick on html and js
//once user clicked it will call this function and send post request      

const loginbtnClicked = () =>
{
    
    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value

    console.log(username, password)

    const loginUrl = `${baseUrl}/login`
    const params = {

        "username": username , 
        "password" : password

    }

    axios.post(loginUrl, params)
    .then((response) => {
        console.log(response.data)
        //defined token for token, currentUser

        //it takes 2 params one variable name it anything
        localStorage.setItem("token",response.data.token)  
        localStorage.setItem("user", JSON.stringify(response.data.user))

        const modal = document.getElementById("login-modal")
        const instentModal = bootstrap.Modal.getInstance(modal)
        instentModal.hide()
        showSuccess("تم تسجيل الدخول بنجاح.", "success")
        setupUI()
    })


    // .catch((error) => {
    //     console.error("login failed : " ,error.response ? error.response.data: error.message)
    //     alert("failed from here")
    // })
}


//success alert
const showSuccess = (message , colorAlert) => {

    const alertPlaceholder = document.getElementById("success-alert")
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
      
    }
    
      
        appendAlert(message, colorAlert)
      
    }


//UI Login
function setupUI() 
{

    const token = localStorage.getItem("token")

    const loginDiv = document.getElementById("logged-Div")
    const logoutDiv = document.getElementById("logout-Div")

    const addPost = document.getElementById("addPost")


    if (token == null){

        addPost.style.setProperty("display", "none","important")
        loginDiv.style.setProperty("display", "flex","important")
        logoutDiv.style.setProperty("display", "none","important")



    }else{
        loginDiv.style.setProperty("display", "none","important")
        logoutDiv.style.setProperty("display", "flex","important")
        addPost.style.setProperty("display", "block","important")

    }
}


//Logout Button
const logoutBtn = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showSuccess("تم نسجيل الخروج بنجاح.", "warning")
    setupUI()
}

//Register Button
function registerButton()
{

    const nameRegister = document.getElementById("register-name-input").value
    const usernameRegister = document.getElementById("register-username-input").value
    const passwordRegister = document.getElementById("register-password-input").value

    // console.log(nameRegister,usernameRegister,passwordRegister)

    const registerUrl = `${baseUrl}/register`

    const params = {

        "name": nameRegister ,
        "username": usernameRegister ,
        "password": passwordRegister
    }


    axios.post(registerUrl,params)
    .then((response) => {

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", response.data.user)

        const modal = document.getElementById("register-modal")
        const instentModal = bootstrap.Modal.getInstance(modal)

        instentModal.hide()
        showSuccess("تم انشاء الحساب بنجاح.", "success")
        setupUI()

    }).catch((error) => {

        const message = error.response.data.message
        showSuccess(message, "danger")
    })
}


//Create Button Post
const createPostBtn = () => 
    {
    const body = document.getElementById("body-post-input").value
    const title = document.getElementById("title-post-input").value
    let image = document.getElementById("image-post-input").files[0]
    
    const token = localStorage.getItem("token")

    let fromdata = new FormData()
    fromdata.append("body",body)
    fromdata.append("title",title)
    fromdata.append("image",image)



    const postUrl = `${baseUrl}/posts`

    
    const headers = {
        "Content-Type": "multipart/form-data" ,
        "authorization": `Bearer ${token}`
    }

    axios.post(postUrl, fromdata , {

        headers:headers
    })
    .then((response) =>  {
        
        console.log(response.data)
        const modal = document.getElementById("addPost-modal")
        const instentModal = bootstrap.Modal.getInstance(modal)
        instentModal.hide()
        showSuccess("تم ارسال المنشور بنجاح ", "success")
        funcRequest()
        
    }
   

).catch((error) => {

    const message = error.response.data.message
    showSuccess(message, "danger")

})

}