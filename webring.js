//Adapted from https://css-tricks.com/how-you-might-build-a-modern-day-webring/

const DATA_FOR_WEBRING = `https://synopticoffice.github.io/gdcatalogue/webring.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>
.webring {
    display: block;
    width: 100%;
}

#copy {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between
    width: 100%;
    font-family: helvetica, arial, sans-serif;
    font-size: 0.875rem;
}

</style>

<div class="webring">
  <div id="copy">
    
  </div>
</div>`;

class WebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://synopticoffice.github.io/gdcatalogue/
    const thisSite = this.getAttribute("site");

    fetch(DATA_FOR_WEBRING)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex === sites.length) nextSiteIndex = 0;

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `
          <p>A Graphic Design Catalogue<br />
            <a href="${matchedSite.url}">${matchedSite.name}</a> was authored by ${matchedSite.owner}
          </p>
          
          <p>
            <a href="${sites[prevSiteIndex].url}">[Prev]</a>
            <a href="${sites[nextSiteIndex].url}">[Next]</a>
            <a href="${sites[randomSiteIndex].url}">[Random]</a>
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", WebRing);
