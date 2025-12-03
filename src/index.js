/**
 * Entry point of application, where App is rendered within the div with the id of "app" 
 */

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

// Ensure the header mask covers the scrollbar area by measuring the
// header height and setting a CSS variable the stylesheet uses.
function updateHeaderMaskHeight() {
	try {
		const header = document.querySelector('.siteHeader');
		if (!header) return;
		const height = header.getBoundingClientRect().height;
		document.documentElement.style.setProperty('--header-mask-height', `${Math.ceil(height)}px`);
	} catch (e) {
		// silent fail
	}
}

// Run after initial paint and on resize. Using a small timeout lets React
// mount the header before measuring in most environments.
window.addEventListener('load', () => setTimeout(updateHeaderMaskHeight, 50));
window.addEventListener('resize', () => updateHeaderMaskHeight());

// Also attempt to set once now in case this script runs after mount.
setTimeout(updateHeaderMaskHeight, 200);

// Measure the native scrollbar width and expose it via a CSS variable
// so the header can offset itself and avoid being overlapped by overlay
// scrollbars (those drawn on top of page content by the browser/OS).
function updateScrollbarWidth() {
	try {
		// create a temporary element with forced scrollbar
		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.width = '100px';
		outer.style.msOverflowStyle = 'scrollbar'; // needed for IE11
		outer.style.position = 'absolute';
		outer.style.top = '-9999px';
		outer.style.overflow = 'scroll';
		document.body.appendChild(outer);
		let scrollbarWidth = outer.offsetWidth - outer.clientWidth;
		document.body.removeChild(outer);
		// Some browsers (overlay scrollbars) report 0. Use a sensible
		// fallback so the header will be offset and not sit beneath the
		// scrollbar. 12px is a common overlay scrollbar width on Windows.
		if (!scrollbarWidth || scrollbarWidth < 1) scrollbarWidth = 12;
		document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
	} catch (err) {
		document.documentElement.style.setProperty('--scrollbar-width', `0px`);
	}
}

window.addEventListener('load', () => {
	setTimeout(() => {
		updateScrollbarWidth();
		updateHeaderMaskHeight();
	}, 50);
});
window.addEventListener('resize', () => {
	updateScrollbarWidth();
	updateHeaderMaskHeight();
});
