async function fetchData(url) {
    const response = await fetch(url);
    let responseData = await response.json();
    if (responseData instanceof Array) {
       responseData = {
        data: responseData
       }
        console.log(responseData)
    }
    const main = document.createElement('section');
    main.id="cards"
    Object.assign(main.style, {
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "gap": "20px",
    "width": "100%" // Ensure the main element takes up the full width of its container
});
    Object.values((responseData)).forEach(value => {
        if (value instanceof Array) {
            value.map((data) => {
                const element = {
                    tag: "div",
                    children: {
                        img: [],
                        h1: [],
                        p: [],
                        h3: [],
                        h4: [],
                        a: []
                    }
                }
                for (const [key, value] of Object.entries(data)) {
                    if (typeof value === "object") {
                        continue;
                    }
                    else if (typeof value === "string") {
                        if (value === "") {
                            continue
                        }
                        else if (key.toLowerCase().match('im') || key.toLowerCase().match('avatar')) {
                            element.children.img.push(value);
                        }
                        else if (value.length < 150) {
                            if(key.match("title") || key.match("name")){
                            element.children.h1.push(value);
                            }
                            else if(["content", "description", "username", "email"].some(field => key.match(field))){
                                element.children.p.push(value);
                            }
                            else if(value.match("http")){
                                element.children.a.push(value);
                            }
                            else {
                            element.children.h3.push(value);
                            }
                        }
                        else {
                            element.children.p.push(value);
                        }
                    }
                    else {
                        element.children.h4.push(value);
                    }
                }
                const placeholder = document.createElement(element.tag);
                placeholder.id = "data";
                for (const [key, value] of Object.entries(element.children)) {
                    if( typeof value === "number"){
                        continue
                    }
                    if (value.length <= 0) {
                        continue;
                    }
                    value.forEach(data => {
                        const temp = document.createElement(key);
                        if (key === "img") {
                            temp.src = data
                            temp.style.flexWrap = "wrap"
                        }
                        else if(key === "a"){
                            temp.href = data
                            temp.innerText = (data.length > 40) ? data.substring(0, 40) + "..." : data
                            temp.style.color = "pink"
                        }
                        else {
                            temp.innerHTML = data;
                        }
                        placeholder.appendChild(temp);
                    })
                }
                Object.assign(placeholder.style, {
                    "display": "flex",
                    "flexDirection": "column",
                
                    "backgroundColor": "black",
                    "color": "white",
                    "borderRadius": "20px",
                    "padding": "30px",
                    "width": "25%"
                })
                main.appendChild(placeholder)
            }

            )
        }
    })
    document.body.appendChild(main)

}

fetchData("https://newsapi.org/v2/everything?q=flowers&from=2024-07-03&sortBy=publishedAt&apiKey=777ca7dc161f412fa30e6189aac0ddb9");

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