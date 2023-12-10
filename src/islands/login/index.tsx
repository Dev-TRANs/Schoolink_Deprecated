import { supabase } from "../../utils/supabase";
import { createSignal, onMount } from "solid-js";

export const Login = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email(),
      password: password(),
    });
    console.log(data, error);
  };
  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      location.href = "/";
    }
  });
  return (
    <div>
      <div class="text-center">
        <div class="text-2xl">Login</div>
        <div class="grid gap-2 grid-rows-2 md:grid-cols-2 justify-center mx-3">
          <div class="w-full">
            <input
              type="email"
              class="border p-1 rounded-md w-full"
              placeholder="Email Address"
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="w-full">
            <input
              type="password"
              class="border p-1 rounded-md w-full"
              placeholder="Password"
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              class="m-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white p-2"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
