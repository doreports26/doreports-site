/**
 * slugUtils.ts — Same-to-Same Marathi (Devanagari) Slug Generator
 *
 * Generates an exact same-to-same Marathi slug directly from the title
 * when clicking the "Generate" button in Sanity Studio.
 *
 * Features:
 * - Preserves exact Marathi (Devanagari) script (स्वर, व्यंजन, मात्रा, जोडाक्षरे, ळ, ॲ, ऑ).
 * - Converts spaces, tabs, and punctuation (|, ,, ., ?, !, quotes, brackets, colons) into clean hyphens (-).
 * - Normalizes Unicode combining characters (NFC) so Devanagari matras stay intact.
 * - Collapses consecutive hyphens into a single hyphen.
 * - Strips leading and trailing hyphens.
 * - Safe character length slicing.
 *
 * @example
 * marathiSlugify("कल्याण-डोंबिवलीकरांचा रविवार वाहतूककोंडीमध्येच.. सर्व महत्वाच्या मार्गावर नेहमी ट्रॅफिक")
 * // → "कल्याण-डोंबिवलीकरांचा-रविवार-वाहतूककोंडीमध्येच-सर्व-महत्वाच्या-मार्गावर-नेहमी-ट्रॅफिक"
 */

export function marathiSlugify(source: string, maxLength = 200): string {
  if (!source) return ''

  return source
    .normalize('NFC')
    // Remove quotes, brackets and backticks
    .replace(/['"“”‘’`]/g, '')
    // Replace any sequence of characters that are NOT letters, numbers, or combining marks with a hyphen
    // \p{L} = Any Unicode Letter (Devanagari, Latin, etc.)
    // \p{N} = Any Unicode Number (Devanagari ०-९, ASCII 0-9)
    // \p{M} = Any Unicode Combining Mark (Matras, Anusvara, Visarga, Halant, Chandrabindu, Nukta)
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, '-')
    // Collapse consecutive hyphens into a single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Safely slice to maxLength
    .slice(0, maxLength)
    // Re-trim trailing hyphen in case slice cut at a hyphen
    .replace(/-+$/, '')
    .trim()
}
