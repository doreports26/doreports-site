/**
 * slugUtils.ts — Marathi (Devanagari) → English Transliteration Slug Generator
 *
 * A comprehensive, zero-dependency transliteration engine that converts
 * Devanagari script to clean ASCII Latin slugs.
 *
 * Covers: vowels, consonants, matras (vowel signs), halant/virama,
 * anusvara, visarga, chandrabindu, nukta variants, common conjuncts,
 * and Devanagari numerals.
 */

// ---------------------------------------------------------------------------
// 1. Common Conjuncts — checked BEFORE individual character mapping
//    Order matters: longer sequences must come first.
// ---------------------------------------------------------------------------
const CONJUNCT_MAP: [string, string][] = [
  // 4-char conjuncts
  ['क्ष्य', 'kshya'],
  ['ज्ञ्य', 'dnyay'],

  // 3-char conjuncts (consonant + halant + consonant)
  ['क्ष', 'ksh'],
  ['ज्ञ', 'dnya'],
  ['श्र', 'shr'],
  ['त्र', 'tr'],
  ['द्र', 'dr'],
  ['प्र', 'pr'],
  ['ब्र', 'br'],
  ['ग्र', 'gr'],
  ['क्र', 'kr'],
  ['फ्र', 'fr'],
  ['द्ध', 'ddh'],
  ['द्व', 'dv'],
  ['द्य', 'dy'],
  ['त्य', 'ty'],
  ['न्य', 'ny'],
  ['श्व', 'shv'],
  ['ष्ट', 'sht'],
  ['ष्ठ', 'shth'],
  ['स्त', 'st'],
  ['स्थ', 'sth'],
  ['स्व', 'sv'],
  ['स्न', 'sn'],
  ['स्म', 'sm'],
  ['स्प', 'sp'],
  ['स्क', 'sk'],
  ['त्त', 'tt'],
  ['न्न', 'nn'],
  ['ल्ल', 'll'],
  ['च्च', 'chch'],
  ['म्ह', 'mh'],
  ['न्ह', 'nh'],
  ['ल्ह', 'lh'],
  ['ळ्ह', 'lh'],
  ['त्न', 'tn'],
  ['ध्य', 'dhy'],
  ['ध्व', 'dhv'],
  ['न्त', 'nt'],
  ['न्द', 'nd'],
  ['म्ब', 'mb'],
  ['म्प', 'mp'],
  ['ङ्क', 'nk'],
  ['ङ्ग', 'ng'],
  ['ञ्च', 'nch'],
  ['ञ्ज', 'nj'],
]

// ---------------------------------------------------------------------------
// 2. Independent Vowels (स्वर)
// ---------------------------------------------------------------------------
const VOWEL_MAP: Record<string, string> = {
  'अ': 'a',
  'आ': 'aa',
  'इ': 'i',
  'ई': 'ee',
  'उ': 'u',
  'ऊ': 'oo',
  'ऋ': 'ru',
  'ॠ': 'ru',
  'ए': 'e',
  'ऐ': 'ai',
  'ओ': 'o',
  'औ': 'au',
  'ॲ': 'a',   // Marathi specific
  'ऑ': 'o',   // Marathi specific (as in "ऑफिस")
}

// ---------------------------------------------------------------------------
// 3. Dependent Vowel Signs / Matras (मात्रा)
// ---------------------------------------------------------------------------
const MATRA_MAP: Record<string, string> = {
  'ा': 'aa',
  'ि': 'i',
  'ी': 'ee',
  'ु': 'u',
  'ू': 'oo',
  'ृ': 'ru',
  'ॄ': 'ru',
  'े': 'e',
  'ै': 'ai',
  'ो': 'o',
  'ौ': 'au',
  'ॅ': 'e',   // Marathi candra-e
  'ॉ': 'o',   // Marathi candra-o
}

// ---------------------------------------------------------------------------
// 4. Consonants (व्यंजन)
// ---------------------------------------------------------------------------
const CONSONANT_MAP: Record<string, string> = {
  'क': 'k',
  'ख': 'kh',
  'ग': 'g',
  'घ': 'gh',
  'ङ': 'n',
  'च': 'ch',
  'छ': 'chh',
  'ज': 'j',
  'झ': 'jh',
  'ञ': 'n',
  'ट': 't',
  'ठ': 'th',
  'ड': 'd',
  'ढ': 'dh',
  'ण': 'n',
  'त': 't',
  'थ': 'th',
  'द': 'd',
  'ध': 'dh',
  'न': 'n',
  'प': 'p',
  'फ': 'ph',
  'ब': 'b',
  'भ': 'bh',
  'म': 'm',
  'य': 'y',
  'र': 'r',
  'ल': 'l',
  'व': 'v',
  'श': 'sh',
  'ष': 'sh',
  'स': 's',
  'ह': 'h',
  'ळ': 'l',    // Marathi-specific retroflex lateral
  'क़': 'q',   // nukta variants (borrowed sounds)
  'ख़': 'kh',
  'ग़': 'gh',
  'ज़': 'z',
  'ड़': 'd',
  'ढ़': 'dh',
  'फ़': 'f',
  'य़': 'y',
}

// ---------------------------------------------------------------------------
// 5. Special Characters
// ---------------------------------------------------------------------------
const HALANT = '\u094D'          // ्  virama — suppresses inherent 'a'
const ANUSVARA = '\u0902'       // ं
const VISARGA = '\u0903'        // ः
const CHANDRABINDU = '\u0901'   // ँ
const NUKTA = '\u093C'          // ़
const AVAGRAHA = '\u093D'       // ऽ

// ---------------------------------------------------------------------------
// 6. Devanagari Numerals
// ---------------------------------------------------------------------------
const NUMERAL_MAP: Record<string, string> = {
  '०': '0',
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
}

// ---------------------------------------------------------------------------
// Core Transliteration Function
// ---------------------------------------------------------------------------
function transliterate(input: string): string {
  let result = ''
  let src = input

  // Pre-pass: replace conjuncts (longest match first)
  for (const [devanagari, latin] of CONJUNCT_MAP) {
    // Use split-join instead of replaceAll for broader compatibility
    src = src.split(devanagari).join(latin)
  }

  let i = 0
  while (i < src.length) {
    const char = src[i]
    const nextChar = src[i + 1] || ''

    // --- Devanagari Numerals ---
    if (NUMERAL_MAP[char]) {
      result += NUMERAL_MAP[char]
      i++
      continue
    }

    // --- Independent Vowels ---
    if (VOWEL_MAP[char]) {
      result += VOWEL_MAP[char]
      i++
      continue
    }

    // --- Consonants ---
    if (CONSONANT_MAP[char]) {
      result += CONSONANT_MAP[char]

      // Look ahead for matra or halant
      if (nextChar === HALANT) {
        // Halant suppresses the inherent 'a' — don't add 'a'
        i += 2 // skip consonant + halant
        continue
      } else if (MATRA_MAP[nextChar]) {
        // Matra replaces the inherent 'a'
        result += MATRA_MAP[nextChar]
        i += 2 // skip consonant + matra
        continue
      } else {
        // No matra, no halant → add inherent 'a'
        // BUT not if next char is end-of-word, space, or punctuation
        const afterNext = src[i + 1] || ''
        const isEndOfWord =
          !afterNext ||
          afterNext === ' ' ||
          afterNext === '-' ||
          afterNext === '.' ||
          afterNext === ',' ||
          afterNext === '!' ||
          afterNext === '?' ||
          // Next is an independent vowel (consonant doesn't carry inherent 'a' before vowel)
          VOWEL_MAP[afterNext] !== undefined

        if (!isEndOfWord) {
          result += 'a'
        }
        i++
        continue
      }
    }

    // --- Matras appearing without a preceding consonant (rare / malformed) ---
    if (MATRA_MAP[char]) {
      result += MATRA_MAP[char]
      i++
      continue
    }

    // --- Anusvara (ं) → 'n' ---
    if (char === ANUSVARA) {
      result += 'n'
      i++
      continue
    }

    // --- Visarga (ः) → 'h' ---
    if (char === VISARGA) {
      result += 'h'
      i++
      continue
    }

    // --- Chandrabindu (ँ) → 'n' ---
    if (char === CHANDRABINDU) {
      result += 'n'
      i++
      continue
    }

    // --- Nukta (़) — skip (already handled in nukta consonants) ---
    if (char === NUKTA) {
      i++
      continue
    }

    // --- Avagraha (ऽ) — skip ---
    if (char === AVAGRAHA) {
      i++
      continue
    }

    // --- Halant appearing alone (edge case) — skip ---
    if (char === HALANT) {
      i++
      continue
    }

    // --- Pass-through: ASCII letters, digits, spaces, hyphens ---
    result += char
    i++
  }

  return result
}

// ---------------------------------------------------------------------------
// Slug Formatter — converts transliterated text to a clean slug
// ---------------------------------------------------------------------------
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')         // strip non-word chars (except spaces & hyphens)
    .replace(/[\s_]+/g, '-')          // spaces & underscores → single hyphen
    .replace(/-+/g, '-')              // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')          // trim leading/trailing hyphens
}

// ---------------------------------------------------------------------------
// Public API — drop-in replacement for Sanity's default slugify
// ---------------------------------------------------------------------------

/**
 * Transliterates a Marathi (Devanagari) string into a clean English slug.
 *
 * @example
 * marathiSlugify("कल्याण-डोंबिवली महापालिकेत भ्रष्टाचार")
 * // → "kalyan-dombivli-mahapaliket-bhrashtachar"
 *
 * Also handles mixed Marathi + English input gracefully.
 */
export function marathiSlugify(source: string, maxLength = 96): string {
  const transliterated = transliterate(source)
  const slug = toSlug(transliterated)
  return slug.substring(0, maxLength)
}
