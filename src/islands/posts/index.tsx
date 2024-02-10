import { createSignal, onMount } from "solid-js"
import { supabase } from "@/utils/supabase"

export const Posts = (props: {
  n: number
}) => {
  const [posts, setPosts] = createSignal<{
    title: string
    description: string
    id: number
  }[]>([])

  onMount(async () => {
    const posts = await supabase.from('posts').select('*').order('id', { ascending: false }).limit(props.n)

    if (posts.error ) {
      alert('Error')
      return
    }
    const newPosts = []
    for (const post of posts.data) {
      const actRes = await supabase.from('Users').select('*').eq('account_id', post.user_id)
      if (actRes.error || actRes.data.length !== 1) {
        continue
      }
      newPosts.push({
        user: actRes.data[0],
        title: post.title,
        text: post.text,
        id: post.id
      })
    }
    // @ts-ignore
    setPosts(newPosts || [])
  })
  return <div>
    <div class='px-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {
        posts().map(post => {
          return <a href={`/posts/${post.id}`}>
            <div class='border rounded-md p-2'>
              <div class='text-lg font-bold'>{ post.title }</div>
              <div class="text-slate-600 text-sm pl-2">by <span class="font-bold">{post.user.name}</span> @{ post.user.school }</div>
              <hr class="my-1"/>
              <div class="text-slate-600 text-sm pl-2">{ post.text.slice(0, 42) }...</div>
            </div>
          </a>
        })
      }
    </div>
  </div>
}