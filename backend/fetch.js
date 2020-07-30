const fetch = require("node-fetch");

fetch("http://localhost:3000/customer/name/Zixuan", {
  method: "get",
  //   body: JSON.stringify(
  //     (body = {
  //       name: "dixant",
  //       email: "mittal",
  //     })
  //   ),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((json) => console.log(json));
