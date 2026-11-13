const menuButton = document.querySelector('.menu-toggle')
const primaryNav = document.querySelector('#primary-nav')

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
    menuButton.setAttribute('aria-expanded', String(!isOpen))
    menuButton.querySelector('.sr-only').textContent = isOpen ? 'Open navigation' : 'Close navigation'
    primaryNav.classList.toggle('is-open', !isOpen)
  })

  document.addEventListener('click', event => {
    if (!primaryNav.contains(event.target) && !menuButton.contains(event.target)) {
      menuButton.setAttribute('aria-expanded', 'false')
      menuButton.querySelector('.sr-only').textContent = 'Open navigation'
      primaryNav.classList.remove('is-open')
    }
  })
}

const taskForm = document.querySelector('#task-form')

if (taskForm) {
  const taskList = document.querySelector('#task-list')
  const taskTitle = document.querySelector('#task-title')
  const taskDate = document.querySelector('#task-date')
  const taskError = document.querySelector('#task-error')
  const taskCount = document.querySelector('#task-count')
  const emptyState = document.querySelector('#planner-empty')
  const clearCompletedButton = document.querySelector('#clear-completed')
  const storageNote = document.querySelector('.storage-note')
  const storageKey = 'ubong-miva-academic-tasks-v1'

  function loadTasks() {
    try {
      const savedTasks = JSON.parse(localStorage.getItem(storageKey) || '[]')
      if (!Array.isArray(savedTasks)) return []
      return savedTasks.filter(task =>
        task && typeof task.id === 'string' && typeof task.title === 'string' &&
        typeof task.completed === 'boolean' && typeof task.dueDate === 'string'
      )
    } catch {
      return []
    }
  }

  let tasks = loadTasks()

  function saveTasks() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks))
      storageNote.classList.remove('is-error')
      storageNote.lastChild.textContent = ' Saved in this browser only. Your tasks aren’t sent to a server.'
    } catch {
      storageNote.classList.add('is-error')
      storageNote.lastChild.textContent = ' Your browser could not save this list. Keep this tab open while you work.'
    }
  }

  function formatDueDate(value) {
    if (!value) return ''
    const date = new Date(`${value}T12:00:00`)
    if (Number.isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
  }

  function renderTasks() {
    taskList.replaceChildren()
    const openCount = tasks.filter(task => !task.completed).length
    taskCount.textContent = `${openCount} ${openCount === 1 ? 'task' : 'tasks'} left`
    emptyState.hidden = tasks.length > 0
    clearCompletedButton.hidden = !tasks.some(task => task.completed)

    tasks.forEach(task => {
      const item = document.createElement('li')
      item.className = `task-item${task.completed ? ' is-complete' : ''}`

      const checkbox = document.createElement('input')
      checkbox.className = 'task-check'
      checkbox.type = 'checkbox'
      checkbox.checked = task.completed
      checkbox.dataset.taskId = task.id
      checkbox.setAttribute('aria-label', `${task.completed ? 'Mark as not complete' : 'Mark as complete'}: ${task.title}`)

      const content = document.createElement('span')
      content.className = 'task-content'
      const title = document.createElement('span')
      title.className = 'task-title'
      title.textContent = task.title
      content.append(title)
      const dueDate = formatDueDate(task.dueDate)
      if (dueDate) {
        const date = document.createElement('time')
        date.className = 'task-date'
        date.dateTime = task.dueDate
        date.textContent = `Due ${dueDate}`
        content.append(date)
      }

      const deleteButton = document.createElement('button')
      deleteButton.className = 'delete-task'
      deleteButton.type = 'button'
      deleteButton.dataset.deleteTask = task.id
      deleteButton.setAttribute('aria-label', `Delete task: ${task.title}`)
      deleteButton.textContent = '×'

      item.append(checkbox, content, deleteButton)
      taskList.append(item)
    })
  }

  taskForm.addEventListener('submit', event => {
    event.preventDefault()
    const title = taskTitle.value.trim()
    if (!title) {
      taskError.textContent = 'Add a task description before saving.'
      taskError.hidden = false
      taskTitle.setAttribute('aria-invalid', 'true')
      taskTitle.focus()
      return
    }
    taskError.hidden = true
    taskTitle.removeAttribute('aria-invalid')
    const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
    tasks.unshift({ id, title, dueDate: taskDate.value, completed: false })
    saveTasks()
    renderTasks()
    taskForm.reset()
    taskTitle.focus()
  })

  taskTitle.addEventListener('input', () => {
    if (taskTitle.value.trim()) {
      taskError.hidden = true
      taskTitle.removeAttribute('aria-invalid')
    }
  })

  taskList.addEventListener('change', event => {
    const checkbox = event.target.closest('[data-task-id]')
    if (!checkbox) return
    const task = tasks.find(item => item.id === checkbox.dataset.taskId)
    if (!task) return
    task.completed = checkbox.checked
    saveTasks()
    renderTasks()
  })

  taskList.addEventListener('click', event => {
    const button = event.target.closest('[data-delete-task]')
    if (!button) return
    tasks = tasks.filter(task => task.id !== button.dataset.deleteTask)
    saveTasks()
    renderTasks()
  })

  clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed)
    saveTasks()
    renderTasks()
  })

  renderTasks()
}

const contactForm = document.querySelector('#contact-form')

if (contactForm) {
  const fields = {
    name: { input: document.querySelector('#contact-name'), error: document.querySelector('#name-error') },
    email: { input: document.querySelector('#contact-email'), error: document.querySelector('#email-error') },
    phone: { input: document.querySelector('#contact-phone'), error: document.querySelector('#phone-error') },
    message: { input: document.querySelector('#contact-message'), error: document.querySelector('#message-error') }
  }
  const formStatus = document.querySelector('#form-status')

  function validateField(key) {
    const { input, error } = fields[key]
    const value = input.value.trim()
    let message = ''
    if (!value) message = 'Please fill in this field.'
    else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid email address, such as name@example.com.'
    else if (key === 'phone' && !/^\d+$/.test(value)) message = 'Use digits only, including your country code.'
    error.textContent = message
    error.hidden = !message
    input.setAttribute('aria-invalid', String(Boolean(message)))
    return !message
  }

  Object.entries(fields).forEach(([key, field]) => {
    field.input.addEventListener('blur', () => validateField(key))
    field.input.addEventListener('input', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') validateField(key)
    })
  })

  contactForm.addEventListener('submit', event => {
    event.preventDefault()
    const isValid = Object.keys(fields).map(validateField).every(Boolean)
    if (!isValid) {
      formStatus.textContent = 'Please correct the highlighted fields.'
      Object.values(fields).find(field => field.input.getAttribute('aria-invalid') === 'true')?.input.focus()
      return
    }

    const name = fields.name.input.value.trim()
    const email = fields.email.input.value.trim()
    const phone = fields.phone.input.value.trim()
    const message = fields.message.input.value.trim()
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`)
    formStatus.textContent = 'Your email app should open with the message ready. Press send there to deliver it.'
    window.location.href = `mailto:u.itok0122@miva.edu.ng?subject=${subject}&body=${body}`
  })
}
