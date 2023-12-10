import { createSignal, onMount } from "solid-js"
import { supabase } from "../../utils/supabase"

export const Posts = () => {
    const [posts, setPosts] = createSignal<{
        title: string
        description: string
        id: number
    }[]>([])

    onMount(async () => {
        const posts = await supabase.from('posts').select('*')
        // @ts-ignore
        setPosts(posts.data || [])
    })
    return <div>
        <div class='px-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
                posts().map(post => {
                    console.log(post)
                    return <div class='border rounded-md p-2'>
                        <div class='text-lg font-bold'>{ post.title }</div>
                        <div class="text-slate-600 text-sm pl-2">from { post.school }</div>
                        <hr class="my-1"/>
                        <div class="text-slate-600 text-sm pl-2">{ post.text.slice(0, 42) }...</div>
                        <div class="underline hover:no-underline text-right px-3">
                          <a href={`/posts/${post.id}`}>Show More →</a>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}