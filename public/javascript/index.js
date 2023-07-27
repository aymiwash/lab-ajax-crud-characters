const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {

  //Selecting the div where characters will be displayed
  const containerDiv = document.querySelector(".characters-container")

  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    //Clear the container first
    containerDiv.innerHTML = ""

    //Get all characters with API
    const allCharacters = await charactersAPI.getFullList()

    //Then display all characters in container
    allCharacters.forEach(character => {
      const newDiv = document.createElement("div")
      newDiv.className = "character-info"
      containerDiv.appendChild(newDiv)
      newDiv.innerHTML = `
      <div class="id">Id: ${character.id}</div>
      <div class="name">Name: ${character.name}</div>
      <div class="occupation">Occupation: ${character.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
      <div class="weapon">Weapon: ${character.weapon}</div>`
    });
  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    //Clear container
    containerDiv.innerHTML = ""

    //Focusing on the input value to get the ID
    const characterId = document.querySelector('#search-input').value;

    //Get one character with API
    const oneCharacter = await charactersAPI.getOneRegister(characterId)

    //If the char is found
    if (oneCharacter) {
      //Create the new div
      const newDiv = document.createElement("div")
      newDiv.className = "character-info"
      containerDiv.appendChild(newDiv)
      newDiv.innerHTML = `
      <div class="id">Id: ${oneCharacter.id}</div>
      <div class="name">Name: ${oneCharacter.name}</div>
      <div class="occupation">Occupation: ${oneCharacter.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${oneCharacter.cartoon}</div>
      <div class="weapon">Weapon: ${oneCharacter.weapon}</div>`
    } else {
      containerDiv.innerHTML = "Character not found"
    }
    
    //Clear input
    document.querySelector('#search-input').value = ""
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    //Focusing on the input value to get the ID
    const characterId = document.querySelector('#delete-input').value;

    //If an ID is entered in input
    if (characterId.length !== 0) {
      const deletingChar = await charactersAPI.deleteOneRegister(characterId)
      //If deletion ok
      if (deletingChar) {
        containerDiv.innerHTML = "Successfully deleted"
      } else {
        containerDiv.innerHTML = "Character not found"
      }
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    //Getting all inputs value
    const editId = document.querySelector("#edit-id").value
    const editName = document.querySelector("#edit-name").value
    const editOccupation = document.querySelector("#edit-occupation").value
    const editWeapon = document.querySelector("#edit-weapon").value
    const editCartoon = document.querySelector("#edit-cartoon").checked

    //Store all values in a object
    const editChar = {
      name: editName,
      occupation: editOccupation,
      weapon: editWeapon,
      cartoon: editCartoon
    }

    //Editing char on API
    const editingChar = await charactersAPI.updateOneRegister(editId, editChar)
    if (editingChar) {
      containerDiv.innerHTML = "Successfully updated"
    } else {
      containerDiv.innerHTML = "Character not found"
    }
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    //Getting all inputs value
    const createName = document.querySelector("#create-name").value
    const createOccupation = document.querySelector("#create-occupation").value
    const createWeapon = document.querySelector("#create-weapon").value
    const createCartoon = document.querySelector("#create-cartoon").checked

    //Store all values in a object
    const createChar = {
      name: createName,
      occupation: createOccupation,
      weapon: createWeapon,
      cartoon: createCartoon
    }

    //Creating new char in API
    const createNewChar = await charactersAPI.createOneRegister(createChar)
    if (createNewChar) {
      console.log("Successfully created", createNewChar);
    }
  });
});


      // //Create the name div
      // const newNameDiv = document.createElement("div")
      // newNameDiv.className = "name"
      // newNameDiv.innerHTML = `Character: ${character.name}`
      // newDiv.appendChild(newNameDiv)
      // //Create the occupation div
      // const newOccupationDiv = document.createElement("div")
      // newOccupationDiv.className = "occupation"
      // newOccupationDiv.innerHTML = `Character Occupation: ${character.occupation}`
      // newDiv.appendChild(newOccupationDiv)
      // //create the cartoon div
      // const newCartoonDiv = document.createElement("div")
      // newCartoonDiv.className = "cartoon"
      // newCartoonDiv.innerHTML = `Is a Cartoon ?: ${character.cartoon}`
      // newDiv.appendChild(newCartoonDiv)
      // //Create the weapon div
      // const newWeaponDiv = document.createElement("div")
      // newWeaponDiv.className = "weapon"
      // newWeaponDiv.innerHTML = `Character Weapon: ${character.weapon}`
      // newDiv.appendChild(newWeaponDiv)