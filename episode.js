const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const podcastUrl = urlParams.get('podcasturl')

const detailsDiv = document.getElementById('details');
detailsDiv.innerText = `Looking for ${podcastUrl}`

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const xml = this.responseXML;
    const channelTitle = xml.querySelector('title').innerHTML
    const items = xml.getElementsByTagName('item')
    const randomIdx = Math.floor(Math.random() * items.length)
    const randomItem = items.item(randomIdx)

    const title = randomItem.querySelector('title').innerHTML
    const description = randomItem.querySelector('description').textContent
    const episodeUrl = randomItem.querySelector('enclosure').getAttribute('url')
    const mediaType = randomItem.querySelector('enclosure').getAttribute('type')

    detailsDiv.innerHTML = ''
    detailsDiv.innerHTML += `<h2>${channelTitle}</h2>`
    detailsDiv.innerHTML += `<h3>${title}</h3>`
    detailsDiv.innerHTML += `<p>${description}</p>`
    detailsDiv.innerHTML += `
    <audio controls>
      <source src="${episodeUrl}" type="${mediaType}">
    Your browser does not support the audio element.
    </audio>
    `
    detailsDiv.innerHTML += `<p><a href=${episodeUrl}>Download</a></p>`

    // detailsDiv.innerHTML = `<p>Got an episode for you called ${randomItem.querySelector('title').innerHTML}</p>`    
  } else {
    detailsDiv.innerHTML = `Could not find or failed to read feed at '${podcastUrl}'`
  }
}
xmlhttp.open("GET", podcastUrl, true);
xmlhttp.send();
