"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";

const particlePositions = [
	[9, 18], [17, 72], [27, 11], [35, 88], [43, 20], [51, 82],
	[62, 14], [70, 76], [78, 24], [86, 68], [91, 38], [23, 54],
];

export default function CodeEditor() {
	const editorRef = useRef<HTMLDivElement>(null);

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		if (!editorRef.current) return;
		const rect = editorRef.current.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;
		editorRef.current.style.setProperty("--editor-x", `${x * 5}px`);
		editorRef.current.style.setProperty("--editor-y", `${y * 4}px`);
	}

	function resetPointer() {
		if (!editorRef.current) return;
		editorRef.current.style.setProperty("--editor-x", "0px");
		editorRef.current.style.setProperty("--editor-y", "0px");
	}

	return (
		<div
			ref={editorRef}
			className="code-canvas"
			onPointerMove={handlePointerMove}
			onPointerLeave={resetPointer}
			role="img"
			aria-label="Code editor displaying developer-focused JavaScript"
		>
			<div className="code-atmosphere" aria-hidden="true" />
			{particlePositions.map(([left, top], index) => (
				<span
					key={`${left}-${top}`}
					className="code-dust"
					style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -0.47}s` }}
					aria-hidden="true"
				/>
			))}

			<div className="code-editor">
				<div className="editor-titlebar">
					<div className="window-dots" aria-hidden="true">
						<span /><span /><span />
					</div>
					<div className="editor-file">developer.js</div>
					<div className="editor-status" aria-hidden="true">JS</div>
				</div>

				<div className="editor-body">
					<ol className="code-lines" aria-label="Developer JavaScript code">
						<li><code><b>const</b> <i>developer</i> = {'{'}</code></li>
						<li><code>  <i>mindset</i>: <em>&quot;Think beyond limits.&quot;</em>,</code></li>
						<li><code>  <i>passion</i>: <em>&quot;Build with purpose.&quot;</em>,</code></li>
						<li><code>  <i>mission</i>: <em>&quot;Turn ideas into reality.&quot;</em>,</code></li>
						<li><code>{'}'};</code></li>
						<li><code /> </li>
						<li><code><b>while</b> (<strong>true</strong>) {'{'}</code></li>
						<li className="active-line"><code>  <i>learn</i>();</code></li>
						<li><code>  <i>build</i>();</code></li>
						<li><code>  <i>improve</i>();</code></li>
						<li><code>{'}'}</code></li>
						<li><code /> </li>
						<li><code><u>// Great things are built one line at a time.</u></code></li>
					</ol>
				</div>
			</div>

			<style jsx>{`
				.code-canvas {
					--editor-x: 0px;
					--editor-y: 0px;
					position: relative;
					width: 100%;
					max-width: 720px;
					aspect-ratio: 7 / 6;
					margin-inline: auto;
					display: grid;
					place-items: center;
					overflow: hidden;
					border-radius: 4px;
					background:
						radial-gradient(circle at 50% 48%, rgba(202, 213, 222, .035), transparent 38%),
						perspective(1200px);
					isolation: isolate;
				}

				.code-atmosphere {
					position: absolute;
					inset: 8% 5%;
					border: 1px solid rgba(213, 224, 232, .025);
					border-radius: 50%;
					filter: blur(.2px);
					transform: rotate(-8deg) scaleX(1.08);
					pointer-events: none;
				}

				.code-dust {
					position: absolute;
					z-index: 0;
					width: 2px;
					height: 2px;
					border-radius: 50%;
					background: rgba(224, 232, 238, .48);
					box-shadow: 0 0 8px rgba(206, 219, 228, .28);
					animation: dust-drift 6s ease-in-out infinite alternate;
				}

				.code-editor {
					position: relative;
					z-index: 2;
					width: 88%;
					min-width: 0;
					border: 1px solid rgba(224, 232, 238, .12);
					border-radius: 12px;
					background: rgba(10, 12, 15, .96);
					box-shadow:
						0 28px 70px rgba(0, 0, 0, .48),
						0 0 34px rgba(205, 218, 228, .035);
					overflow: hidden;
					transform: translate(var(--editor-x), var(--editor-y));
					transition: transform .45s cubic-bezier(.2,.75,.25,1);
					animation: editor-float 7s ease-in-out infinite;
				}

				.editor-titlebar {
					height: 48px;
					display: grid;
					grid-template-columns: 70px 1fr 70px;
					align-items: center;
					border-bottom: 1px solid rgba(224, 232, 238, .075);
					background: rgba(15, 17, 21, .82);
				}

				.window-dots {
					display: flex;
					gap: 7px;
					padding-left: 16px;
				}

				.window-dots span {
					width: 7px;
					height: 7px;
					border: 1px solid rgba(223, 230, 235, .25);
					border-radius: 50%;
					background: rgba(203, 211, 217, .16);
				}

				.editor-file {
					justify-self: center;
					color: #9ea7af;
					font-family: var(--font-geist-mono);
					font-size: 9px;
					letter-spacing: .12em;
				}

				.editor-status {
					justify-self: end;
					margin-right: 16px;
					color: #737d84;
					font-family: var(--font-geist-mono);
					font-size: 8px;
					letter-spacing: .12em;
				}

				.editor-body {
					min-height: 390px;
					display: flex;
					align-items: center;
					padding: 30px 28px 30px 0;
					background:
						linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
					background-size: 44px 100%;
				}

				.code-lines {
					width: 100%;
					margin: 0;
					padding: 0 0 0 58px;
					list-style: none;
					counter-reset: editor-line;
				}

				.code-lines li {
					position: relative;
					min-height: 28px;
					counter-increment: editor-line;
					color: #dce3e7;
					font-family: var(--font-geist-mono);
					font-size: clamp(10px, 1.05vw, 13px);
					line-height: 28px;
					white-space: nowrap;
				}

				.code-lines li::before {
					content: counter(editor-line, decimal-leading-zero);
					position: absolute;
					left: -42px;
					width: 26px;
					color: #505960;
					font-size: 9px;
					text-align: right;
					user-select: none;
				}

				.code-lines code {
					font-family: inherit;
					font-size: inherit;
				}

				.code-lines b {
					color: #f3f5f6;
					font-weight: 500;
				}

				.code-lines i {
					color: #c2cad0;
					font-style: normal;
				}

				.code-lines em {
					color: #eef1f2;
					font-style: normal;
				}

				.code-lines strong {
					color: #d8dfe3;
					font-weight: 500;
				}

				.code-lines u {
					color: #7e898f;
					text-decoration: none;
				}

				.active-line {
					background: linear-gradient(90deg, rgba(217, 227, 234, .055), transparent 88%);
					box-shadow: -17px 0 0 rgba(217, 227, 234, .055);
				}

				.active-line code::after {
					content: "";
					display: inline-block;
					width: 1px;
					height: 15px;
					margin-left: 5px;
					vertical-align: -2px;
					background: #dce5ea;
					animation: cursor-blink 1.1s steps(1) infinite;
				}

				@keyframes editor-float {
					0%, 100% { translate: 0 -4px; }
					50% { translate: 0 5px; }
				}

				@keyframes dust-drift {
					from { opacity: .18; margin-top: -3px; }
					to { opacity: .72; margin-top: 4px; }
				}

				@keyframes cursor-blink {
					0%, 48% { opacity: 1; }
					49%, 100% { opacity: 0; }
				}

				@media (max-width: 767px) {
					.code-canvas { aspect-ratio: 1 / .84; }
					.code-editor { width: 94%; border-radius: 9px; }
					.editor-titlebar { height: 42px; grid-template-columns: 58px 1fr 58px; }
					.window-dots { gap: 5px; padding-left: 12px; }
					.window-dots span { width: 6px; height: 6px; }
					.editor-file { font-size: 8px; }
					.editor-status { margin-right: 12px; }
					.editor-body { min-height: 300px; padding: 22px 10px 22px 0; }
					.code-lines { padding-left: 48px; }
					.code-lines li { min-height: 23px; line-height: 23px; font-size: clamp(8px, 2.3vw, 10px); }
					.code-lines li::before { left: -36px; width: 23px; font-size: 7px; }
				}

				@media (max-width: 420px) {
					.code-editor { width: 96%; }
					.editor-body { min-height: 270px; }
					.code-lines { padding-left: 43px; }
					.code-lines li { font-size: 8px; }
					.code-lines li::before { left: -33px; }
				}

				@media (prefers-reduced-motion: reduce) {
					.code-editor,
					.code-dust,
					.active-line code::after { animation: none !important; }
					.code-editor { transition: none; }
				}
			`}</style>
		</div>
	);
}
