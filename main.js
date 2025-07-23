let theInput = document.querySelector(".get-repo input");
let theButton = document.querySelector(".get-button");
let theShow = document.querySelector(".show");

theButton.addEventListener("click", () => {

        showData();
});

function showData() {
    if (theInput.value === "") {
        theShow.innerHTML = `<span>Please Enter GitHub User Name </span>`;
    } else {

        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.length === 0) {
                  theShow.innerHTML = `<span>No Repositories Found</span>`;
                } else {
                      theShow.innerHTML = ""; // Clear previous results

                      data.forEach((repo) => {
                        let mainDiv = document.createElement("div");
                        mainDiv.className = "repo";
                        let text = document.createTextNode(
                          `Name: ${repo.name}`
                        );
                        mainDiv.appendChild(text);

                        // Create a link to the repository
                        let link = document.createElement("a");
                        link.href = repo.html_url;
                        link.target = "_blank"; // Open in new tab
                        link.appendChild(document.createTextNode("View"));
                        mainDiv.appendChild(link);

                        // Create a span for stars
                        let stars = document.createElement("span");
                        stars.className = "stars";
                        stars.appendChild(
                          document.createTextNode(
                            `Stars: ${repo.stargazers_count}`
                          )
                        );
                        mainDiv.appendChild(stars);

                        theShow.appendChild(mainDiv);
                      });
                }
              
            })
            .catch(() => {
                theShow.innerHTML = `<span>This User Name Not Valid </span>`;
            });

    }

}