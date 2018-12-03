import React, {Component} from 'react'
import './Blog.scss'
import Title from '../Title/Title'

const blogUrl = 'https://medium.com/feed/@patrickclover'
const webBlog = 'https://blackbx.io/blog/feed/'

class Blog extends Component {

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
                return this.setState({posts: response.items})
            })
            .catch(error => console.log(error))
    }

    formatDate(date) {
        const d = new Date(date)
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
                <Title heading="On the line"/>

                {
                    items.map((item, k) =>
                        <div key={k} className="__item">
                            <h2>
                                <a target="_blank" href={item.link}>{item.title}</a>
                                <span>{this.formatDate(item.pubDate)}</span>
                            </h2>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Blog