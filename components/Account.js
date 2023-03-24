import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
export default function Account({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [club, setClub] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, club, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setClub(data.club)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, club, avatar_url }) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username,
                club,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className=' h-screen flex items-center '>
        <div className="form-widget mx-auto max-w-lg bg-slate-500 rounded-lg border-4 border-green-600 p-8 ">
  <h2 className="text-white text-2xl font-bold mb-8">Update<span className='text-green-500'> Profile</span></h2>
  <div className="mb-6">
    <label htmlFor="username" className="text-green-500 block mb-2 font-bold">Username:</label>
    <input
      id="username"
      type="text"
      value={username || ''}
      className="bg-white rounded px-3 py-2 w-full"
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="mb-6">
    <label htmlFor="club" className="text-green-500 inline-block mb-2 font-bold">Favorite Club:</label>
    {!club && 
      <select 
        id="club" 
        name="club" 
        className="bg-white rounded px-3 py-2 w-full"
        onChange={(e) => setClub(e.target.value)}
      >
        <option value="">Choose a club</option>
        <option value="ManCity">Manchester City</option>
        <option value="ManUtd">Manchester United</option>
        <option value="RealMadrid">Real Madrid</option>
        <option value="Barcelona">F.C Barcelona</option>
        <option value="Chelsea">Chelsea</option>
        <option value="Arsenal">Arsenal</option>
        <option value="PSG">Paris Saint Germain</option>
        <option value="Tottenham">Tottenham</option>
        <option value="Liverpool">Liverpool</option>
      </select>
    }
    {club && 
      <span className="text-white mx-3">{club}</span>
    }
  </div>

  <div className="flex justify-center">
    <button
      className="button primary bg-green-500 text-black px-6 py-2 rounded-xl mr-4"
      onClick={() => updateProfile({ username, club, avatar_url })}
      disabled={loading}
    >
      {loading ? 'Loading ...' : 'Update'}
    </button>
    <button className="button bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-green-600" onClick={() => supabase.auth.signOut()}>
      Sign Out
    </button>
  </div>
</div>
</div>
    )
}