// STARS

// const allStars = document.querySelectorAll('.star');
// let current_rating = document.querySelector('.current_rating')
// allStars.forEach((star, i) => {
//     star.onclick = (e) => {
//         e.preventDefault();
//         let current_star_level = i + 1;
//                 document.getElementById(ratingInputId).value = current_star_level;
//                 current_rating.innerText = `${current_star_level} of 5`;
        
//         allStars.forEach((star, j) => {
//                 if(current_star_level >= j+1)
//                 {
//                     star.innerHTML = '&#9733';
//                 }else{
//                     star.innerHTML = '&#9734';
//                 }
//         })

//     }
//     ScreamTree.push(starBox);
// })
const edit = document.createElement("button");
    edit.innerHTML = "edit"
    edit.id = `edit-Button-${i}`;
    document.getElementById(`button-div-${i}`).appendChild(edit);

    document.getElementById(`edit-button-${treeIndex}`).onclick = () => {
        editTree(treeIndex)
        listTree();
    }

function editTree(index) {

    ul.addEventListener('click', (event) => {
        if(button.textContent === 'edit'){
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = "text";
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = "save";
        if (button.textContent === 'save'){
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textInput = 'edit';
        };
    }


// function clearArray(){
//     localStorage.clear();
//     ScreamTree = JSON.parse(localStorage.getItem('ScreamTree')) || [];
//     document.getElementById("Tree-list").innerHTML = '';
    


//   }

//this is my star rating
// const allStars = document.querySelectorAll('.star');
// let current_rating = document.querySelector('.current_rating')

// allStars.forEach((star, i) => {
//     star.onclick = () => {
//         let current_star_level = i + 1;
//         current_rating.innerText = `${current_star_level} of 5`;
        
//         allStars.forEach((star, j) => {
//                 if(current_star_level >= j+1)
//                 {
//                     star.innerHTML = '&#9733';
//                 }else{
//                     star.innerHTML = '&#9734';
//                 }
//         })

//     }
// })