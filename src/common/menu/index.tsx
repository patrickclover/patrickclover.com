import classNames from 'classnames'
import { useState } from 'react'
import style from './menu.module.css'

const Menu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className={classNames(style.hamburger, {
					[style.active]: isOpen,
				})}
			>
				<span className={style.top} />
				<span className={style.middle} />
				<span className={style.bottom} />
			</button>

			<div className={classNames(style.overlay, { [style.open]: isOpen })}>
				<nav className='overlay-menu'>
					<ul>
						<li>
							<a target='_blank' href='https://stampede.ai' rel='noreferrer'>
								Stampede
							</a>
						</li>
						<li>
							<a
								target='_blank'
								href='https://www.facebook.com/patrickclover'
								rel='noreferrer'
							>
								Facebook
							</a>
						</li>
						<li>
							<a
								target='_blank'
								href='https://twitter.com/patrickclover'
								rel='noreferrer'
							>
								Twitter
							</a>
						</li>
						<li>
							<a
								target='_blank'
								href='https://www.linkedin.com/in/patrickclover/'
								rel='noreferrer'
							>
								LinkedIn
							</a>
						</li>
						<li>
							<a
								target='_blank'
								href='https://github.com/patrickclover'
								rel='noreferrer'
							>
								Github
							</a>
						</li>
						<li>
							<a target='_blank' href='mailto:im@patrickclover.com' rel='noreferrer'>
								Contact Me
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}

export default Menu
