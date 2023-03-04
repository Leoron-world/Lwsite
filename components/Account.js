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
        <div className="form-widget text-white mx-48 px-4 bg-slate-500 py-24 flex justify-center flex-col place-content-center items-center rounded-lg border-4 border-green-600">
          
            <div>
                <label htmlFor="username" className='pr-12'>Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    className='text-green-800 mt-4'
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="club" className='pr-24'>Club:</label>
               {!club &&  <select id="club" name="club" className='text-green-800 mt-4' placeholder='Choose Favourite Club' onChange={(e) => setClub(e.target.value)}>
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
                </select>}
                {club && <span>{club}</span>}
               
            </div>
          
            <div>
                <button
                    className="button primary block bg-green-500 px-3 text-black py-1 mt-4 rounded-xl "
                    onClick={() => updateProfile({ username, club, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button className="button block mt-4" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}