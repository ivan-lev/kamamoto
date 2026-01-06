export async function copyToClipboard(text: string): Promise<string> {
	if (!navigator.clipboard) {
		return 'Не удалось скопировать список: буфер обмена недоступен на этом устройстве';
	}

	try {
		await navigator.clipboard.writeText(text);
		return 'Список успешно скопирован в буфер обмена';
	}
	catch {
		return 'Не удалось скопировать список. Попробуйте ещё раз или напишите мне';
	}
}
