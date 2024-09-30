module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Dịch các file .js và .jsx bằng babel-jest
      '^.+\\.mjs$': 'babel-jest',  // Dịch các file .mjs bằng babel-jest
    },
    moduleFileExtensions: ['js', 'jsx', 'mjs', 'json', 'node'],
  };