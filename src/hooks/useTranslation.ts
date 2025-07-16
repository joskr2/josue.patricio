import { useLocale } from "@/contexts/LocaleContext";
import { getTranslation, translations } from "@/lib/i18n";

export function useTranslation() {
	const { locale } = useLocale();

	const t = (key: string): string => {
		return getTranslation(locale, key);
	};

	const tArray = (key: string): string[] => {
		const keys = key.split(".");
		// biome-ignore lint/suspicious/noExplicitAny: required for dynamic property access
		let value: any = translations[locale];

		for (const k of keys) {
			value = value?.[k];
		}

		return Array.isArray(value) ? value : [];
	};

	return { t, tArray, locale };
}
