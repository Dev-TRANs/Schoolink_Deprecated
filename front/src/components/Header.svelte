<script lang="ts">
  import { Link } from "svelte-routing";
  import schoolinkImage from "../assets/schoolink.svg"
</script>
<header class="fixed top-0 w-full px-5">
  <div class="flex justify-between items-center">
    <img src={schoolinkImage} class="h-10" />
    <div>
      <Link to="/" class="text-base">ホーム</Link>
    </div>
    <div>
      <Link to="/" class="text-base">プロフィール</Link>
    </div>
  </div>
  
</header>