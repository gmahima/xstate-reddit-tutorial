import {Machine, assign, spawn} from 'xstate'
import { resolveActions } from 'xstate/lib/actions'
import createSubredditMachine from '../machines/subredditMachine'

export const redditMachine = Machine({
    id: 'reddit',
    initial: 'idle',
    context: {
        subreddit: null,
        subreddits: {}
    },
    states: {
        idle: {

        },
        selected: {

        }
    },
    on: {
        SELECT: {
            target: '.selected',
            // try without . (internal transition)
            actions: assign((context, event) => {
                // subreddit: (context, event)  => event.name
                let subreddit = context.subreddits[event.name]
                if(subreddit) {
                    // try returning without context
                    // returning just subr dosehnt make a diff
                    return {
                        ...context,
                        subreddit
                    }
                }
                subreddit = spawn(createSubredditMachine(event.name))
                return {
                    subreddits: {
                        ...context.subreddits,
                        [event.name]: subreddit
                    },
                    subreddit
                }
            })
        }
    }
})