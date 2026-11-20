import { orPlaceholder, type ContactDetails } from '../data/contact.ts'
import type { Language } from './translations.ts'

/*
 * Legal notice (Impressum) and privacy policy for a private portfolio of a
 * student based in Germany: no cookies, no tracking, self-hosted fonts,
 * hosted on GitHub Pages, contact via email and external profile links.
 *
 * Not legal advice – review before publishing and update when the site changes
 * (e.g. new embeds, analytics, a contact form or a different host).
 *
 * Paragraph strings support **bold** and [label](href) (see RichText.tsx).
 */

export type LegalSection = {
  heading: string
  /** Address-like block, rendered line by line. */
  lines?: string[]
  paragraphs?: string[]
}

export type LegalDocument = {
  title: string
  intro?: string
  sections: LegalSection[]
  updated: string
}

export type LegalPageId = 'imprint' | 'privacy'

const UPDATED = { de: 'November 2026', en: 'November 2026' }
const GITHUB_PRIVACY_URL = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'

const country = { de: 'Deutschland', en: 'Germany' }

const placeholders = {
  de: { street: 'Straße und Hausnummer', city: 'PLZ und Ort', email: 'E-Mail-Adresse', phone: 'Telefonnummer' },
  en: { street: 'Street and house number', city: 'Postal code and city', email: 'Email address', phone: 'Phone number' },
}

function fields(lang: Language, c: ContactDetails) {
  const p = placeholders[lang]
  const email = c.email ? `[${c.email}](mailto:${c.email})` : `[${p.email}]`
  return {
    street: orPlaceholder(c.street, p.street),
    city: orPlaceholder(c.city, p.city),
    phone: orPlaceholder(c.phone, p.phone),
    email,
    // Address lines are plain text (no markup).
    emailPlain: orPlaceholder(c.email, p.email),
  }
}

function imprint(lang: Language, c: ContactDetails): LegalDocument {
  const f = fields(lang, c)
  const address = [c.name, f.street, f.city, country[lang]]

  if (lang === 'de') {
    return {
      title: 'Impressum',
      sections: [
        { heading: 'Angaben gemäß § 5 DDG', lines: address },
        { heading: 'Kontakt', paragraphs: [`E-Mail: ${f.email}`, `Telefon: ${f.phone}`] },
        { heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV', lines: [c.name, 'Anschrift wie oben'] },
        {
          heading: 'Urheberrecht',
          paragraphs: [
            'Die auf dieser Website veröffentlichten Inhalte – insbesondere Texte, Bilder, Videos, Grafiken und Code – sind, soweit nicht anders gekennzeichnet, von mir erstellt und urheberrechtlich geschützt. Eine Vervielfältigung oder Verwendung außerhalb der Grenzen des Urheberrechts ist ohne meine vorherige Zustimmung nicht gestattet. Inhalte Dritter sind als solche gekennzeichnet.',
          ],
        },
        {
          heading: 'Marken',
          paragraphs: [
            'Alle genannten Produktnamen und Logos sind Marken ihrer jeweiligen Inhaber. Ihre Verwendung dient ausschließlich der Kennzeichnung der eingesetzten Technologien und stellt keine Verbindung zu den Inhabern oder eine Billigung durch sie dar. Die Logo-Grafiken stammen von [Simple Icons](https://simpleicons.org).',
          ],
        },
      ],
      updated: UPDATED.de,
    }
  }

  return {
    title: 'Legal notice',
    intro: 'This legal notice (“Impressum”) is required by German law. In case of doubt, the German version applies.',
    sections: [
      { heading: 'Information pursuant to § 5 DDG (German Digital Services Act)', lines: address },
      { heading: 'Contact', paragraphs: [`Email: ${f.email}`, `Phone: ${f.phone}`] },
      { heading: 'Responsible for content pursuant to § 18 (2) MStV', lines: [c.name, 'Address as above'] },
      {
        heading: 'Copyright',
        paragraphs: [
          'Unless stated otherwise, the content published on this website – in particular texts, images, videos, graphics and code – was created by me and is protected by copyright. Any reproduction or use beyond the limits of copyright law requires my prior consent. Third-party content is marked as such.',
        ],
      },
      {
        heading: 'Trademarks',
        paragraphs: [
          'All product names and logos mentioned are trademarks of their respective owners. They are used solely to identify the technologies concerned and do not imply any affiliation with or endorsement by their owners. The logo graphics are taken from [Simple Icons](https://simpleicons.org).',
        ],
      },
    ],
    updated: UPDATED.en,
  }
}

/** Numbers section headings ("1. …", "2. …") after optional sections were filtered out. */
function numbered(sections: (LegalSection | false)[]): LegalSection[] {
  return sections
    .filter((section): section is LegalSection => section !== false)
    .map((section, i) => ({ ...section, heading: `${i + 1}. ${section.heading}` }))
}

function privacy(lang: Language, c: ContactDetails): LegalDocument {
  const f = fields(lang, c)
  const controller = [c.name, f.street, f.city, country[lang]]
  // Only mention external profiles that are actually linked.
  const profiles = [c.github && 'GitHub', c.linkedin && 'LinkedIn'].filter(Boolean).join(lang === 'de' ? ' und ' : ' and ')

  if (lang === 'de') {
    return {
      title: 'Datenschutzerklärung',
      sections: numbered([
        {
          heading: 'Verantwortlicher',
          paragraphs: ['Verantwortlich für die Datenverarbeitung auf dieser Website ist:'],
          lines: [...controller, `E-Mail: ${f.emailPlain}`],
        },
        {
          heading: 'Überblick',
          paragraphs: [
            'Diese Website ist ein persönliches Portfolio. Sie verwendet **keine Cookies**, **kein Tracking** und **keine Analyse-Tools**. Schriftarten werden direkt von diesem Server geladen; es werden keine Daten an Google Fonts oder vergleichbare Dienste übertragen. Personenbezogene Daten werden nur in dem nachfolgend beschriebenen, technisch notwendigen Umfang verarbeitet.',
          ],
        },
        {
          heading: 'Hosting über GitHub Pages',
          paragraphs: [
            'Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Website verarbeitet GitHub automatisch technische Zugriffsdaten (Server-Logfiles), insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite, die zuvor besuchte Seite (Referrer) sowie Angaben zu Browser und Betriebssystem. Dies ist erforderlich, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung dieser Website.',
            `Dabei können Daten in die USA übermittelt werden. GitHub ist nach eigenen Angaben unter dem EU-US Data Privacy Framework zertifiziert; für Übermittlungen an zertifizierte Unternehmen besteht ein Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Weitere Informationen finden Sie in der [Datenschutzerklärung von GitHub](${GITHUB_PRIVACY_URL}).`,
          ],
        },
        {
          heading: 'Speicherung der Spracheinstellung',
          paragraphs: [
            'Wenn Sie zwischen Deutsch und Englisch wechseln, wird Ihre Auswahl im lokalen Speicher Ihres Browsers (localStorage) abgelegt, damit die Website sie beim nächsten Besuch berücksichtigt. Dabei werden keine personenbezogenen Daten gespeichert und keine Daten an mich oder Dritte übertragen. Die Speicherung ist für die von Ihnen gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können den Eintrag jederzeit über die Einstellungen Ihres Browsers löschen.',
          ],
        },
        {
          heading: 'Kontakt per E-Mail',
          paragraphs: [
            'Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Angaben (z. B. Name, E-Mail-Adresse und Inhalt der Nachricht), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf eine Zusammenarbeit oder einen Vertrag abzielt, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Ihre Daten werden gelöscht, sobald sie für diesen Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
          ],
        },
        Boolean(profiles) && {
          heading: 'Links zu anderen Websites',
          paragraphs: [
            `Diese Website enthält Links zu externen Angeboten (${profiles}). Daten werden erst übertragen, wenn Sie einen solchen Link anklicken; ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.`,
          ],
        },
        {
          heading: 'Ihre Rechte',
          paragraphs: [
            'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht, Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zu widersprechen (Art. 21 DSGVO). Wenden Sie sich dazu einfach per E-Mail an mich.',
            'Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.',
          ],
        },
      ]),
      updated: UPDATED.de,
    }
  }

  return {
    title: 'Privacy policy',
    intro: 'This English version is provided for convenience. In case of doubt, the German version applies.',
    sections: numbered([
      {
        heading: 'Controller',
        paragraphs: ['The person responsible for data processing on this website is:'],
        lines: [...controller, `Email: ${f.emailPlain}`],
      },
      {
        heading: 'Overview',
        paragraphs: [
          'This website is a personal portfolio. It uses **no cookies**, **no tracking** and **no analytics tools**. Fonts are loaded directly from this server; no data is sent to Google Fonts or similar services. Personal data is only processed to the technically necessary extent described below.',
        ],
      },
      {
        heading: 'Hosting via GitHub Pages',
        paragraphs: [
          'This website is served via GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you visit the website, GitHub automatically processes technical access data (server log files), in particular your IP address, date and time of access, the page requested, the previously visited page (referrer) and information about your browser and operating system. This is necessary to deliver the website and to ensure its security and stability.',
          'The legal basis is Art. 6 (1) (f) GDPR. My legitimate interest lies in providing this website securely and reliably.',
          `Data may be transferred to the USA in the process. According to GitHub, it is certified under the EU-US Data Privacy Framework; transfers to certified companies are covered by an adequacy decision of the European Commission (Art. 45 GDPR). For more information, see [GitHub’s privacy statement](${GITHUB_PRIVACY_URL}).`,
        ],
      },
      {
        heading: 'Storing your language preference',
        paragraphs: [
          'When you switch between English and German, your choice is saved in your browser’s local storage (localStorage) so the website remembers it on your next visit. No personal data is stored and nothing is sent to me or to third parties. This storage is strictly necessary for the function you requested (§ 25 (2) no. 2 TDDDG). You can delete the entry at any time in your browser settings.',
        ],
      },
      {
        heading: 'Contact by email',
        paragraphs: [
          'If you send me an email, I process the information you provide (e.g. name, email address and the content of your message) to answer your request. The legal basis is Art. 6 (1) (b) GDPR if your request concerns a collaboration or a contract, otherwise Art. 6 (1) (f) GDPR (legitimate interest in answering enquiries). Your data is deleted as soon as it is no longer needed for this purpose and no statutory retention obligations apply.',
        ],
      },
      Boolean(profiles) && {
        heading: 'Links to other websites',
        paragraphs: [
          `This website contains links to external services (${profiles}). Data is only transferred once you click such a link; from then on, the privacy policy of the respective provider applies.`,
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right of access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR) and data portability (Art. 20 GDPR), as well as the right to object to processing based on Art. 6 (1) (f) GDPR (Art. 21 GDPR). Simply contact me by email.',
          'You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), in particular in the member state of your habitual residence, place of work or the place of the alleged infringement.',
        ],
      },
    ]),
    updated: UPDATED.en,
  }
}

export function getLegalDocument(page: LegalPageId, lang: Language, c: ContactDetails): LegalDocument {
  return page === 'imprint' ? imprint(lang, c) : privacy(lang, c)
}

/** Browser tab titles per page and language. */
export const legalTitles: Record<LegalPageId, Record<Language, string>> = {
  imprint: { en: 'Legal notice – Daniel Dang', de: 'Impressum – Daniel Dang' },
  privacy: { en: 'Privacy policy – Daniel Dang', de: 'Datenschutz – Daniel Dang' },
}

/** Relative URLs of the legal pages (work with any GitHub Pages base path). */
export const legalHrefs: Record<LegalPageId, string> = {
  imprint: 'impressum.html',
  privacy: 'datenschutz.html',
}
