import Head from 'next/head'
import tw from 'twin.macro'
import styled from 'styled-components'
import {AppContainer} from '../styles/container'
import { useMachine } from '@xstate/react';
import {redditMachine} from '../machines/redditMachine'
import Subreddit from '../components/Subreddit'
const subreddits = ['frontend', 'reactjs', 'vuejs'];

export default function Home() {
  const [current, send] = useMachine(redditMachine)
  const {subreddit} = current.context
  console.log(subreddit)
  return (
    <AppContainer>
      <select onChange = {(e) => {send('SELECT', {name: e.target.value})}} >
        {subreddits.map(subreddit => {
              return <option key={subreddit}>{subreddit}</option>;
            })}
      </select>
      <div>
          {
            subreddit && <Subreddit service={subreddit} key={subreddit.id}/>
          }

      </div>
    </AppContainer>
  )
}



