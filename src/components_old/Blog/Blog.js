import React, { Component } from 'react'
import './Blog.scss'
import Title from '../Title/Title'
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup } from 'velocity-react'

const blogUrl = 'https://medium.com/feed/@patrickclover'
const webBlog = 'https://blackbx.io/blog/feed/'

class Blog extends Component {
  enterAnimation = {
    animation: 'transition.perspectiveDownIn',
    stagger: 200,
    delay: 4500,
    backwards: false,
    opacity: 1,
    display: 'block',
    style: {
      // Since we're staggering, we want to keep the display at "none" until Velocity runs
      // the display attribute at the start of the animation.
      display: 'none',
      opacity: 0
    }
  }

  leaveAnimation = {
    animation: 'transition.perspectiveRightOut',
    delay: 0,
    stagger: this.enterAnimation.stagger * 3,
    backwards: true
  }

  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    //this.getPosts(blogUrl)
    this.getPosts(webBlog)
  }

  getPosts(uri) {
    const url = new URL('https://api.rss2json.com/v1/api.json')
    url.searchParams.append('rss_url', uri)
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.status !== 'ok') return
        return this.setState({ posts: response.items })
      })
      .catch(error => console.log(error))
  }

  formatDate(date) {
    date = date.replace(/\s/, 'T')
    if (!date) return
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') return

    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(d)
  }

  render() {
    const items = this.state.posts
    return (
      <div className="blog hidden-sm">
        <Title heading="On the line" />
        <VelocityTransitionGroup
          component="div"
          className="__items"
          runOnMount={true}
          enter={this.enterAnimation}
        >
          {items.map((item, k) => (
            <div key={k} className="__item">
              <h2>
                <a target="_blank" href={item.link}>
                  {item.title}
                </a>
                <span>{this.formatDate(item.pubDate)}</span>
              </h2>
            </div>
          ))}
        </VelocityTransitionGroup>
      </div>
    )
  }
}

export default Blog
