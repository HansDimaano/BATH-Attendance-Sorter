
////-- JAVASCRIPT FOR REVEALING CONTENT ANIMATIONS
// (partnered by reveal animation css)

function revealContent() { // function for revealing content

    var revealContents = document.getElementsByClassName("reveal"); // get all elements that has reveal class name

    for (var i = 0; i < revealContents.length; i++) { // for loop that iterates through all the reveal contents

        var height = window.innerHeight; // get window inner height
        var contentTop = revealContents[i].getBoundingClientRect().top; // get the top value of content

        if (contentTop < height - 50) { // if content top is less than window height minus 50

            revealContents[i].classList.add("active"); // assign the "active" class to the revealed contents
        }
        else { // the content must not be revealed yet

            revealContents[i].classList.remove("active"); // remove the "active" class to the unrevealed contents
        }
    }
}

window.addEventListener('scroll', revealContent); // call the reveal content function when user scrolls