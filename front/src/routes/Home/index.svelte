<script lang="ts">
  import { Link } from "svelte-routing";
  import SchoolinkImage from "../../assets/schoolink.svg"
</script>

<div>
  <div class="mx-5">
    <div class="h-screen grid grid-rows-1 md:grid-cols-2 justify-center items-center"> 
      <div class="text-4xl font-bold leading-relaxed md:text-left text-center">
        学校と学校を繋ぐ<br>
        プラットフォーム<br>
        <span class="hidden md:inline">Schoolink</span>
        <span class="inline md:hidden">
          <img src={SchoolinkImage} class="w-30 object-cover"/>
        </span>
      </div>
      <div class="hidden md:flex justify-center items-center h-full">
        <div>
          <img src={SchoolinkImage} class="w-screen object-cover"/>
        </div>
      </div>
    </div>
    <div>
      <div class="text-2xl mb-4">さあ、始めよう!</div>
      <Link to="/register" class="p-3 border m-4 rounded-lg bg-emerald-500 drop-shadow-lg hover:drop-shadow-sm hover:bg-emerald-400 text-white">登録する</Link>
    </div>
  </div>
</div>
