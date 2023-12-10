import { createSignal, onMount } from "solid-js"
import { supabase } from "../../utils/supabase"

export const PostPage = (props: {
    id: number
}) => {
    const [post, setPost] = createSignal<{
        title: string
        text: string
        user_id: string
    }>()
    onMount(async () => {
        const res = await supabase.from('posts').select('*').eq('id', props.id)

        if (res.error) {
            return alert('存在しなかった！')
        }
        setPost(res.data[0])
    })
    return <div class="mx-5">
        {
            (() => {
                const postData = post()
                if (!postData) {
                    return <div>Loding...</div>
                }
                return <div>
                    <div class="text-2xl">{ postData.title }</div>
                    <div class="">{ postData.text }</div>
                </div>
            })()
        }
    </div>
}