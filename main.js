const treePictureId = "treeImage";
const treeId = "treeName";
const screamReasonId = "yUScream";
const starBox = "rate";
const ratingInputId = "rating";
const TreeListId = "Tree-list";

//remeber to add validation.

//THIS IS WHERE I TRIED TO WORK ON THE IMAGE UPLOAD AREA OF THE FORM.

// const treePictureid = document.querySelector("treeImage");
// var uploaded_image = "";

// treePictureId.addEvenetListerner("change", function(){
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//         uploaded_image = reader.result;
//         document.querySelector("#display_Image").style.backgroundImage = `url(${uploaded_image})`
//     });
//     reader.readAsDataURL(this.files[0]);
// })

let ScreamTree = JSON.parse(localStorage.getItem(TreeListId)) || [];

document.getElementById("body").onload = () => {
  listTree();
  const formStars = document.querySelectorAll(".button-stars");
  formStars.forEach((star, i) => {
    star.onclick = (e) => {
      e.preventDefault();
      let current_star_level = i + 1;
      document.getElementById(ratingInputId).value = current_star_level;
      const currentRating = document.getElementById("current_rating");
      currentRating.innerText = `${current_star_level} of 5`;

      formStars.forEach((starJ, j) => {
        if (current_star_level >= j + 1) {
          starJ.innerHTML = "&#9733";
        } else {
          starJ.innerHTML = "&#9734";
        }
      });
    };
  });
};

let dataURL;

function addTree() {
  let errors = [];
  let x = document.forms["myForm"]["treeName"].value;
  let y = document.forms["myForm"]["yUScream"].value;
  if (x == "") {
    errors.push("Only a true bastard wouldn't name a Tree.");
  }
  if (y == "") {
    errors.push(
      "clear your guilty concience by telling us all why this tree was screaming, you filthy f*ck"
    );
  }
  if (x.length >= 25) {
    errors.push(
      "This Tree would never accept such a long name! you have failed to be mediocre, again. Look into my eyes so I can taste your sweet sweet sadness"
    );
  }
  if (y.length >= 100) {
    errors.push(
      "You have reasoned a reason of unduly lengthy proportions to be truly honest, you artisinary wordsmith, you"
    );
  }

//   if 
//     errors.push("Your name has been refused as it belongs to another!")
//   }

  if (/\d/g.test(x)){
    errors.push("This is a Tree, not a Robot, take your numerical nonsense elsewhere, you Warlock");
  }
  if (!dataURL) {
    errors.push();
  }
  if (errors.length > 0) {
    alert(errors.join());
  } else {

    const Tree = {
      [treePictureId]: dataURL,
      [treeId]: document.getElementById(treeId).value,
      [screamReasonId]: document.getElementById(screamReasonId).value,
      [starBox]: document.getElementById(ratingInputId).value,
    };
    ScreamTree.push(Tree);
    localStorage.setItem(TreeListId, JSON.stringify(ScreamTree));
    listTree();
  }
}

function listTree() {
  const TreeListElement = document.getElementById("Tree-list");
  TreeListElement.innerHTML = "";

  ScreamTree.forEach((x, i) => {
    // think local storage needs to be involved here
    TreeListElement.innerHTML += `
    <div class = "treeDiv" id="treeDiv-${i}">
        <li id="list-item-${i}">
        <span class = "tree-name">
                Tree Name: ${x[treeId]}
        </span>
            <div class = "innertreeDiv">
                <br>
                <div class="img-container">
                    <img class="list-tree-image" src="${x[treePictureId]}"/>
                </div>
                <span class = "screamReason">
                reason for scream: ${x[screamReasonId]}
                </span>
                <br>
                rate: ${x[starBox]}
                <br>
                <span class = "stars">
                    <span class="tree-star tree-stars-${i}">&#9733</span>
                    <span class="tree-star tree-stars-${i}">&#9733</span>
                    <span class="tree-star tree-stars-${i}">&#9733</span>
                    <span class="tree-star tree-stars-${i}">&#9733</span>
                    <span class="tree-star tree-stars-${i}">&#9733</span>
                 </span>   
                 
                    <div class = "button" id="button-div-${i}"></div>           
                </div>
        </li>
        </div>`;

    const del = document.createElement("img");
    del.src = "./tree delete.png"
    del.className = "deleteMyTree";
    del.id = `delete-button-${i}`;
    document.getElementById(`button-div-${i}`).appendChild(del);

    const edit = document.createElement("button");
    edit.innerHTML = "edit"
    edit.id = `edit-button-${i}`;
    document.getElementById(`button-div-${i}`).appendChild(edit);
  });

  ScreamTree.forEach((tree, treeIndex) => {
    document.getElementById(`delete-button-${treeIndex}`).onclick = () => {
      deleteTree(treeIndex);
      listTree();
    };

    document.getElementById(`edit-button-${treeIndex}`).onclick = () => {
        editTree(treeIndex)
    }

    

    const allStars = document.querySelectorAll(`.tree-stars-${treeIndex}`);
    allStars.forEach((star, starIndex) => {
      if (starIndex < tree.rate) {
        star.innerHTML = "&#9733";
      } else {
        star.innerHTML = "&#9734";
      }
    });

    const treeDiv = document.createElement("div");
    document.getElementById("body").appendChild(treeDiv);
  });
}

let reader = new FileReader();

const input = document.getElementById("treeImage");

input.onchange = () => {
  reader.readAsDataURL(input.files[0]);
};

reader.onload = () => {
  const PreviewDiv = document.getElementById("display-Image");
  const imgElement = document.getElementById("imgPreview");
  imgElement.src = reader.result;
  PreviewDiv.style.display = "block";
  dataURL = reader.result;
};

function deleteTree(index) {
  ScreamTree = ScreamTree.filter((x, i) => i !== index);
  localStorage.setItem(TreeListId, JSON.stringify(ScreamTree));
}



function editTree(index) {
    listTree();
    const html = `
        Name: <input type="text" id="treeNameEdit" name="treeName"><br>
        Reason: <input type="text" id="treeReasonEdit" name="treeReasonEdit"><br>
        Rating: <input type="text" id="treeRatingEdit" name="treeRatingEdit"><br>
        <button id="completeEditButton">Finish Editing</button>
    `;
    const form = document.createElement('div')
    form.innerHTML = html;
    document.getElementById(`list-item-${index}`).appendChild(form);
    document.getElementById('completeEditButton').onclick = (e) => {
        e.preventDefault();
        const formerTree = ScreamTree[index];
        const updatedTree = {
            ...formerTree,
            [treeId]: document.getElementById('treeNameEdit').value,
            [screamReasonId]: document.getElementById('treeReasonEdit').value,
            [starBox]: document.getElementById('treeRatingEdit').value,
        };
        ScreamTree[index] = updatedTree;
        localStorage.setItem(TreeListId, JSON.stringify(ScreamTree));
        listTree();
    }
}

    // ul.addEventListener('click', (event) => {
    //     if(button.textContent === 'edit'){
    //         const span = li.firstElementChild;
    //         const input = document.createElement('input');
    //         input.type = "text";
    //         input.value = span.textContent;
    //         li.insertBefore(input, span);
    //         li.removeChild(span);
    //         button.textContent = "save";
    //     if (button.textContent === 'save'){
    //         const input = li.firstElementChild;
    //         const span = document.createElement('span');
    //         span.textContent = input.value;
    //         li.insertBefore(span, input);
    //         li.removeChild(input);
    //         button.textInput = 'edit';
    //     };
    // }


function clearArray() {
  localStorage.clear();
  ScreamTree = JSON.parse(localStorage.getItem("ScreamTree")) || [];
  document.getElementById("Tree-list").innerHTML = "";
}

function saveTheTrees() {
  clearAlerts();
  localStorage.setItem(TreeListId, JSON.stringify(ScreamTree));
}
//image uploader attempt

//to styalise I need to create a div element for the inout
//maybe use create element and before input to have this div
//the div should have a style...is that possible?

//we want the stars to print under the rest of the inputs, not just a numeric rating. andy has a workaround
//if we have the stars fill in according to whether they are less or equal to the rating input(a numeric filling?) and print those stars in a line at the
//bottom they will look more like what I'm looking for
