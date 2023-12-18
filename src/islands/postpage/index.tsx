import { createSignal, onMount } from "solid-js"
import { supabase } from "@/utils/supabase"
import type { Session } from "@supabase/supabase-js"

export const PostPage = (props: {
  id: number
}) => {
  const [post, setPost] = createSignal<{
    title: string
    text: string
    user_id: string
  }>()
  const [session, setSession] = createSignal<Session | null>()
  const [answers, setAnswers] = createSignal([])
  const [user, setUser] = createSignal<{
    name: string
    school: string
  }>()
  onMount(async () => {
    const res = await supabase.from('posts').select('*').eq('id', props.id)

    if (res.error) {
      return alert('存在しなかった！')
    }
    setPost(res.data[0])
    
    const actRes = await supabase.from('Users').select('*').eq('account_id', post().user_id)
    if (actRes.error || actRes.data.length !== 1) {
      alert('エラーが発生しました')
      location.href = '/'
      return
    }
    setUser(actRes.data[0])
    const session = await supabase.auth.getSession()
    setSession(session.data.session || null)

    const answersResp  = await supabase.from('answers').select('*').eq('target_id', props.id)
    if (answersResp.error) {
      alert('取得に失敗...')
      return
    }
    const answers = []
    for (const answer of answersResp.data as {
      body: string
      contact: string
      created_user: string
    }[]) {
      const userDataRes = await supabase.from('Users').select('*').eq('account_id', answer.created_user)
      if (userDataRes.error || userDataRes.data.length !== 1) {
        continue
      }
      const user = userDataRes.data[0] as {
        name: string
        school: string
      }
      answers.push({
        user,
        body: answer.body,
        contact: answer.contact
      })
    }
    setAnswers(answers)
  })
  const [answerBody, setAnswerBody] = createSignal('')
  const [answerTarget, setAswerTarget] = createSignal('')

  return <div class="mx-5">
    {
      (() => {
        const postData = post()
        if (!postData) {
          return <div>Loding...</div>
        }
        return <div >
          <div class="text-2xl">{ postData.title }</div>
          <hr />
          <div class="">{ postData.text }</div>
          <div class="text-right">
            <span class="text-xl">By {user()?.name}</span>
            <span>@{user()?.school}</span>
          </div>
        </div>
      })()
    }
    {
      (() => {
        const sessionData = session()
        if (!sessionData) {
          return <div>この依頼に回答するにはログインしてください</div>
        }
        const submitAnswer = async () => {
          if (answerBody().length < 50) {
            alert('本文は50文字以上でお願いします')
            return
          }  
          if (answerTarget().length === 0) {
            alert("連絡先を空にはできません")
            return
          }
          if (!confirm('送信しますか?')) {
            return
          }
          const res = await supabase.from('answers').insert([
            {
              body: answerBody(),
              contact: answerTarget(),
              target_id: props.id
            }
          ])
          location.reload()
        }
        return <div class="bg-slate-100 p-2 rounded-lg">
          <div>
            <div class="text-lg">質問に回答する</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
            <textarea class="border p-1" onInput={e => setAnswerBody(e.target.value)} placeholder="PRを入力....\nこんなことができるよ！こうすればいいんじゃない！等"></textarea>
            <textarea class="border p-1" onInput={e => setAswerTarget(e.target.value)} placeholder="連絡先一覧\nTwitter: @aaa, Discord: @aaa#1234"/>
          </div>
          <button class="p-2 rounded bg-blue-200" onClick={submitAnswer}>回答！</button>
        </div>
      })()
    }
    <div>
      <div class="text-xl">解答/提案集</div>
      <div>
        <For each={answers()}>{answer => (<div class="border p-2 rounded-lg">
          <div class="">
            <span class="text-2xl">{answer.user.name}</span>
            <span> @</span>
            <span class="text-base">{answer.user.school}</span>
          </div>
          <div>
            { answer.body }
          </div>
          <div>
            <div class="font-bold">連絡先:</div>
            <div>{answer.contact}</div>
          </div>
        </div>)}</For>
      </div>
    </div>
  </div>
}