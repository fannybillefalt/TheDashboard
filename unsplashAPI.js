const baseURLUnsplash = "https://api.unsplash.com/photos/random/?client_id="
const apiKey = "GyPNH3GoIqCaSVT26Bh7fqXszB1Hb1jbs137kSJztkk"
console.log( `${baseURLUnsplash}${apiKey}`);

async function fetchUnsplashPhoto (){//hämtar data från API.
    try {
        const response = await fetch(
            `${baseURLUnsplash}${apiKey}`
        );
        
        if (!response.ok) {
            console.log("Något gick fel.");
            return;
        }

        const data = await response.json();
        console.log(data);
        showRandomBackground(data);
    } catch (error) {
        console.log(error);
    }
}

function clickForRandomBackground(){ //knappen lyssnar till klick
    const photo = document.getElementById("randombackground");
    photo.addEventListener("click", fetchUnsplashPhoto);
    }

function showRandomBackground(data){//visar datan.
    document.body.style.backgroundImage =`url(${data.urls.regular})`;
}

clickForRandomBackground();