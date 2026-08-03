const { TaskScheduler } = require('./taskScheduler');

describe('TaskScheduler', () => {
  // TODO: Setup Fake Timers in beforeEach
  // Tip: jest.useFakeTimers()
  beforeEach(() => {
    jest.useFakeTimers();
  });
  // TODO: Cleanup in afterEach
  // Tip: jest.useRealTimers()
  afterEach(() => {
    jest.useRealTimers()
  });

  describe('schedule()', () => {
    test('executes task after correct delay', () => {
      // TODO: Test that a task executes after the correct delay
      //
      // Arrange:
      // - Create a TaskScheduler
      // - Create a mock function with jest.fn()
      // - Schedule the task with a delay (e.g. 5000ms)
      const taskScheduler = new TaskScheduler();
      const taskFn = jest.fn();
      // Act:
      // - Check that the task does NOT run immediately
      // - Fast-forward time with jest.advanceTimersByTime()
      taskScheduler.schedule('test', taskFn, 5000)
      // Assert:
      // - Before delay: Task was NOT called
      // - After delay: Task was called
      expect(taskFn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(4000);
      expect(taskFn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(taskFn).toHaveBeenCalledTimes(1);
    });
    test('tracking executed tasks', () => {
      // TODO: Additional test - Tracking executed tasks
      // Tip: Use scheduler.getExecutedTasks()
      const taskScheduler = new TaskScheduler();
      const taskFn = jest.fn();

      taskScheduler.schedule('test1', taskFn, 2000);
      jest.advanceTimersByTime(2000);

      expect(taskScheduler.getExecutedTasks()).toEqual(['test1'])
    });
  });

  describe('scheduleRecurring()', () => {
    test('task fires multiple times at correct interval', () => {
      // TODO: Test recurring tasks
      // Tip: Task should fire multiple times at the correct interval
      const taskScheduler = new TaskScheduler();
      const taskFn = jest.fn();

      taskScheduler.scheduleRecurring('test-loop', taskFn, 1500);
      expect(taskFn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1500);
      expect(taskFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      expect(taskFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(500);
      expect(taskFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('cancelAll()', () => {
    // TODO: Test that cancelAll() prevents tasks from executing
    test('prevents tasks from executing', () => {
      const taskScheduler = new TaskScheduler();
      const taskFn = jest.fn();

      taskScheduler.scheduleRecurring('test-loop', taskFn, 3000);
      taskScheduler.cancelAll();
      jest.advanceTimersByTime(8000);

      expect(taskFn).not.toHaveBeenCalled();
    })
  });

  describe('edgeCases', () => {
    test('zero delay', () => {
      const taskScheduler = new TaskScheduler();
      const taskFn = jest.fn();

      taskScheduler.schedule('zero-test', taskFn, 0);
      jest.advanceTimersByTime(0);
      expect(taskFn).toHaveBeenCalledTimes(1);
    })

    test('handles multiple tasks at same time', () => {
      /** Persönlicher Vermerk zur eigenen Dummheit, wenn man mit C & P vergisst die aufrufe jeweils zu bennen XD */
      const taskScheduler = new TaskScheduler();
      const callOne = jest.fn();
      const callTwo = jest.fn();
      const callThree = jest.fn();

      taskScheduler.schedule('callOne', callOne, 2000);
      taskScheduler.schedule('callTwo', callTwo, 2000);
      taskScheduler.schedule('callThree', callThree, 2000);
      
      jest.advanceTimersByTime(2000)
      expect(callOne).toHaveBeenCalledTimes(1)
      expect(callTwo).toHaveBeenCalledTimes(1)
      expect(callThree).toHaveBeenCalledTimes(1)
    })
  })
});
