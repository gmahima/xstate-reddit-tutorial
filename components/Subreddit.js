import React, {useMemo} from 'react'
import {useMachine} from '@xstate/react'
import createSubredditMachine from '../machines/subredditMachine'

const Subreddit = ({name}) => {
    const subredditMachine = useMemo(() => {
        return createSubredditMachine(name)
    }, [name])

    const [current, send] = useMachine(subredditMachine)
    if(current.matches('failure')) {
        return (
            <div>
                failed to load posts.
                <button onClick={() => send('RETRY')}>Retry</button>
            </div>
        )
    }
    const {subreditt, posts, lastUpdated} = current.context
    return (
        <section
        data-machine={subredditMachine.id}
        data-state= {current.toStrings().join(' ')}
        >
            {
                current.matches('loading') && <div>Loading posts...</div>
            }
            {
                posts && (
                    <>
                        <ul>
                            {posts.map(post => (
                            <li key={post.title}>{post.title}</li>
                            ))}
                        </ul>
                    </>
                )
            }
        </section>
    )
}
export default Subreddit