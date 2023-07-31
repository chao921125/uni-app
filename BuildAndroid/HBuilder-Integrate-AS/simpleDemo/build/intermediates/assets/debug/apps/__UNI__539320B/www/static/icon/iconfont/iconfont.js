!(function (e) {
	var t,
		n,
		o,
		i,
		c,
		l =
			'<svg><symbol id="icon-zhuanjia" viewBox="0 0 1024 1024"><path d="M194.97 566.272V747.52L512 919.552 829.03 747.52V566.477L512 738.509 194.97 566.272zM512 104.448L13.926 376.218 512 647.782l407.552-221.798v312.525h90.522V376.218L512 104.448z" fill="#8a8a8a" ></path></symbol><symbol id="icon-jingshenxinlike" viewBox="0 0 1025 1024"><path d="M1021.824 255.872c-18.816-112.64-108.16-204.544-220.288-225.92-95.744-18.304-184.704 12.544-246.656 71.552-17.664 16.768-46.464 15.104-62.592-3.2-60.416-68.224-153.6-106.88-255.104-90.496C123.52 26.24 30.592 116.736 9.472 230.016c-15.488 82.816 3.84 154.88 47.488 220.416l0.768 1.536 2.304 2.688c6.656 12.928 20.608 31.616 30.336 40.96l395.008 428.16c17.152 19.072 47.104 19.328 64.64 0.512l391.808-420.992c5.12-4.992 9.984-10.368 14.72-15.744l4.352-4.608c0-0.128 0.128-0.256 0.128-0.256 49.664-59.648 75.136-140.288 60.8-226.816zM814.08 453.376L632.704 455.68l-34.304 137.216c-1.536 5.888-6.4 10.368-12.544 11.136-0.64 0.128-1.28 0.128-1.792 0.128-5.376 0-10.496-2.944-13.056-7.808L412.8 302.208l-44.288 155.136c-1.792 6.4-7.68 10.752-14.208 10.752H193.664c-8.192 0-14.848-6.656-14.848-14.848 0-8.192 6.656-14.848 14.848-14.848H343.04l51.328-179.584c1.664-5.76 6.656-9.984 12.672-10.624 6.016-0.768 11.776 2.432 14.592 7.68l157.312 292.48 27.776-111.104c1.664-6.528 7.424-11.136 14.208-11.264l192.768-2.432c7.808-0.768 14.848 6.4 14.976 14.592 0.128 8.448-6.4 15.104-14.592 15.232z" fill="#8a8a8a" ></path></symbol></svg>',
		a = (a = document.getElementsByTagName("script"))[a.length - 1].getAttribute("data-injectcss"),
		d = function (e, t) {
			t.parentNode.insertBefore(e, t);
		};
	if (a && !e.__iconfont__svg__cssinject__) {
		e.__iconfont__svg__cssinject__ = !0;
		try {
			document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
		} catch (e) {
			console && console.log(e);
		}
	}
	function s() {
		c || ((c = !0), o());
	}
	function r() {
		try {
			i.documentElement.doScroll("left");
		} catch (e) {
			return void setTimeout(r, 50);
		}
		s();
	}
	(t = function () {
		var e,
			t = document.createElement("div");
		(t.innerHTML = l),
			(l = null),
			(t = t.getElementsByTagName("svg")[0]) &&
				(t.setAttribute("aria-hidden", "true"),
				(t.style.position = "absolute"),
				(t.style.width = 0),
				(t.style.height = 0),
				(t.style.overflow = "hidden"),
				(t = t),
				(e = document.body).firstChild ? d(t, e.firstChild) : e.appendChild(t));
	}),
		document.addEventListener
			? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
				? setTimeout(t, 0)
				: ((n = function () {
						document.removeEventListener("DOMContentLoaded", n, !1), t();
				  }),
				  document.addEventListener("DOMContentLoaded", n, !1))
			: document.attachEvent &&
			  ((o = t),
			  (i = e.document),
			  (c = !1),
			  r(),
			  (i.onreadystatechange = function () {
					"complete" == i.readyState && ((i.onreadystatechange = null), s());
			  }));
})(window);
