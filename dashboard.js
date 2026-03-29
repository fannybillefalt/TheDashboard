let dashboardData = {//objekt med alla data
  title: "Fannys dashboard",
  notes: "",
  links: [
    { title: "Google", url: "https://google.com" },
    { title: "Notion", url: "https://www.notion.com/" },
    { title: "Github", url: "https://github.com/" },
    { title: "Claud", url: "https://claud.ai" },
  ],
};

document.addEventListener("DOMContentLoaded", () => {//inväntar tills HTML sidan är färdigladdad innan koden kölrs
  const saved = localStorage.getItem("dashboard");//hämtar sparad data från webbläsarens lagring

  if (saved) {
    dashboardData = JSON.parse(saved);//omvandlar strängen tillbaka till JSobjekt
  }
  render();
});

function saveData() {//sparar data till LocalStorage, stringify omvandlar objekt till sträng
  localStorage.setItem("dashboard", JSON.stringify(dashboardData));
}

function getFavicon(url) {
  try {
    return new URL(url).hostname;//plockar ut domännamnet från en URL med new URL, trycatch fångar upp ev ogiltig url
  } catch {
    return "";
  }
}
function render() {
  //hämtar sparad data och visar den
  document.getElementById("mainheading").innerHTML = dashboardData.title;
  document.querySelector("textarea").value = dashboardData.notes;

  const linksHTML = dashboardData.links
    .map(//loopar igenom link arrayen och skapar HTML strukturen nedan 
      (link, index) => `
    <div class="contentCard link-item">
    <img src="https://www.google.com/s2/favicons?domain=${getFavicon(link.url)}&sz=64" class="favicon" />
        <a href="${link.url}">${link.title}</a>
        <button class="delete-btn" data-index="${index}"><img src="./pictures/minus.png"/></button>
    </div>
`,
    )
    .join("");//sätter ihop alla HTML strängar till en

  document.getElementById("links").innerHTML = linksHTML;
}

//addEventListener lyssnar till användar interaktioner,
// closest letar uppåt i DOM trädet då event.target ligger på img egentligen
//render har skapat 3 knappar med namnlapp data-index på varje med ett index 
document.getElementById("links").addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (deleteBtn) {
    const chosenIndex = Number(deleteBtn.dataset.index);//hämtar "2", omvandlar till 2 
    deleteLink(chosenIndex);//tar bort länken på index två i arrayen.
  }
});

document.getElementById("addlink").addEventListener("click", addLink);

const textarea = document.querySelector("textarea");
textarea.addEventListener("input", () => {//körs varje gång en anv skriver
  dashboardData.notes = textarea.value;
  saveData();
});

const heading = document.getElementById("mainheading");
heading.addEventListener("input", () => {
  dashboardData.title = heading.textContent;
  saveData();
});

//lägger till ny länk, prompt visar en popup ruta att fylla infon i,
//startswith kollar om strängen börjar med https:// och push lägger till i arrayen
function addLink() {
  const linkname = prompt("Ange namn på hemsidan");
  let link = prompt("Ange länken till hemsidan");
  if (!link.startsWith("https://")) {
    link = "https://" + link;
  }
  dashboardData.links.push({
    title: linkname,
    url: link,
  });
  saveData();
  render();
}

// filter tar emot upp till 3 argument: elementet, index och arrayen.
// Här används bara index för att filtrera bort rätt länk.
//filter skapar en ny array utan det valda elementet
function deleteLink(chosenIndex) {
  dashboardData.links = dashboardData.links.filter(
    (link, index) => index !== chosenIndex,
  );
  saveData();
  render();
}
