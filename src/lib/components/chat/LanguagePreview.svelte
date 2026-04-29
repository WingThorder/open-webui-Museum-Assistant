<script lang="ts">
	import { user } from '$lib/stores';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import { getContext } from 'svelte';

	const i18n = getContext('i18n');

	// Map locale codes to human-readable language names
	const localeMap = {
		'en-US': 'English (US)',
		'en-GB': 'English (GB)',
		'en': 'English',
		'zh-CN': '中文 (简体)',
		'zh-TW': '中文 (繁體)',
		'ja': '日本語',
		'ko': '한국어',
		'fr': 'Français',
		'de': 'Deutsch',
		'es': 'Español',
		'pt': 'Português',
		'ru': 'Русский',
		'ar': 'العربية',
		'it': 'Italiano',
		'nl': 'Nederlands',
		'pl': 'Polski',
		'tr': 'Türkçe',
		'vi': 'Tiếng Việt',
		'id': 'Bahasa Indonesia',
		'th': 'ไทย'
	};

	$: currentLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') || 'en-US' : 'en-US';
	$: languageName = localeMap[currentLocale] || currentLocale;

	$: isAdmin = $user?.role === 'admin';
</script>

{#if isAdmin}
	<div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-700">
		<Tooltip content={$i18n.t('Assistant reply language')} placement="top-start">
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="w-4 h-4 text-gray-600 dark:text-gray-400"
				>
					<path d="m3.688 7.02 1.137-2.793H7.16L8.296 7.02M3 .5h10l-1.5 3.75h-7L3 .5Zm-.6 4.938h9.2L10.388 13H5.612L2.4 5.438Z" />
				</svg>
				<span class="text-sm font-medium text-gray-700 dark:text-gray-200">{languageName}</span>
			</div>
		</Tooltip>
	</div>
{/if}

<style>
	:global(.dark) {
		--color-gray-850: rgb(24, 25, 28);
	}
</style>
