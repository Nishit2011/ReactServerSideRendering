import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import proxy from "express-http-proxy";

const app = express();

//setting up initial proxy
app.use(
  "/api",
  proxy("http://react-ssr-api.heroku.com", {
    proxyReqOptDecorator(opts) {
      opts.header["x-forwarded-host"] = "localhost:3000";
      return opts;
    }
  })
);

//the public folder is made public by giving it to the express server
app.use(express.static("public"));

// the star * tells the express to handle any route
//so any route will then be forwarded to SSR which needs to track
//the component to be rendered based on the route in the url as SSR doesnt have browser
//and deals with server/ backend, unlike client side
app.get("*", (req, res) => {
  //we use the matchRoutes method on react-router-config
  //to check the routes and subsequently load the component associated with it
  //we pass two args to matchRoutes, one is the entire Routes array and the other is
  //the path that we tak out from request object
  //Once thats done, we pass the store to a method associated with loadData component
  //this method will be responsible to loadData and then let the component to render
  //hence we will pass store to it and manually  dispatch action creator from inside the
  //component. Once the returned promise is resolved, component will be rendered.
  const store = createStore();
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  console.log(promises);
  Promise.all(promises).then(() => {
    //once the promise is resolved the component is rendered
    res.send(renderer(req, store));
  });
});

app.listen(5200, () => {
  console.log("Listening to port 5200");
});
