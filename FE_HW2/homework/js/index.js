let users = []; 

let currentEditingCard = null;


async function fetchUsers() {
  showSpinner();
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await response.json();
    renderUsers();
  } catch (error) {
    console.error("Ошибка загрузки пользователей:", error);
  } finally {
    hideSpinner();
  }
}
  
  function renderUsers( ) {
    const section = document.querySelector(".card-section");
    let cardList = document.createElement("ul");
    section.appendChild(cardList);

    users.forEach(user => {  
      const {id, name, username, phone, website, email} = user;
      let card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = `
        <div class="buttons">
          <button class="edit" data-id="${id}">EDIT</button>
          <button class="delete" data-id="${id}">DELETE</button>
        </div>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <h5 class="card-title__paragraph">${username}</h5>
          <ul>
            <li><h3>phone</h3><p>${phone}</p></li>
            <li><h3>website</h3><p>${website}</p></li>
            <li><h3>email</h3><p>${email}</p></li>
          </ul>
        </div>
      `;
      cardList.appendChild(card);
    }); 
    attachEventListeners();
  }
  
  function attachEventListeners() {
    document.querySelectorAll(".delete").forEach(button => {
      button.addEventListener("click", () => {
        deleteUsers(button.dataset.id);
        document.getElementById("sidebar").classList.remove("active");
      });
    });
  
    document.querySelectorAll(".edit").forEach(button => {
      button.addEventListener("click", () => {
        
        const card = button.closest(".card");
        currentEditingCard = card;  

        document.getElementById("name").value = card.querySelector("h2").textContent;
        document.getElementById("nickname").value = card.querySelector("h5").textContent;
        document.getElementById("phone").value = card.querySelectorAll("p")[0].textContent;
        document.getElementById("web-site").value = card.querySelectorAll("p")[1].textContent;
        document.getElementById("email").value = card.querySelectorAll("p")[2].textContent;
  
        document.getElementById("sidebar").classList.add("active");
      });
    });
  
    document.querySelector(".form button").addEventListener("click", async function () {
      const name = document.getElementById("name").value;
      const nickname = document.getElementById("nickname").value;
      const phone = document.getElementById("phone").value;
      const website = document.getElementById("web-site").value;
      const email = document.getElementById("email").value;
    
      if (currentEditingCard) {
        showSpinner();
    
        const userId = currentEditingCard.querySelector(".edit").dataset.id;
    
        const updatedUser = {
          id: userId,
          name,
          username: nickname,
          phone,
          website,
          email
        };
    
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
          });
    
          if (!response.ok) throw new Error("Помилка оновлення користувача");
    
          const data = await response.json();
     
          currentEditingCard.querySelector("h2").textContent = data.name;
          currentEditingCard.querySelector("h5").textContent = data.username;
          currentEditingCard.querySelectorAll("p")[0].textContent = data.phone;
          currentEditingCard.querySelectorAll("p")[1].textContent = data.website;
          currentEditingCard.querySelectorAll("p")[2].textContent = data.email;
    
        } catch (error) {
          console.error("Помилка оновлення користувача:", error);
          alert("Не вдалося оновити дані. Спробуйте пізніше.");
        } finally {
          hideSpinner();
          document.getElementById("sidebar").classList.remove("active");
        }
      }
    });
    
    
      
    document.querySelector("button[type='button']").addEventListener("click", function () {
      document.getElementById("sidebar").classList.remove("active");
    });
  }
   
    document.querySelectorAll(".edit").forEach(button => {
      button.addEventListener("click", () => {
        document.getElementById("sidebar").classList.add("active"); 
      });
    });
  
    document.querySelector("button[type='button']").addEventListener("click", function() {
      document.getElementById("sidebar").classList.remove("active");
    });
   
    async function deleteUsers(id) {
      showSpinner();
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`, 
          { method: 'DELETE' }
        );
    
        if (response.ok) {
          users = users.filter(user => user.id != id);
          const cardToDelete = document.querySelector(`.delete[data-id='${id}']`).closest(".card");
          if (cardToDelete) {
            cardToDelete.remove();
          }
          console.log(`Пользователь с id ${id} удалён`);
        }
      } catch (error) {
        console.error("Ошибка удаления пользователя:", error);
      } finally {
        hideSpinner();
      }
    }
    
 
    // Show / Hide Spinner
    function showSpinner() {
      document.getElementById("spinner").classList.remove("hidden");
    }
    
    function hideSpinner() {
      document.getElementById("spinner").classList.add("hidden");
    }
    
    

  fetchUsers();
  
  


 
