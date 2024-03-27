
function maskPassword(pass) {
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str;
}

// copy text
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            // alert("Copied text: " + txt);
            document.getElementById("alert").innerHTML = "(Copied)";
            document.getElementById("alert").style.display = "Inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "None";
            }, 2000);
        },
        () => {
            document.getElementById("alert").style.display = "None";

        }
    );
}


//delete password
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    //alert(`Successfully deleted ${website}'s password`);
    document.getElementById("alert").innerHTML = "(Deleted)";
    document.getElementById("alert").style.display = "Inline";
    setTimeout(() => {
        document.getElementById("alert").style.display = "None";
    }, 2000);
    showPasswords();
}


const showPasswords = () => {
    // Logic to fill the table;
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No record found..";
    }
    else {
        tb.innerHTML = `<tr>
    <th>Website</th>
    <th>User Name</th>
    <th>Password</th>
    <th>Delete</th>
</tr>`;
        let arr = JSON.parse(data);
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];

            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy Button" ></td>
                <td>${element.username}<img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Button" ></td>
                <td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Button" ></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')" >Delete</button></td>
        </tr>`
        }

        tb.innerHTML = tb.innerHTML + str;

    }
    website.value = "";
    username.value = "";
    password.value = "";
    document.getElementById("website").focus();
}
//console.log("working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();   //form submit nahi hoga bina data fill kiye
    //console.log("Clicked....");

    console.log(username.value, password.value);

    let passwords = localStorage.getItem("passwords");
    console.log(passwords);

    if (username.value == "" || password.value == "") {
        // alert("Enter username or password.");
        document.getElementById("errorMessage").innerHTML = "Enter username or password.";
        document.getElementById("errorMessage").style.display = "Inline";
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = "None";
        }, 3000);
    }
    else {
        let json = [];
        json = JSON.parse(localStorage.getItem("passwords"));
        if (json == null) {
            json = [];
        }
        json.push({ website: website.value, username: username.value, password: password.value })
        localStorage.setItem("passwords", JSON.stringify(json));
        document.getElementById("alert").innerHTML = "(Password saved)";
        document.getElementById("alert").style.display = "Inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "None";
        }, 2000);
        showPasswords();
    }
    showPasswords();
})


