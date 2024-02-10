import { onMount, createSignal } from "solid-js";
import { supabase } from "../../utils/supabase";
export const PostButton = () => {
  const [sessionData, setSessionData] = createSignal({});
  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    setSessionData(data);
    console.log(data);
  });
  return (
    <>
      {sessionData().session && (
        <div class="fixed bottom-4 right-4">
            <a href="./new">
              <svg width="80" height="80">
                <circle r="30" cx="40" cy="40" class="stroke-5 stroke-white drop-shadow-xl" />
                <circle r="30" cx="40" cy="40" class="fill-blue-500" />
                <text x="40" y="40" text-anchor = "middle" dominant-baseline = "central" class="fill-white font-extrabold text-4xl">＋</text>
              </svg>
            </a>
        </div>
      )}
    </>
  );
};
