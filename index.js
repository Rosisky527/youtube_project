let api_key = "AIzaSyD6eEuFBigBjU910PjLH9-IiuR3cHqdqlA";

let video_http = "https://www.googleapis.com/youtube/v3/search?";

let videoContainer = document.getElementById("videos");

// LOAD VIDEOS
fetchVideos("trending");

function fetchVideos(query){
  videoContainer.innerHTML = "";

  fetch(video_http + new URLSearchParams({
    key: api_key,
    part: "snippet",
    maxResults: 12,
    q: query,
    type: "video"
  }))
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      let v = item.snippet;

      videoContainer.innerHTML += `
        <div class="card" onclick="playVideo('${item.id.videoId}')">
          <img src="${v.thumbnails.high.url}">
          <p>${v.title}</p>
        </div>
      `;
    });
  });
}

// SEARCH
document.getElementById("search").addEventListener("keyup", (e)=>{
  if(e.key === "Enter"){
    fetchVideos(e.target.value);
  }
});

// PLAY + SAVE HISTORY
function playVideo(id){
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    id: id,
    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    title: "Watched Video"
  });

  localStorage.setItem("history", JSON.stringify(history));

  window.open(`https://www.youtube.com/watch?v=${id}`);
}