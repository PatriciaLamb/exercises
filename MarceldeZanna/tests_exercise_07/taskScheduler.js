class TaskScheduler {
  constructor() {
    this.tasks = [];
    this.executedTasks = [];
  }

  // Add task with delay in milliseconds
  schedule(name, fn, delayMs) {
    const task = {
      name,
      fn,
      delayMs,
      timerId: setTimeout(() => {
        this.executedTasks.push(name);
        fn();
      }, delayMs)
    };
    this.tasks.push(task);
  }

  // Recurring task with interval
  scheduleRecurring(name, fn, intervalMs) {
    const task = {
      name,
      fn,
      intervalMs,
      timerId: setInterval(() => {
        this.executedTasks.push(name);
        fn();
      }, intervalMs)
    };
    this.tasks.push(task);
  }

  // Cancel all tasks
  cancelAll() {
    this.tasks.forEach(task => {
      if (task.timerId) {
        if (task.intervalMs) {
          clearInterval(task.timerId);
        } else {
          clearTimeout(task.timerId);
        }
      }
    });
    this.tasks = [];
  }

  // Query status
  getExecutedTasks() {
    return this.executedTasks;
  }
}

module.exports = { TaskScheduler };
