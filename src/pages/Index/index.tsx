import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import md from '../../../README.md'

export default function IndexPage() {
  return <ReactMarkdown children={md}></ReactMarkdown>
}
