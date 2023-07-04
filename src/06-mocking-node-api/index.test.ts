import path from 'path';
import { readFile } from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const func = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(func, 1000);
    expect(setTimeout).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback only after timeout', () => {
    const func = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(func, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const func = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(func, 1000);
    expect(setInterval).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const func = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(func, 1000);
    expect(func).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000 * 3);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = jest.spyOn(path, 'join');
    await readFileAsynchronously('index.ts');
    expect(filePath).toHaveBeenCalledWith(__dirname, 'index.ts');
  });

  test('should return null if file does not exist', async () => {
    const file = await readFileAsynchronously('helloWorld.txt');
    file ? expect(file).toBeTruthy() : expect(file).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const filePath = path.join(__dirname, 'index.ts');
    const text = String(await readFile(filePath));
    const funcText = await readFileAsynchronously('index.ts');
    expect(funcText).toEqual(text);
  });
});
