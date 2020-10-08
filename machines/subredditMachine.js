const { Machine, assign } = require("xstate")

const invokeFetchSubreddit = (context) => {
    const {subreddit} = context
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => json.data.children.map(child => child.data))
}

const createSubredditMachine = (subreddit) => {
    return Machine({
        id: 'subreddit',
        initial: 'loading',
        context: {
            subreddit: subreddit,
            posts: null,
            lastUpdated: null
        },
        states: {
            loading: {
                invoke: {
                    id: 'fetch-subreddit',
                    src: invokeFetchSubreddit,
                    onDone: {
                        target: 'loaded',
                        actions: assign({
                            posts: (context, event) => {return event.data},
                            lastUpdated: () => Date.now()
                        })
                    },
                    onError: {
                        target: 'failure'
                    }
                }
            },
            loaded: {
                on: {
                    REFRESH: 'loading'
                }
            },
            failure: {
                on: {
                    RETRY: 'loading'
                }
            }
        }
    })
}

export default createSubredditMachine