async function fetchData(url) {
   const response = await fetch(url);
    Object.values((await response.json())).forEach(value => {
        if(typeof value === "object"){
            value.map((data) => {
                const element = {
                    tag: "div",
                    children: {}
                }
                for (const [key, value] of Object.entries(data)) {
                    if (typeof value === "object"){
                        continue;
                    }
                    else if (typeof value === "string") { 
                        if(value === ""){
                            continue
                        }
                        else if(key.toLowerCase().match('im') || value.toLowerCase().match('im')){
                            element.children.img = value;
                        }
                        else if (value.length < 20 || value.match("name")) {
                            element.children.h1 = value
                        }
                        else {
                            element.children.p = value
                        }
                       
                     }
                     else {
                        element.children.h3 = value;
                     }
                }
                const placeholder = document.createElement(element.tag);
                placeholder.id = "data";
                for (const [key, value] of Object.entries(element.children)) {
                    const temp = document.createElement(key);
                    if (key === "img") {
                        temp.src = value
                    }
                    else {
                        temp.innerHTML = value;
                    }
                    placeholder.appendChild(temp);
                }
                document.body.appendChild(placeholder)
            }
        
            )
        }
    } )
}

fetchData("https://newsapi.org/v2/everything?q=tesla&from=2024-07-01&sortBy=publishedAt&apiKey=777ca7dc161f412fa30e6189aac0ddb9");

let currentIndex = 1

//For pagination
document.getElementById('prev').addEventListener('click', () => changePage(-1));
document.getElementById('next').addEventListener('click', () => changePage(1));

function changePage(direction) {
    if (document.getElementById("data")) {
        document.body.removeChild(document.getElementById("data"));
    }
    currentIndex += direction;
    if (currentIndex < 1) {
        currentIndex = 1; // Ensure currentIndex doesn't go below 1
    }
    fetchData(`https://reqres.in/api/users?page=${currentIndex}`);
}