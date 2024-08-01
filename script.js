async function fetchData(url) {
    const response = await fetch(url);
    (await response.json()).data.map((data) => {
        console.log(data)
        const element = {
            tag: "div",
            children: {
                "h1": data.first_name + " " + data.last_name,
                "h3": data.email,
                "img": data.avatar
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

fetchData("https://reqres.in/api/users");

let currentIndex = 1

//For pagination
document.getElementById('prev').addEventListener('click', () => changePage(-1));
document.getElementById('next').addEventListener('click', () => changePage(1));

function changePage(direction) {
    if (document.getElementById("data")) {
        document.body.removeChild(document.getElementById("data"));
    }
    console.log(currentIndex)
    currentIndex += direction;
    if (currentIndex < 1) {
        currentIndex = 1; // Ensure currentIndex doesn't go below 1
    }
    fetchData(`https://reqres.in/api/users?page=${currentIndex}`);
}