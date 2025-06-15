     let tasks = [];

    function formatDateTime(date) {
      return date.toLocaleString();
    }

    function addTask() {
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      if (!title || !description) {
        alert("Please fill out all fields");
        return;
      }

      const task = {
        id: Date.now(),
        title,
        description,
        completed: false,
        createdAt: new Date(),
        completedAt: null
      };

      tasks.push(task);
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      renderTasks();
    }

    function renderTasks() {
      const pendingContainer = document.getElementById("pendingTasks");
      const completedContainer = document.getElementById("completedTasks");
      pendingContainer.innerHTML = "";
      completedContainer.innerHTML = "";

      tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
          <div>
            <p><strong>${task.title}</strong> - ${task.description}</p>
            <div class="timestamp">${task.completed ? "Completed" : "Created"}: ${formatDateTime(task.completed ? task.completedAt : task.createdAt)}</div>
          </div>
          <div class="actions">
            ${!task.completed ? `<button class="done" onclick="markComplete(${task.id})">✔</button>` : ""}
            <button class="edit" onclick="editTask(${task.id})">✎</button>
            <button class="delete" onclick="deleteTask(${task.id})">✖</button>
          </div>
        `;

        if (task.completed) {
          completedContainer.appendChild(taskDiv);
        } else {
          pendingContainer.appendChild(taskDiv);
        }
      });
    }

    function markComplete(id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = true;
        task.completedAt = new Date();
      }
      renderTasks();
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    }

    function editTask(id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const newTitle = prompt("Edit Title:", task.title);
        const newDesc = prompt("Edit Description:", task.description);
        if (newTitle && newDesc) {
          task.title = newTitle;
          task.description = newDesc;
        }
        renderTasks();
      }
    }

    renderTasks();


