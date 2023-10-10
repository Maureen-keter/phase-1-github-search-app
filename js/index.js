document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
      }
  
      try {
        // Clear previous search results
        userList.innerHTML = '';
        reposList.innerHTML = '';
  
        // Search for users using the GitHub User Search Endpoint
        const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
        const usersData = await usersResponse.json();
  
        if (usersData.items.length === 0) {
          alert('No users found.');
          return;
        }
  
        // Display user search results
        usersData.items.forEach((user) => {
          const userItem = document.createElement('li');
          userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          `;
          userList.appendChild(userItem);
  
          // Add click event listener to fetch and display repositories for this user
          userItem.addEventListener('click', async () => {
            const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
            const reposData = await reposResponse.json();
  
            // Clear previous user's repositories
            reposList.innerHTML = '';
  
            // Display repositories
            reposData.forEach((repo) => {
              const repoItem = document.createElement('li');
              repoItem.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              `;
              reposList.appendChild(repoItem);
            });
          });
        });
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  