import Head from 'next/head'
import tw from 'twin.macro'
import styled from 'styled-components'
import {AppContainer} from '../styles/container'
import { useMachine } from '@xstate/react';
import {redditMachine} from '../machines/redditMachine'

const subreddits = ['frontend', 'reactjs', 'vuejs'];

export default function Home() {
  const [current, send] = useMachine(redditMachine)
  const {subreddit, posts} = current.context

  return (
    <AppContainer>
      <select onChange = {(e) => {send('SELECT', {name: e.target.value})}} >
        {subreddits.map(subreddit => {
              return <option key={subreddit}>{subreddit}</option>;
            })}
      </select>
      <div>
      <h1>{current.matches('idle') ? 'Select a subreddit' : subreddit}</h1>
        {current.matches({ selected: 'loading' }) && <div>Loading...</div>}
        {current.matches({ selected: 'loaded' }) && (
          <ul>
            {posts.map(post => (
              <li key={post.title}>{post.title}</li>
            ))}
          </ul>
        )}
      </div>
    </AppContainer>
  )
}
