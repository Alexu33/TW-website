var coachesarr=[];


function InsertName(element,father)
{
    var aux = document.createElement("h1");
    aux.innerHTML = element.name;
    father.appendChild(aux);
}
function InsertPhoto(element,father)
{
    var aux = document.createElement("img");
    aux.setAttribute("onerror","this.src='http://www.freeiconspng.com/uploads/error-icon-28.png'")
    aux.src = element.img;
    aux.classList.add("coachermenuimg");
    father.appendChild(aux);
}
function InsertNULL(father)
{
    var aux = document.createElement("div");
    father.appendChild(aux);
}

var body = document.getElementsByClassName("coachermenu")[0];
var loading = document.createElement("h1");
loading.innerHTML = "Loading...";
body.append(loading);


var username;
var password;
var isadmin=false;

function addadmintools()
{
    var titlu = document.createElement("h1");
    titlu.classList.add("admintool");
    titlu.innerHTML="ADMIN TOOLS";
    document.getElementById("text").appendChild(titlu);

    
    var adminpowers=document.getElementById("adminpowers");
    var id = document.createElement("p");
    id.innerHTML = "ID: ";
    id.classList.add("admintool");
    id.setAttribute("id","ID");
    adminpowers.appendChild(id);
    
    var nume = document.createElement("input");
    nume.setAttribute("id","NUME");
    nume.classList.add("admintool");
    adminpowers.appendChild(nume);
    
    var img = document.createElement("input");
    img.setAttribute("id","IMG");
    img.classList.add("admintool");
    adminpowers.appendChild(img);


    var savebutton = document.createElement("button");
    savebutton.setAttribute("id","ADD");
    savebutton.innerHTML = "Add";
    savebutton.classList.add("admintool");
    savebutton.onclick=addCoach;
    adminpowers.appendChild(savebutton);



    var updatebutton = document.createElement("button");
    updatebutton.setAttribute("id", "UPDATE");
    updatebutton.innerHTML = "Update";
    updatebutton.classList.add("admintool");
    updatebutton.onclick=editCoach;
    adminpowers.appendChild(updatebutton);


    var deletebutton = document.createElement("button");
    deletebutton.setAttribute("id","DELETE");
    deletebutton.classList.add("admintool");
    deletebutton.innerHTML = "Delete";
    deletebutton.onclick=deleteCoach;
    adminpowers.appendChild(deletebutton);


    document.getElementsByClassName("coachermenu")[0].addEventListener("click", (e) => 
    {
        var decautat;
        console.log(e.target.nodeName);
        if(e.target.nodeName=="H1")
            decautat=e.target.innerHTML;
        else
            decautat=e.target.src;
        
        for(let i=0;i<coachesarr.length;i++)
            if(coachesarr[i].img == decautat || coachesarr[i].name ==decautat)
                {
                    ok=true;
                    id.innerHTML = "ID: "+coachesarr[i].id;
                    nume.value = coachesarr[i].name;
                    img.value = coachesarr[i].img;
                    break;
                }
    }
    
    );

}


function checkdata()
{
    var nume = document.getElementById("NUME").value;
    var img = document.getElementById("IMG").value;
    console.log("hmmmmmmmm:" , nume, " --- ",img);
    var ok=false;
    console.log(coachesarr.length);
    for(let i=0;i<coachesarr.length;i++)
    {
        console.log(coachesarr[i].nume, " === ", coachesarr[i].img);
        if(coachesarr[i].name==nume || coachesarr[i].img==img)
        {ok=true;}
    }
        
    if(ok==true)
        {
            alert("Nu se poate face operatia deoarece mai exista o persoana la fel");
            return false;
        }
    else
        return true;
}




function login()
{
    
    var usernameinput = document.getElementsByClassName("login-input")[0];
    var passwordinput = document.getElementsByClassName("login-input")[1];
    //console.log(usernameinput.value, " --- ", passwordinput.value);
    if(usernameinput.style.backgroundColor=="green" && passwordinput.style.backgroundColor=="green")
    {
        if(usernameinput.value!= "admin" && passwordinput.value!= "admin")
        {
            usernameinput.value ="";
            passwordinput.value ="";
            alert("login invalid");
            usernameinput.style.backgroundColor="white";
            passwordinput.style.backgroundColor="white";
        }
        else
        {
            //console.log("hmmmmmmmmm");
            localStorage.setItem("username","admin");
            localStorage.setItem("password","admin");
            window.location.reload();
        }

    }
    else
    {
        //console.log("????");
        alert("Input invalid");
    }


    

}

function logout()
{
    localStorage.setItem("username","");
    localStorage.setItem("password","");
    window.location.reload();
}



function addloginelements()
{
    var loginfather = document.getElementById("login");
    var usernameinput = document.createElement("input");
    usernameinput.classList.add("login-input");
    usernameinput.placeholder ="Nume...";
    usernameinput.addEventListener("keyup", () => 
    {
        if(usernameinput.value=="")
            usernameinput.style.backgroundColor="red";
        else
            usernameinput.style.backgroundColor="green";
    })
    loginfather.appendChild(usernameinput);
    
    var passwordinput = document.createElement("input");
    passwordinput.classList.add("login-input");
    passwordinput.placeholder = "Parola...";
    passwordinput.addEventListener("keyup", () =>  
    {
        if(passwordinput.value=="")
            passwordinput.style.backgroundColor="red";
        else
            passwordinput.style.backgroundColor="green";
    })
    loginfather.appendChild(passwordinput);

    var loginbutton = document.createElement("button");
    loginbutton.onclick = login;
    loginbutton.innerHTML = "Login";
    loginfather.appendChild(loginbutton);

    if(isadmin==true)
    {
        loginfather.removeChild(usernameinput);
        loginfather.removeChild(passwordinput);
        loginfather.removeChild(loginbutton);

        var logoutbutton = document.createElement("button");
        logoutbutton.addEventListener("click",logout);
        logoutbutton.innerHTML = "logout";
        loginfather.appendChild(logoutbutton);
    }
        

    
}

function checklogin()
{
    username = localStorage.getItem("username");
    password = localStorage.getItem("password");
    if(username=="admin" && password=="admin")
        isadmin=true;
    addloginelements();
}






function Fetchcoaches()
{

    fetch("http://localhost:3000/coaches",{method:"get"}).then(function(response)
    {
        response.json().then((data) =>{
            var rest;
            console.log("a intrat? ");
            if(data.length)
                body.removeChild(loading);
            console.log(data);
            for(let i=0;i<data.length;i++)
                coachesarr.push(data[i]);
            console.log(coachesarr);
            rest=data.length;
            if(data.length>=3)
            {
                rest=data.length;
                for(let i=0;rest>=3;i+=3)
                {
                    console.log("i= ",i);
                    rest=data.length-i-3;
                    InsertPhoto(data[i],body);
                    InsertPhoto(data[i+1],body);
                    InsertPhoto(data[i+2],body);
                    InsertName(data[i],body);
                    InsertName(data[i+1],body);
                    InsertName(data[i+2],body);
                }
            }
                
            console.log("rest: ",rest);
            if(rest!=0)
            {
                console.log("rest: ",rest);
                for(let i=1;i<=rest;i++)
                    InsertPhoto(data[data.length-rest+i-1],body);
                for(let i=1;i<=(3-rest);i++)
                    InsertNULL(body);
                for(let i=1;i<=rest;i++)
                    InsertName(data[data.length-rest+i-1],body);
                for(let i=1;i<=(3-rest);i++)
                    InsertNULL(body);
            }

        })
    }
    
    
    )
    






}



var ID;

function addCoach()
{
    if(checkdata()==true)
    {
        let name=document.getElementById("NUME").value;
        let image=document.getElementById("IMG").value;
        if(name!="" && image!="")
        {
            let newCoach = {
                name: name, 
                img:image
            };
            console.log(newCoach);
            fetch("http://localhost:3000/coaches",
            {
                method:'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newCoach) 
            }
            ).then(function(response){window.location.reload()});
        }
        else
        {
            alert("DATE INVALIDE");
        }

    }
    

}

function editCoach()
{
    
    var name = document.getElementById("NUME").value;
    var img = document.getElementById("IMG").value;
    ID=document.getElementById("ID").innerHTML;
    ID=ID.split(" ")[1];
    var newCoach={
        name:name,
        img:img
    }
    if(ID!="")
    {
        fetch('http://localhost:3000/coaches/'+ID,
        {
            method:'put',
            headers:
            {
                'Content-Type':"application/json"
            },
            body:JSON.stringify(newCoach)
        }  
        ).then(function(response){window.location.reload()});
    }
    else
    alert("ID INVALID");

    
}

function deleteCoach()
{

    ID=document.getElementById("ID").innerHTML;
    ID=ID.split(" ")[1];
    if(ID!="")
{
    fetch('http://localhost:3000/coaches/'+ID,
    {
        method:'delete',
        headers:
        {
            'Content-Type':'application/json'
        },
    }
    ).then(function(response){window.location.reload()});
}
else
alert("ID INVALID");
    

}






checklogin();
if(isadmin==true)
addadmintools();
Fetchcoaches();

console.log(coachesarr);