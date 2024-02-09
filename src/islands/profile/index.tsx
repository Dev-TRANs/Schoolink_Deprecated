import { createSignal, onMount } from "solid-js";
import { supabase } from "@/utils/supabase";

export const Profile = () => {
  const [userData, setUserData] = createSignal<{
    name: string
    school: string
  }>()
  const logout = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log(data, error); 
    location.href = "/";
  };
  onMount(async () => {
    const session = await supabase.auth.getSession()
    if (session.error || (!session.data)) {
      throw session.error
    }
    if (!session.data.session ) {
      location.href  = '/login'
      return
    }
    
    const userDataResult = await supabase.from("Users").select("*").eq("account_id", session.data.session.user.id)
    if (userDataResult.error) {
      throw userDataResult.error
    }
    setUserData(userDataResult.data[0])
  });
  return <div>
    <div>
      <div>あなたの情報:</div>
      <div>
        <div>
          { userData()?.name }
        </div>
        <div>
          { userData()?.school }
        </div>
      </div>
    </div>
    <div>
      <a href="/new" class="p-2 rounded-lg bg-blue-200">依頼を作成する</a>
    </div>
    <div>
      <button
        class="m-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white p-2"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>;
};
