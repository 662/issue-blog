const fetch = require('node-fetch');

const query = `
query { 
  viewer { 
    login
  }
}
`;
const body = {
  query: query,
  variables: {}
};

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization:'130482109cc3ee8471e5f06eeb20abfd5786bde4',
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(body)
})
  // .then(r => r.json())
  .then(r => console.log(r));
