<script lang="ts">
  import { Router, Link, Route } from "svelte-routing"
  import Home from './routes/Home/index.svelte'
  import Header from "./components/Header.svelte"
  import NotFound from "./routes/404/index.svelte"
  export let url = ''
</script>

<Router {url}>
  <Header />
  <Route path="/">
    <Home />
  </Route>
  <Route path="*">
    <NotFound />
  </Route>
</Router>