<script lang="ts">
  import { Router, Link, Route } from "svelte-routing"
  import Home from './routes/Home/index.svelte'
  import Header from "./components/Header.svelte"
  export let url = ''
</script>

<Router {url}>
  <Header />
  <Route path="/">
    <Home />
  </Route>
</Router>