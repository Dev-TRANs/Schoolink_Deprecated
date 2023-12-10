import { onMount, createSignal } from "solid-js";
import { supabase } from "../../utils/supabase";
export const Header = () => {
  const [sessionData, setSessionData] = createSignal({});
  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    setSessionData(data);
    console.log(data);
  });
  return (
    <div class="flex items-center justify-between px-2 py-3">
      <div class="font-bold font-mono text-xl">Schoolink</div>
      <div>
        {!sessionData().session ? (
          <a href="/login" class="p-2 rounded bg-blue-500 text-white font-bold">
            Login
          </a>
        ) : (
          <a
            href="/profile"
            class="p-2 rounded bg-blue-500 text-white font-bold"
          >
            Profile
          </a>
        )}
      </div>
    </div>
  );
};
