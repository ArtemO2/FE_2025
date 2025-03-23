 
// Вот эта часть работает до того момента пока не подключаем данные с сервера

// document.querySelector(".delete").addEventListener("click", function() {
//     document.querySelector(".card").remove();
//   });

//   document.querySelector(".edit").addEventListener("click", function() {
//     document.getElementById("sidebar").classList.toggle("active");
//   });  

//   document.querySelector("button[type='button']").addEventListener("click", function() {
//     let sidebar = document.getElementById("sidebar");
//     sidebar.classList.remove("active");
//   });

//   document.querySelector(".delete").addEventListener("click", function() {
//     document.getElementById("sidebar").classList.remove("active");
//   });
 





  async function fetchUsers() {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let users = await response.json();
      renderUsers(users);
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error);
    }
  }
  
  function renderUsers(users) {
    let section = document.querySelector(".card-section");
    section.innerHTML = "";  
  
    users.forEach(user => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="buttons">
          <button class="edit" data-id="${user.id}">EDIT</button>
          <button class="delete" data-id="${user.id}">DELETE</button>
        </div>
        <div class="card-body">
          <h2 class="card-title">${user.name}</h2>
          <h5 class="card-title__paragraph">${user.username}</h5>
          <ul>
            <li><div><h6>phone</h6><p>${user.phone}</p></div></li>
            <li><div><h6>website</h6><p>${user.website}</p></div></li>
            <li><div><h6>email</h6><p>${user.email}</p></div></li>
          </ul>
        </div>
      `;
      section.appendChild(card);
    });
  
    attachEventListeners();
  }
  
  function attachEventListeners() {
    document.querySelectorAll(".delete").forEach(button => {
      button.addEventListener("click", function () {
        this.closest(".card").remove();
      });
    }); 
  }
  
  fetchUsers();
  
 




 