import React, {useMemo} from 'react'
import {useService} from '@xstate/react'


const Subreddit = ({service}) => {


    const [current, send] = useService(service)
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
        data-machine={service.id}
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