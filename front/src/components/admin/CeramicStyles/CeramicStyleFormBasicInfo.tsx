import type { ChangeEvent } from 'react';
import type { PendingImage } from '@/components/admin/shared/ImageDropzone/ImageDropzone';
import type { RootState } from '@/slices/admin';
import type { UploadedImage } from '@/utils/api/api.uploads';
import { useDispatch, useSelector } from 'react-redux';
import ImageDropzone from '@/components/admin/shared/ImageDropzone/ImageDropzone';
import RichTextEditor from '@/components/admin/shared/RichTextEditor/RichTextEditor';
import { setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';
import { PATHS } from '@/variables/variables';

// Форматы — как в IMAGE_TARGETS['ceramic-styles'] и ceramicStyleValidator на бэкенде
const THUMBNAIL_MIME_TYPES = ['image/jpeg', 'image/webp'];
const MAP_IMAGE_MIME_TYPES = ['image/svg+xml'];
// og.jpg предпочтительнее: webp понимают не все соцсети (OG_FILENAMES в back/src/utils/ogImage.ts)
const OG_IMAGE_MIME_TYPES = ['image/jpeg', 'image/webp'];
// рекомендованный соцсетями размер; для своей картинки pages.ts убирает og:image:width/height, так что сверяем здесь
const OG_IMAGE_SIZE = Object.freeze({ width: 1200, height: 630 });

export const STYLE_IMAGE_FIELDS = ['thumbnail', 'mapImage'] as const;
export type StyleImageField = typeof STYLE_IMAGE_FIELDS[number];
// og — не поле записи, а файл og.jpg / og.webp в папке стиля
export type StyleImageSlot = StyleImageField | 'og';
export type PendingStyleImages = Partial<Record<StyleImageSlot, PendingImage>>;

interface Props {
	pendingImages: PendingStyleImages;
	ogImage: UploadedImage | null;
	onImageSelect: (slot: StyleImageSlot, file: File) => void;
	onImageRemove: (slot: StyleImageSlot) => void;
}

export default function CeramicStyleFormBasicInfo({ pendingImages, ogImage, onImageSelect, onImageRemove }: Props) {
	const dispatch = useDispatch();
	const isExistingStyleEdited = useSelector((state: RootState) => state.ceramicStyles.isExistingStyleEdited);
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);

	const {
		name,
		title,
		description,
		thumbnail,
		mapImage,
		showArticle,
	} = ceramicStyleToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value }));
	};

	function handleDescriptionChange(value: string) {
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, description: value }));
	};

	function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: checked }));
	};

	function getImagePreviewSrc(field: StyleImageField) {
		const savedImage = ceramicStyleToEdit[field];
		return pendingImages[field]?.previewUrl
			?? (savedImage ? `${PATHS.STATIC_URL}/${PATHS.CERAMIC_STYLES}/${name}/${savedImage}` : undefined);
	}

	function getImageHint(slot: StyleImageSlot) {
		if (!pendingImages[slot])
			return undefined;
		if (slot === 'og')
			return 'Загрузится при сохранении под именем «og». Можно перетащить другую';
		return name.trim()
			? `Загрузится при сохранении под именем «${name.trim()}». Можно перетащить другую`
			: 'Загрузится при сохранении под именем стиля — не забудьте его указать';
	}

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">
				{ isExistingStyleEdited
					? 'Редактировать существующий стиль керамики'
					: 'Создать новый стиль керамики' }
			</legend>

			<div className="form__grid">
				<div className="form__row form__row-4">
					<span>имя</span>
					<input
						className="input"
						type="text"
						name="name"
						placeholder="на англ. языке"
						value={ name }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-4">
					<span>заголовок</span>
					<input
						className="input"
						type="text"
						name="title"
						placeholder="на русс. языке"
						value={ title }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-4">
					<span>Показать статью</span>
					<label className={ `checkbox-label ${showArticle ? 'checkbox-label--checked' : ''} ` }>
						<input
							className="checkbox-input"
							type="checkbox"
							checked={ showArticle }
							name="showArticle"
							onChange={ handleCheckbox }
						/>
					</label>
				</div>

				<ImageDropzone
					label="тхумб"
					rowClassName="form__row-4"
					previewSrc={ getImagePreviewSrc('thumbnail') }
					filename={ pendingImages.thumbnail?.file.name ?? thumbnail }
					mimeTypes={ THUMBNAIL_MIME_TYPES }
					hint={ getImageHint('thumbnail') }
					onSelect={ file => onImageSelect('thumbnail', file) }
					onRemove={ () => onImageRemove('thumbnail') }
				/>

				<ImageDropzone
					label="мини карта"
					rowClassName="form__row-4"
					previewFit="contain"
					previewSrc={ getImagePreviewSrc('mapImage') }
					filename={ pendingImages.mapImage?.file.name ?? mapImage }
					mimeTypes={ MAP_IMAGE_MIME_TYPES }
					hint={ getImageHint('mapImage') }
					onSelect={ file => onImageSelect('mapImage', file) }
					onRemove={ () => onImageRemove('mapImage') }
				/>

				<ImageDropzone
					label="превью для соцсетей (og)"
					rowClassName="form__row-4"
					previewSrc={ pendingImages.og?.previewUrl ?? ogImage?.url }
					filename={ pendingImages.og?.file.name ?? ogImage?.filename }
					mimeTypes={ OG_IMAGE_MIME_TYPES }
					size={ OG_IMAGE_SIZE }
					hint={ getImageHint('og') }
					onSelect={ file => onImageSelect('og', file) }
					onRemove={ () => onImageRemove('og') }
				/>

				<div className="form__row form__row-12">
					<span>описание</span>
					<RichTextEditor
						value={ description }
						placeholder="полное описание"
						onChange={ handleDescriptionChange }
					/>
				</div>

			</div>
		</fieldset>
	);
}
