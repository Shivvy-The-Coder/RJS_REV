// import express from "express";

// const port = 3000;
// const app = express();

// // Welcome route
// app.get("/", (req, res) => {
//   res.send("Welcome to our API!");
// });



// function renderProducts(getProducts)
// {
//   return getProducts.map((single)=>{
//       `<p>${single.title}</p>`
//   }).join(" ")
// }


// app.get('/products', async (req,res)=>{
// async function fetchListOfParameters() 
// {
//   try
//   {
//     const apiresponse = await fetch ('https://dummyjson.com/products',{
//       method:'GET'
//     })
//     const result = await apiresponse.json()
//     console.log(result)

//     if(result?.products?.length > 0)
//       {
//         const html = renderProducts(result.products);
//         res.send(html);
//       }
//     else
//     {
//       res.send("No products found.");
//     }
//   } 
//   catch (e)
//   {
//     console.error(e);
//     res.status(500).send("Error fetching products.");
//   } 
// }
// fetchListOfParameters()
// })


// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });
import express from "express";
// If using Node < 18, uncomment this:
// import fetch from "node-fetch";

const port = 3000;
const app = express();

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to our API!");
});

function renderProducts(getProducts) {
  return getProducts.map((single) => `<p>${single.title}</p>`).join("");
}

app.get("/products", async (req, res) => {
  try {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result?.products?.length > 0) {
      const html = renderProducts(result.products);
      res.send(html);
    } else {
      res.send("No products found.");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching products.");
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
