import core from './core';
import './waves';
import './hamburger.scss';
import './index.scss';


if (window.location.hostname.indexOf('www') === 0) {
	window.location = window.location.href.replace('www.', '');
}

document.addEventListener('DOMContentLoaded', () => core());