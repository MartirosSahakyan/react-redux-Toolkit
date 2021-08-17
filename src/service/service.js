export const fetchTodos = () => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/1`)
        .then((res) => res.json())
   
  };
  