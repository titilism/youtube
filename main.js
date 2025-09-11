    let api_index = document.getElementById("apiIndex");

    const API_KEYS = [  "AIzaSyAxMi19W-7eRBPMzrf_eVB7GrSa1y6tv9Q",
                        "AIzaSyAkcSBM7e5ht7VjtLQzuKYewMI2lr1aif4",
                        "AIzaSyBc2semdddUwDPkigw5rmHRhNolyF-Vbl8",
                        "AIzaSyArcCkFZsbhEqmraf8sl_lZbIrqamBBwl8",
                        "AIzaSyAQdvOoA6-J4ATTnHv2ErpWN7E3e57j9MY",
                        "AIzaSyDnw4EcmgaEHdcLBKHDTUapwVxffDEgIwE"]; 

    // function api(){
    //     console.log(API_KEYS[api_index.value]);
    // }

    for (let option = 0; option < API_KEYS.length; option++){
        // console.log(API_KEYS[option]);
        api_index.innerHTML += `<option value="${option}">API ${option +1}</option>`;
    }


    function searchVideos() {
      const query = document.getElementById("search").value.trim();
    //   alert(API_KEYS[api_index.value]);
      if (!query) {
        alert("Please enter a search term!");
        return;
      }

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${API_KEYS[api_index.value]}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const results = document.getElementById("results");
          results.innerHTML = ""; // clear old results
          console.log(data);
          if (data.items) {
            data.items.forEach(item => {
              const vid = item.id.videoId;
              const title = item.snippet.title;
              const desc = item.snippet.description;

              const div = document.createElement("div");
              div.innerHTML = `
               
                <iframe style="width:78vw;height:35vw"
                  src="https://www.youtube.com/embed/${vid}"
                  frameborder="0" allowfullscreen>
                </iframe>
                 <h3>${title}</h3>
                <p>${desc}</p>
              `;
              results.appendChild(div);
            });
          } else {
            results.innerHTML = "<p>No results found or API error.</p>";
          }
        })
        .catch(err => {
          console.error("API Error:", err);
          document.getElementById("results").innerHTML = "<p>Failed to fetch results. Check console.</p>";
        });
    }
