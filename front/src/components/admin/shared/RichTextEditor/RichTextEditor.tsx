import type { Editor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import { Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef, useState } from 'react';

interface Props {
	value: string;
	placeholder?: string;
	onChange: (html: string) => void;
}

// В существующих статьях курсив записан тегом <i>, оставляем его вместо <em>
const ItalicTag = Italic.extend({
	renderHTML({ HTMLAttributes }) {
		return ['i', HTMLAttributes, 0];
	},
});

// Классы картинок (например, description__photo--left) нужны для вёрстки на сайте
const ImageWithClass = Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			class: { default: null },
		};
	},
});

const baseExtensions = [
	StarterKit.configure({
		heading: { levels: [2, 3] },
		italic: false,
		code: false,
		codeBlock: false,
		link: {
			openOnClick: false,
			// target и rel проставляет htmlParserOptions при выводе на сайте
			HTMLAttributes: { target: null, rel: null },
		},
	}),
	ItalicTag,
	ImageWithClass,
];

// Переносы строк после блочных тегов, чтобы разметка в базе оставалась читаемой
function formatHtml(html: string) {
	return html
		.replace(/(<\/(?:p|h[1-6]|li|ol|ul|blockquote)>)/g, '$1\n')
		.replace(/(<(?:ol|ul|li|blockquote)(?: [^>]*)?>)/g, '$1\n')
		.replace(/(<img [^>]*>)/g, '$1\n')
		.trim();
}

function getEditorHtml(editor: Editor) {
	return editor.isEmpty ? '' : formatHtml(editor.getHTML());
}

function Toolbar({ editor, isHtmlMode, onToggleHtmlMode }: { editor: Editor, isHtmlMode: boolean, onToggleHtmlMode: () => void }) {
	const state = useEditorState({
		editor,
		selector: ({ editor }) => ({
			isH2: editor.isActive('heading', { level: 2 }),
			isH3: editor.isActive('heading', { level: 3 }),
			isParagraph: editor.isActive('paragraph'),
			isBold: editor.isActive('bold'),
			isItalic: editor.isActive('italic'),
			isUnderline: editor.isActive('underline'),
			isStrike: editor.isActive('strike'),
			isBulletList: editor.isActive('bulletList'),
			isOrderedList: editor.isActive('orderedList'),
			isBlockquote: editor.isActive('blockquote'),
			isLink: editor.isActive('link'),
			canUndo: editor.can().undo(),
			canRedo: editor.can().redo(),
		}),
	});

	function setLink() {
		const previousUrl = editor.getAttributes('link').href as string | undefined;
		// eslint-disable-next-line no-alert
		const url = window.prompt('Адрес ссылки (пусто — убрать ссылку)', previousUrl ?? '');

		if (url === null)
			return;

		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}

	const buttons = [
		{ label: 'H2', title: 'Заголовок', isActive: state.isH2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
		{ label: 'H3', title: 'Подзаголовок', isActive: state.isH3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
		{ label: '¶', title: 'Абзац', isActive: state.isParagraph, action: () => editor.chain().focus().setParagraph().run() },
		{ label: 'Ж', title: 'Жирный (Ctrl+B)', isActive: state.isBold, action: () => editor.chain().focus().toggleBold().run(), style: { fontWeight: 700 } },
		{ label: 'К', title: 'Курсив (Ctrl+I)', isActive: state.isItalic, action: () => editor.chain().focus().toggleItalic().run(), style: { fontStyle: 'italic' } },
		{ label: 'З', title: 'Зачёркнутый (Ctrl+Shift+S)', isActive: state.isStrike, action: () => editor.chain().focus().toggleStrike().run(), style: { textDecoration: 'line-through' } },
		{ label: 'Ч', title: 'Подчёркнутый (Ctrl+U)', isActive: state.isUnderline, action: () => editor.chain().focus().toggleUnderline().run(), style: { textDecoration: 'underline' } },
		{ label: '•', title: 'Маркированный список', isActive: state.isBulletList, action: () => editor.chain().focus().toggleBulletList().run() },
		{ label: '1.', title: 'Нумерованный список', isActive: state.isOrderedList, action: () => editor.chain().focus().toggleOrderedList().run() },
		{ label: '❝', title: 'Цитата', isActive: state.isBlockquote, action: () => editor.chain().focus().toggleBlockquote().run() },
		{ label: '🔗', title: 'Ссылка', isActive: state.isLink, action: setLink },
	];

	return (
		<div className="rich-editor__toolbar">
			{ !isHtmlMode && (
				<>
					{ buttons.map(({ label, title, isActive, action, style }) => (
						<button
							key={ title }
							type="button"
							title={ title }
							style={ style }
							className={ `rich-editor__button${isActive ? ' rich-editor__button--active' : ''}` }
							onClick={ action }
						>
							{ label }
						</button>
					)) }

					<button type="button" title="Отменить (Ctrl+Z)" className="rich-editor__button" disabled={ !state.canUndo } onClick={ () => editor.chain().focus().undo().run() }>↶</button>
					<button type="button" title="Повторить (Ctrl+Shift+Z)" className="rich-editor__button" disabled={ !state.canRedo } onClick={ () => editor.chain().focus().redo().run() }>↷</button>
				</>
			) }

			<button
				type="button"
				title="Редактировать разметку вручную"
				className={ `rich-editor__button rich-editor__button--html${isHtmlMode ? ' rich-editor__button--active' : ''}` }
				onClick={ onToggleHtmlMode }
			>
				HTML
			</button>
		</div>
	);
}

export default function RichTextEditor({ value, placeholder, onChange }: Props) {
	const [isHtmlMode, setIsHtmlMode] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const editor = useEditor({
		extensions: [...baseExtensions, Placeholder.configure({ placeholder })],
		content: value,
		editorProps: {
			attributes: { class: 'rich-editor__content description' },
		},
		onUpdate: ({ editor }) => onChange(getEditorHtml(editor)),
	});

	// Контент может поменяться снаружи (перемещение секций, загрузка с сервера, режим HTML)
	useEffect(() => {
		if (!editor || isHtmlMode || getEditorHtml(editor) === value)
			return;

		editor.commands.setContent(value, { emitUpdate: false });
	}, [editor, value, isHtmlMode]);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea)
			return;

		const scrollY = window.scrollY;
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight + 2}px`;
		window.scrollTo({ top: scrollY });
	}, [value, isHtmlMode]);

	if (!editor)
		return null;

	return (
		<div className="rich-editor">
			<Toolbar editor={ editor } isHtmlMode={ isHtmlMode } onToggleHtmlMode={ () => setIsHtmlMode(!isHtmlMode) } />

			{ isHtmlMode
				? (
					<textarea
						ref={ textareaRef }
						className="textarea rich-editor__textarea"
						placeholder={ placeholder }
						value={ value }
						onChange={ event => onChange(event.target.value) }
					/>
				)
				: <EditorContent editor={ editor } /> }
		</div>
	);
}
