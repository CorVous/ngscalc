let localStorageMock = {}

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    localStorageMock[key] = value
  })
  global.Storage.prototype.getItem = jest.fn((key) => localStorageMock[key])
})

beforeEach(() => {
  // make sure the storage starts out empty for each test
  localStorageMock = {}
})

afterAll(() => {
  // return our mocks to their original values
  // 🚨 THIS IS VERY IMPORTANT to avoid polluting future tests!
  global.Storage.prototype.setItem.mockReset()
  global.Storage.prototype.getItem.mockReset()
})
